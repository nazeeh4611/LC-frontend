const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export interface CareerApplyResult {
  success: boolean;
  message: string;
  data?: { id: string };
}

/**
 * Submitted as multipart/form-data so the resume file can be uploaded to
 * Cloudinary alongside the application fields (see backend
 * career.controller.ts).
 */
export async function submitCareerApplication(formData: FormData): Promise<CareerApplyResult> {
  try {
    const res = await fetch(`${API_URL}/careers/apply`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return await res.json();
  } catch {
    return {
      success: false,
      message: "Unable to reach the server. Please check your connection and try again.",
    };
  }
}
