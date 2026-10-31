import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['история', 'публицистика', 'художествена литература', 'мемоари', 'поезия', 'друго'],
      default: 'друго',
    },
    type: { type: String, enum: ['печатна', 'е-книга'], default: 'печатна' },
    price: { type: Number, required: true, min: 0 },
    coverImage: { type: String, default: '' },
    isbn: { type: String, default: '' },
    pages: { type: Number },
    publishedYear: { type: Number },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

bookSchema.index({ title: 'text', author: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Book', bookSchema);
