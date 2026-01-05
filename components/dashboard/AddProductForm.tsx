"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues, ProductFormInput } from "@/lib/validations/product";
import { createProduct } from "@/app/actions/productActions";
import { useState } from "react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: { type: "file", price: 0, eventDate: "" }
  });

  const selectedType = watch("type");

  const onSubmit = async (data: ProductFormInput) => {
    if (loading) return; // Prevent double submit
    setLoading(true);
    try {
      // Convert eventDate to Date if present and valid
      let eventDate: Date | undefined = undefined;
      if (data.eventDate) {
        const dateVal = new Date(data.eventDate);
        if (!isNaN(dateVal.getTime())) {
          eventDate = dateVal;
        }
      }
      const payload: ProductFormValues = {
        ...data,
        eventDate,
      };
      const result = await createProduct(payload);
      if (result.success) {
        alert("Product listed on ServyDash!");
      } else {
        alert("Error: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      alert("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Service Title</label>
          <input {...register("title")} className="w-full p-2 border rounded-md" placeholder="e.g. Master Python E-book" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select {...register("type")} className="w-full p-2 border rounded-md dark:bg-gray-600 h-10.5">
              <option value="file">Digital File (E-book/Design)</option>
              <option value="event">Live Training/Event</option>
              <option value="service">Professional Service</option>
              <option value="course">Video Course</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input type="number" step="0.01" {...register("price")} className="w-full p-2 border rounded-md" />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>
        </div>
      </div>


      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea {...register("description")} className="w-full p-2 border rounded-md h-32" />
      </div>

      {/* Dynamic Field: Only show File URL if type is 'file' */}
      {selectedType === "file" && (
        <div>
          <label className="block text-sm font-medium mb-2">Downloadable File URL</label>
          <input {...register("fileUrl")} className="w-full p-2 border rounded-md" placeholder="https://..." />
        </div>
      )}

      {/* Dynamic Field: Only show Date if type is 'event' */}
      {selectedType === "event" && (
        <div>
          <label className="block text-sm font-medium mb-2">Event Date</label>
          <input type="datetime-local" {...register("eventDate")} className="w-full p-2 border rounded-md" />
        </div>
      )}

<div className="flex justify-end">
      <button 
        type="submit" 
        disabled={loading}
        className="px-5 cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {loading ? "Publishing..." : "List on ServyDash"}
      </button>
      </div>
    </form>
  );
}