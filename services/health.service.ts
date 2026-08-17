import { apiFetch } from "@/lib/api";

export interface HealthStatus {
  status: string;
  service: string;
  timestamp: string;
  database: "connected" | "disconnected";
}

export function getApiHealth() {
  return apiFetch<HealthStatus>("/health");
}
