import ContactMessage from '../models/ContactMessage.js';

export async function sendMessage(req, res) {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Име, имейл и съобщение са задължителни.' });
  }

  const entry = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ message: 'Съобщението е изпратено успешно.', id: entry._id });
}

export async function listMessages(req, res) {
  const items = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ items });
}
