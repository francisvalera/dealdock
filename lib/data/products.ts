export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number; // ₱
  image: string;
  isFeatured?: boolean;
};

export const PRODUCTS: Product[] = [
{ id: "p1", title: "High-Performance Piston Kit", brand: "Brand A", category: "engine", price: 2500, image: "/kklogo.jpg", isFeatured: true },
{ id: "p2", title: "Racing Brake Caliper Set", brand: "Brand B", category: "brake", price: 3800, image: "/kklogo.jpg", isFeatured: true },
{ id: "p3", title: "Titanium Full Exhaust System",brand: "Brand C", category: "exhaust", price: 7950, image: "/kklogo.jpg", isFeatured: true },
{ id: "p4", title: "Custom CNC Side Mirrors", brand: "Brand D", category: "accessory", price: 1200, image: "/kklogo.jpg", isFeatured: true },
];

export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();
export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();