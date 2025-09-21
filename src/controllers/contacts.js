import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContactsController(req, res) {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactsController(req, res) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function updateContactController(req, res) {
  const contact = await updateContact(req.params.contactId, req.body);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
}
