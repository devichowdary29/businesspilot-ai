import { ProductsPageClient } from "@/components/products/products-page-client"
import type { Product } from "@/components/products/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function ProductsPage() {
  const { getProducts } = await import("@/actions/products/get-products")
  const response = await getProducts()
  
  let mappedProducts: Product[] = []
  
  if (response.isSuccess) {
    mappedProducts = response.data.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category as any,
      description: p.description || "",
      price: Number(p.price),
      costPrice: Number(p.cost),
      stockQuantity: 0,
      minimumStock: 10,
      status: p.status === "ACTIVE" ? "Healthy" : p.status === "OUT_OF_STOCK" ? "Critical" : "Low Stock",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      aiInsight: { type: "trending", label: "New Product", emoji: "✨" },
      createdAt: new Date(p.createdAt).toISOString().split("T")[0],
    }))
  }

  return <ProductsPageClient initialProducts={mappedProducts} />
}
