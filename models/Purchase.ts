import { Schema, model, models } from 'mongoose';

const PurchaseSchema = new Schema({
  customerId: { type: String, required: true }, // From Kinde Auth
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Purchase = models.Purchase || model('Purchase', PurchaseSchema);
export default Purchase;