import { OrdersPageClient } from "@/components/orders/orders-page-client"
import type { Order } from "@/components/orders/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default async function OrdersPage() {
  const { getOrders } = await import("@/actions/orders/get-orders")
  const response = await getOrders()
  
  let mappedOrders: Order[] = []
  
  if (response.isSuccess) {
    mappedOrders = response.data.map((order) => {
      // Format the date strings
      const orderDateObj = new Date(order.createdAt)
      const formattedOrderDate = `${orderDateObj.toLocaleString('default', { month: 'short' })} ${orderDateObj.getDate()}, ${orderDateObj.getFullYear()}`
      
      const updatedDateObj = new Date(order.updatedAt)
      const formattedDeliveryDate = order.status === "DELIVERED" 
        ? `${updatedDateObj.toLocaleString('default', { month: 'short' })} ${updatedDateObj.getDate()}, ${updatedDateObj.getFullYear()}`
        : "Est. " + `${new Date(orderDateObj.setDate(orderDateObj.getDate() + 5)).toLocaleString('default', { month: 'short' })} ${orderDateObj.getDate()}, ${orderDateObj.getFullYear()}`

      // Calculate simple AI insight
      const profitValue = Number(order.profit)
      const totalValue = Number(order.totalAmount)
      const margin = totalValue > 0 ? profitValue / totalValue : 0
      
      let aiInsight: Order["aiInsight"] = "Growing Category"
      if (margin > 0.4) aiInsight = "High Profit"
      else if (margin < 0.1) aiInsight = "Low Margin"
      else if (order.items.length > 3) aiInsight = "Best Seller"

      return {
        id: order.id,
        orderNumber: `ORD-${order.id.slice(0, 8).toUpperCase()}`,
        customerName: order.customer?.name || "Unknown Customer",
        customerAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(order.customer?.name || "U")}`,
        products: order.items.map(item => ({
          name: item.product?.name || "Unknown Product",
          quantity: item.quantity,
          price: Number(item.price),
        })),
        orderDate: formattedOrderDate,
        totalAmount: Number(order.totalAmount),
        paymentMethod: "Credit Card", // Default stub since it's not in Prisma schema
        paymentStatus: order.paymentStatus === "PAID" ? "Paid" : order.paymentStatus === "FAILED" ? "Failed" : order.paymentStatus === "REFUNDED" ? "Refunded" : "Pending",
        orderStatus: order.status === "DELIVERED" ? "Delivered" : order.status === "SHIPPED" ? "Shipped" : order.status === "CANCELLED" ? "Cancelled" : "Processing",
        deliveryDate: formattedDeliveryDate,
        profit: Number(order.profit),
        aiInsight,
      }
    })
  }

  return <OrdersPageClient initialOrders={mappedOrders} />
}
