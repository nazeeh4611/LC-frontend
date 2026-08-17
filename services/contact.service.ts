import { apiFetch } from "@/lib/api";

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function submitContactRequest(payload: ContactPayload) {
  return apiFetch<{ id: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
