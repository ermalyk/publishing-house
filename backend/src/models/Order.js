import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    shippingAddress: {
      city: String,
      line1: String,
      postalCode: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ['чакаща', 'потвърдена', 'изпратена', 'доставена', 'отказана'],
      default: 'чакаща',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
