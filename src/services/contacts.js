import { Contact } from '../models/contact.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filter = {},
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const queryFilter = {};
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

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact;
}

export async function createContact(payload) {
  const contact = await Contact.create(payload);
  return contact;
}

export async function deleteContact(contactId) {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
}

export async function updateContact(contactId, payload) {
  const contact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
  return contact;
}
