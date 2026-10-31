import Book from '../models/Book.js';

function buildFilter(query) {
  const filter = {};

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;
  if (query.featured) filter.featured = query.featured === 'true';

  if (query.q) {
    filter.$text = { $search: query.q };
  }

  return filter;
}

export async function listBooks(req, res) {
  const filter = buildFilter(req.query);
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Book.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
}

export async function getBookBySlug(req, res) {
  const book = await Book.findOne({ slug: req.params.slug });
  if (!book) {
    return res.status(404).json({ message: 'Книгата не е намерена.' });
  }
  res.json({ book });
}

export async function createBook(req, res) {
  const book = await Book.create(req.body);
  res.status(201).json({ book });
}

export async function updateBook(req, res) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    return res.status(404).json({ message: 'Книгата не е намерена.' });
  }
  res.json({ book });
}

export async function deleteBook(req, res) {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Книгата не е намерена.' });
  }
  res.status(204).send();
}
