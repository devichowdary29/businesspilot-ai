import { prisma } from "@/lib/prisma";
import { BusinessContext } from "./types";

export async function getBusinessContext(orgId: string): Promise<BusinessContext> {
  // Execute all independent database queries concurrently for maximum performance
  const [
    totalProducts,
    totalCustomers,
    totalOrders,
    orderStats,
    inventoryStats,
    lowStockItems,
    topCustomers,
    topProducts,
  ] = await Promise.all([
    prisma.product.count({ where: { organizationId: orgId } }),
    prisma.customer.count({ where: { organizationId: orgId } }),
    prisma.order.count({ where: { organizationId: orgId } }),
    
    // Aggregations for total revenue and profit
    prisma.order.aggregate({
      where: { organizationId: orgId },
      _sum: {
        totalAmount: true,
        profit: true,
      },
    }),

    prisma.inventory.count({ where: { organizationId: orgId } }),
    
    // Low stock items
    // Using a direct findMany since we can filter logic at DB level if desired,
    // or by doing a more complex query. We can get all inventory and filter, but
    // since Prisma doesn't natively support comparing two columns directly in standard where,
    // we fetch them and map. (If large, we'd use raw SQL).
    prisma.inventory.findMany({
      where: { organizationId: orgId },
      include: { product: true },
    }),

    // Top customers by number of orders
    // Realistically we'd group or join. Assuming we find customers ordered by `orders` relation count.
    prisma.customer.findMany({
      where: { organizationId: orgId },
      include: {
        orders: true,
      },
      take: 5,
    }),

    // Top products by price or status. Assuming recent.
    prisma.product.findMany({
      where: { organizationId: orgId },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Transform aggregations mapping Prisma Decimals to Numbers safely
  const totalRevenue = orderStats._sum.totalAmount ? Number(orderStats._sum.totalAmount) : 0;
  const totalProfit = orderStats._sum.profit ? Number(orderStats._sum.profit) : 0;

  // Transform low stock items (quantity <= minimumStock)
  const actualLowStock = lowStockItems
    .filter((inv) => inv.quantity <= inv.minimumStock)
    .map((inv) => ({
      name: inv.product.name,
      quantity: inv.quantity,
      minimumStock: inv.minimumStock,
    }));

  // Map top customers (calculating spent and orders manually if Prisma aggregation isn't perfectly grouping)
  const formattedTopCustomers = topCustomers
    .map((cust) => {
      const ordersCount = cust.orders.length;
      const spent = cust.orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
      return {
        name: cust.name,
        totalSpent: spent,
        totalOrders: ordersCount,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent); // Real sorting by spent

  const formattedTopProducts = topProducts.map((prod) => ({
    name: prod.name,
    category: prod.category || "Uncategorized",
  }));

  return {
    overview: {
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue,
      totalProfit,
    },
    inventory: {
      totalTrackedItems: inventoryStats,
      lowStockItems: actualLowStock,
    },
    customers: {
      topCustomers: formattedTopCustomers,
    },
    products: {
      topProducts: formattedTopProducts,
    },
  };
}
