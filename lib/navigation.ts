import { NavLink } from "@/types";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    label: "Business",
    href: "/business",
    children: [
      { label: "Automotive Solutions", href: "/business/automotive-solutions" },
      { label: "Energy Solutions", href: "/business/energy-solutions" },
      { label: "Global Trading", href: "/business/global-trading" },
      { label: "Export & Trade", href: "/export-trade" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Contact Us", href: "/contact" },
];

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Business", href: "/business" },
    { label: "Products", href: "/products" },
    { label: "Global Presence", href: "/global-presence" },
  ],
  business: [
    { label: "Automotive Solutions", href: "/business/automotive-solutions" },
    { label: "Energy Solutions", href: "/business/energy-solutions" },
    { label: "Global Trading", href: "/business/global-trading" },
  ],
  company: [
    { label: "Export & Trade", href: "/export-trade" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
    { label: "Request Quote", href: "/request-a-quote" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms & Conditions", href: "/legal/terms" },
    { label: "Refund / Cancellation", href: "/legal/refund-policy" },
    { label: "Shipping Policy", href: "/legal/shipping-policy" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
  ],
};
