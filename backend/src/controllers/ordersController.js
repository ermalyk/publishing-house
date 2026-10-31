import Order from '../models/Order.js';
import Book from '../models/Book.js';

export async function createOrder(req, res) {
  const { items, shippingAddress } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Количката е празна.' });
  }

  const bookIds = items.map((item) => item.bookId);
  const books = await Book.find({ _id: { $in: bookIds } });
  const booksById = new Map(books.map((book) => [book._id.toString(), book]));

  let total = 0;
  const orderItems = items.map((item) => {
    const book = booksById.get(item.bookId);
    if (!book) {
      const err = new Error(`Книга с id ${item.bookId} не е намерена.`);
      err.status = 400;
      throw err;
    }
    const quantity = Math.max(parseInt(item.quantity, 10) || 1, 1);
    total += book.price * quantity;
    return { book: book._id, title: book.title, price: book.price, quantity };
  });

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    total,
    shippingAddress,
  });

  res.status(201).json({ order });
}

export async function listMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ items: orders });
}

export async function listAllOrders(req, res) {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json({ items: orders });
}

export async function updateOrderStatus(req, res) {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!order) {
    return res.status(404).json({ message: 'Поръчката не е намерена.' });
  }
  res.json({ order });
}
