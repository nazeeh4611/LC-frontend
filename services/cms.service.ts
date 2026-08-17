import { apiFetch } from "@/lib/api";

export interface GlobalPresenceLocation {
  _id: string;
  country: string;
  region?: string;
  city?: string;
  label: string;
  description?: string;
  latitude: number;
  longitude: number;
  image?: string;
  active: boolean;
}

export interface BusinessActivity {
  _id: string;
  title: string;
  category: string;
  description: string;
  services: string[];
  industries: string[];
  image?: string;
  active: boolean;
}

export interface Certification {
  _id: string;
  name: string;
  issuingAuthority?: string;
  certificateNumber?: string;
  image?: string;
  documentUrl?: string;
  description?: string;
  active: boolean;
}

export interface DeliveryPartner {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  serviceDescription?: string;
  active: boolean;
}

export interface PaymentPartner {
  _id: string;
  name: string;
  logo?: string;
  supportedMethods: string[];
  active: boolean;
}

export interface JobPosting {
  _id: string;
  title: string;
  department?: string;
  location: string;
  employmentType: string;
  experienceLevel?: string;
  description?: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  applicationDeadline?: string;
  status: string;
}

export interface CmsNewsArticle {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const fetchGlobalPresence = () => apiFetch<GlobalPresenceLocation[]>("/cms/global-presence");
export const fetchBusinessActivities = () => apiFetch<BusinessActivity[]>("/cms/business-activities");
export const fetchCertifications = () => apiFetch<Certification[]>("/cms/certifications");
export const fetchDeliveryPartners = () => apiFetch<DeliveryPartner[]>("/cms/delivery-partners");
export const fetchPaymentPartners = () => apiFetch<PaymentPartner[]>("/cms/payment-partners");
export const fetchJobPostings = () => apiFetch<JobPosting[]>("/cms/careers");
export const fetchJobPosting = (id: string) => apiFetch<JobPosting>(`/cms/careers/${id}`);

export interface NewsListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export function fetchNewsList(params: NewsListParams = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, String(value));
  });
  const qs = query.toString();
  return apiFetch<{ items: CmsNewsArticle[]; pagination: { page: number; totalPages: number; total: number } }>(
    `/cms/news${qs ? `?${qs}` : ""}`
  );
}

export function fetchNewsBySlug(slug: string) {
  return apiFetch<{ article: CmsNewsArticle; related: CmsNewsArticle[] }>(`/cms/news/${slug}`);
}
