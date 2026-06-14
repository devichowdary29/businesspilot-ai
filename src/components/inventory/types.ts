

export type InventoryCategory = "Electronics" | "Accessories" | "Audio" | "Storage" | "Wearables"
export type RiskLevel = "Healthy" | "Watch" | "Low" | "Critical"
export type ViewMode = "table" | "grid"

export interface InventoryItem {
  id: string
  productName: string
  productImage: string
  sku: string
  category: InventoryCategory

  currentStock: number
  minimumStock: number
  averageDailySales: number
  daysUntilStockout: number

  supplierName: string
  supplierLeadTime: number // in days
  lastRestockDate: string

  inventoryValue: number
  monthlyDemandGrowth: number // percentage

  riskLevel: RiskLevel
  aiRecommendation: string
}

export interface InventoryFilters {
  search: string
  category: InventoryCategory | "All"
  riskLevel: RiskLevel | "All"
}

export interface InventoryStatsData {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  iconName: "TrendingUp" | "Package" | "AlertTriangle" | "ShieldAlert"
}
