import mongoose, { Schema, model, models, Document } from 'mongoose';
import { IProduct } from '@/types';

// Extend IProduct with Mongoose Document properties
export interface IProductDocument extends IProduct, Document {
  _id: any; 
}

const ProductSchema = new Schema<IProductDocument>(
  {
    creatorId: { type: String, required: true }, // Usually an Auth ID
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['file', 'event', 'service', 'course'], 
      required: true 
    },
    price: { type: Number, required: true },
    fileUrl: { type: String },
    eventDate: { type: Date },
    stripeProductId: { type: String },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProductDocument>('Product', ProductSchema);

export default Product;