import 'dotenv/config';
import { connectDB } from '../config/db.js';
import Book from '../models/Book.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const books = [
  {
    title: 'Млада гвардия',
    author: 'Александър Фадеев',
    slug: 'mlada-gvardiya',
    description:
      'Документален роман за подвига на младежите от подполната организация "Млада гвардия" в Краснодон по време на Великата отечествена война.',
    category: 'история',
    type: 'печатна',
    price: 24.9,
    pages: 512,
    publishedYear: 1946,
    stock: 40,
    featured: true,
    tags: ['история', 'съпротива', 'втора световна война'],
  },
  {
    title: 'Млада гвардия (е-книга)',
    author: 'Александър Фадеев',
    slug: 'mlada-gvardiya-ebook',
    description: 'Електронно издание на документалния роман "Млада гвардия".',
    category: 'история',
    type: 'е-книга',
    price: 9.9,
    publishedYear: 1946,
    stock: 9999,
    featured: true,
    tags: ['история', 'съпротива', 'е-книга'],
  },
  {
    title: 'Как се каляваше стоманата',
    author: 'Николай Островски',
    slug: 'kak-se-kalyavashe-stomanata',
    description: 'Класически роман за формирането на революционния характер.',
    category: 'художествена литература',
    type: 'печатна',
    price: 19.5,
    pages: 320,
    publishedYear: 1934,
    stock: 25,
    featured: false,
    tags: ['класика', 'революция'],
  },
  {
    title: 'Разкази за комунистите',
    author: 'Колектив',
    slug: 'razkazi-za-komunistite',
    description: 'Сборник с биографични разкази за дейци на работническото движение.',
    category: 'публицистика',
    type: 'печатна',
    price: 16.0,
    pages: 210,
    publishedYear: 2021,
    stock: 15,
    featured: false,
    tags: ['публицистика', 'история'],
  },
];

async function run() {
  await connectDB();

  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log(`[seed] добавени ${books.length} книги`);

  const adminEmail = 'admin@mladagvardiya.bg';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Администратор',
      email: adminEmail,
      password: 'admin12345',
      role: 'admin',
    });
    console.log(`[seed] създаден администратор: ${adminEmail} / admin12345`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
