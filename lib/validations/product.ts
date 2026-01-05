import * as z from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Please provide a detailed description"),
  type: z.enum(["file", "event", "service", "course"]),
  price: z.coerce.number({
    error: "Price must be a number",
  }).min(0, "Price must be a positive number"),
  fileUrl: z.string().url("Please provide a valid download link").optional(),
  eventDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;