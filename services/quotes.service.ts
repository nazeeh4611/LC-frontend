const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export interface QuoteRequestResult {
  success: boolean;
  message: string;
  data?: { id: string };
}

/**
 * Submitted as multipart/form-data so a specification sheet or reference
 * file can be attached alongside the RFQ fields.
 */
export async function submitQuoteRequest(formData: FormData): Promise<QuoteRequestResult> {
  try {
    const res = await fetch(`${API_URL}/quotes`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const json = await res.json();
    return json;
  } catch {
    return {
      success: false,
      message: "Unable to reach the server. Please check your connection and try again.",
    };
  }
}
