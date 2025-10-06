import { Contact } from '../models/contact.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
  userId,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const queryFilter = { userId };
  if (filter.contactType) {
    queryFilter.contactType = filter.contactType;
  }
  if (typeof filter.isFavourite === 'boolean') {
    queryFilter.isFavourite = filter.isFavourite;
  }

  const contactQuery = Contact.find(queryFilter);

  const [contacts, total] = await Promise.all([
    contactQuery
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(perPage),
    Contact.countDocuments(queryFilter),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export async function getContactById(contactId, userId) {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
}

export async function createContact(payload) {
  const contact = await Contact.create(payload);
  return contact;
}

export async function deleteContact(contactId, userId) {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
}

export async function updateContact(contactId, payload, userId) {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
  return contact;
}
