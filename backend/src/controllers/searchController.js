import Book from '../models/Book.js';

export async function search(req, res) {
  const q = (req.query.q || '').trim();

  if (!q) {
    return res.json({ items: [] });
  }

  const items = await Book.find(
    { $text: { $search: q } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .limit(20);

  res.json({ items });
}
