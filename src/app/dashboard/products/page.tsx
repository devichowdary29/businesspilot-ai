import { ProductsPageClient } from "@/components/products/products-page-client"
import type { Product } from "@/components/products/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function ProductsPage() {
  const { getProducts } = await import("@/actions/products/get-products")
  const response = await getProducts()
  
  let mappedProducts: Product[] = []
  
  if (response.isSuccess) {
    mappedProducts = response.data.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category as any,
      description: product.description || "",
      price: Number(product.price),
      costPrice: Number(product.cost),
      stockQuantity: 0,
      minimumStock: 10,
      status: product.status === "ACTIVE" ? "Healthy" : product.status === "OUT_OF_STOCK" ? "Critical" : "Low Stock",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      aiInsight: { type: "trending", label: "New Product", emoji: "✨" },
      createdAt: new Date(product.createdAt).toISOString().split("T")[0],
    }))
  }

  return <ProductsPageClient initialProducts={mappedProducts} />
}
