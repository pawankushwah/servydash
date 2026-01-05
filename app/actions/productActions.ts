'use server';

import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { IProduct } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: Partial<IProduct>) {
  try {
    await connectToDatabase();

    // In a real app, you'd get the creatorId from your Auth session (e.g., Kinde or NextAuth)
    const newProduct = await Product.create({
      ...data,
      creatorId: "user_2pX..." 
    });

    revalidatePath('/marketplace'); // Refresh the cache for the marketplace
    return { success: true, product: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}