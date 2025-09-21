import { Contact } from '../models/contact.js';

export async function getAllContacts() {
  const contacts = await Contact.find();
  return contacts;
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
