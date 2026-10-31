import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mladagvardiya';

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
    console.log(`[mongo] свързан към ${uri}`);
  } catch (err) {
    console.error('[mongo] грешка при свързване:', err.message);
    process.exit(1);
  }
}
