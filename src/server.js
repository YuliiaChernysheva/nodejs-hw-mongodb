import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { Contact } from './models/contact.js';

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(pino());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    try {
      const contact = await Contact.findById(contactId);

      if (contact === null) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ status: 404, message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
