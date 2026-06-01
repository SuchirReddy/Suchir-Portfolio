"use server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function submitContactMessage(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      return {
        error: "Invalid form data. Please check your inputs.",
        success: false,
      };
    }

    await prisma.contactMessage.create({
      data: parsed.data,
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return {
      error: "Something went wrong. Please try again later.",
      success: false,
    };
  }
}
