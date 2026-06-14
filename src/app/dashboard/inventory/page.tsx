import { InventoryPageClient } from "@/components/inventory/inventory-page-client"
import type { InventoryItem } from "@/components/inventory/types"
import type { AvailableProductForInventory } from "@/actions/inventory/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function InventoryPage() {
  const { getInventory } = await import("@/actions/inventory/get-inventory")
  const { getProducts } = await import("@/actions/products/get-products")
  
  const [response, productsResponse] = await Promise.all([
    getInventory(),
    getProducts()
  ])
  
  let mappedItems: InventoryItem[] = []
  let trackedProductIds = new Set<string>()
  
  if (response.isSuccess) {
    trackedProductIds = new Set(response.data.map(item => item.productId))
    mappedItems = response.data.map((item) => {
      // Calculate risk level based on stock ratio
      const ratio = item.quantity / item.minimumStock
      let riskLevel: InventoryItem["riskLevel"] = "Healthy"
      
      if (item.quantity === 0 || ratio <= 0.5) {
        riskLevel = "Critical"
      } else if (ratio <= 1.0) {
        riskLevel = "Low"
      } else if (ratio <= 1.5) {
        riskLevel = "Watch"
      }

      // Simple AI recommendation simulation
      let aiRecommendation = "Stock levels are optimal."
      if (riskLevel === "Critical") {
        aiRecommendation = `Immediate restock required. Average daily sales: ${item.dailySalesAvg}.`
      } else if (riskLevel === "Low") {
        aiRecommendation = `Plan to restock within ${Math.max(1, Math.floor(item.quantity / (item.dailySalesAvg || 1)))} days.`
      }

      const daysUntilStockout = item.dailySalesAvg && item.dailySalesAvg > 0
        ? Math.floor(item.quantity / item.dailySalesAvg)
        : 999;

      // Ensure proper formatting of dates
      const lastRestockDateObj = new Date(item.updatedAt)
      const formattedRestockDate = `${lastRestockDateObj.toLocaleString('default', { month: 'short' })} ${lastRestockDateObj.getDate()}, ${lastRestockDateObj.getFullYear()}`

      return {
        id: item.id,
        productName: item.product.name,
        productImage: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(item.product.name)}`,
        sku: item.product.sku,
        category: item.product.category as any, // Cast to UI type if they mismatch, though schema string is fine
        
        currentStock: item.quantity,
        minimumStock: item.minimumStock,
        averageDailySales: item.dailySalesAvg || 0,
        daysUntilStockout: daysUntilStockout,

        supplierName: item.supplier || "Unknown Supplier",
        supplierLeadTime: item.leadTimeDays || 0,
        lastRestockDate: formattedRestockDate,

        inventoryValue: item.quantity * Number(item.product.cost),
        monthlyDemandGrowth: 0, // Stub

        riskLevel: riskLevel,
        aiRecommendation: aiRecommendation,
      }
    })
  }

  let availableProducts: AvailableProductForInventory[] = []
  if (productsResponse.isSuccess) {
    availableProducts = productsResponse.data
      .filter(p => !trackedProductIds.has(p.id))
      .map(p => ({ id: p.id, name: p.name }))
  }

  return <InventoryPageClient initialItems={mappedItems} availableProducts={availableProducts} />
}
