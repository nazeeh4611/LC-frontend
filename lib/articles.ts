export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
}

export const categories = ["All", "Company News", "Automotive", "Battery & Energy", "Export & Trade", "Sustainability"];

export const articles: Article[] = [
  {
    slug: "louis-calten-expands-battery-manufacturing-capacity",
    category: "Company News",
    title: "Louis CALTEN Expands Battery Manufacturing Capacity to Meet Global Demand",
    excerpt:
      "As demand for lithium battery systems grows across our export markets, we are scaling supply capacity to serve distributors and OEM partners more reliably.",
    content: [
      "Louis CALTEN International LLP continues to invest in expanding its lithium battery supply capacity in response to growing demand from automotive and industrial customers across our export markets.",
      "The expansion is aimed at reducing lead times for distributors and OEM partners while maintaining the quality and safety standards our customers expect from every battery system we supply.",
      "This growth reflects the broader shift toward electric mobility and energy storage across the regions we serve, and we remain focused on scaling responsibly alongside our supplier network.",
    ],
    date: "2026-05-25",
  },
  {
    slug: "new-partnerships-strengthen-supply-chain-across-emerging-markets",
    category: "Export & Trade",
    title: "New Partnerships Strengthen Supply Chain Across Emerging Markets",
    excerpt:
      "Our trading and sourcing network continues to grow, improving lead times and product availability for automotive distributors across the Middle East and Africa.",
    content: [
      "As part of our ongoing global trading strategy, Louis CALTEN International LLP has been strengthening supplier and distribution relationships across emerging markets in the Middle East and Africa.",
      "These partnerships are designed to improve product availability and reduce delivery timelines for our distributor and wholesale customers in the region.",
      "We continue to evaluate new sourcing and distribution opportunities as part of our long-term growth strategy across Southeast Asia, Africa and the Middle East.",
    ],
    date: "2026-05-10",
  },
  {
    slug: "driving-sustainable-future-with-advanced-energy-storage",
    category: "Battery & Energy",
    title: "Driving a Sustainable Future with Advanced Energy Storage Solutions",
    excerpt:
      "How lithium battery technology and responsible sourcing practices are shaping the next generation of automotive and industrial energy storage.",
    content: [
      "Energy storage technology continues to evolve rapidly, and Louis CALTEN International LLP is committed to keeping pace by supplying lithium battery systems built for performance, safety and longevity.",
      "Responsible sourcing remains central to how we select battery suppliers and manufacturing partners, ensuring the products we bring to market meet the standards our customers rely on.",
      "As the automotive and industrial sectors continue to adopt electric and hybrid technologies, we expect demand for advanced energy storage solutions to keep growing across our markets.",
    ],
    date: "2026-04-22",
  },
  {
    slug: "understanding-export-documentation-for-automotive-parts",
    category: "Export & Trade",
    title: "Understanding Export Documentation for Automotive Parts Shipments",
    excerpt:
      "A look at the documentation and compliance steps involved in exporting automotive parts internationally.",
    content: [
      "International trade in automotive parts requires careful attention to documentation — from commercial invoices and packing lists to certificates of origin and, where applicable, FIRC records.",
      "Our export team manages this process end-to-end for every shipment, helping ensure smoother customs clearance for our international buyers.",
      "Understanding these requirements up front helps distributors and buyers plan more accurately around delivery timelines.",
    ],
    date: "2026-03-30",
  },
  {
    slug: "why-quality-testing-matters-in-automotive-parts-trading",
    category: "Automotive",
    title: "Why Quality Testing Matters in Automotive Parts Trading",
    excerpt:
      "A closer look at how we approach quality checks before automotive parts leave our supply chain.",
    content: [
      "Quality control is a critical step in every order we fulfill, whether it's a bulk wholesale shipment or a smaller retail order.",
      "Our sourcing and quality teams work with suppliers to verify products meet the specifications and standards our customers expect before any shipment is dispatched.",
      "This focus on quality is central to building long-term trust with the distributors, garages and service centers we supply.",
    ],
    date: "2026-03-12",
  },
  {
    slug: "responsible-sourcing-in-the-battery-supply-chain",
    category: "Sustainability",
    title: "Responsible Sourcing in the Battery Supply Chain",
    excerpt: "How we think about sustainability and responsible practices across our battery sourcing operations.",
    content: [
      "As lithium battery demand grows, so does the importance of responsible sourcing across the supply chain.",
      "We work to build relationships with suppliers who share our commitment to ethical and quality-first manufacturing practices.",
      "This is an ongoing area of focus as we continue to grow our energy solutions business.",
    ],
    date: "2026-02-18",
  },
];
