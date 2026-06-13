import { type LucideIcon } from "lucide-react"

export type ProductStatus = "Healthy" | "Low Stock" | "Critical"

export type ProductCategory = "Electronics" | "Accessories" | "Audio"

export type AiInsightType =
  | "trending"
  | "restock"
  | "slow-moving"
  | "bundle-opportunity"

export interface AiInsightBadge {
  type: AiInsightType
  label: string
  emoji: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  sku: string
  description: string
  price: number
  costPrice: number
  stockQuantity: number
  minimumStock: number
  status: ProductStatus
  image: string
  aiInsight: AiInsightBadge
  createdAt: string
}

export type ViewMode = "table" | "grid"

export interface ProductFilters {
  search: string
  category: ProductCategory | "All"
  status: ProductStatus | "All"
}

export interface ProductFormData {
  name: string
  description: string
  category: ProductCategory
  sku: string
  price: string
  costPrice: string
  stockQuantity: string
  minimumStock: string
}

export const initialProductFormData: ProductFormData = {
  name: "",
  description: "",
  category: "Electronics",
  sku: "",
  price: "",
  costPrice: "",
  stockQuantity: "",
  minimumStock: "",
}

export const categories: ProductCategory[] = [
  "Electronics",
  "Accessories",
  "Audio",
]

export const statuses: ProductStatus[] = ["Healthy", "Low Stock", "Critical"]
