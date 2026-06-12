import { IndianRupee, ShoppingCart, TrendingUp, Target } from "lucide-react"
import type { Order, OrderStatsData } from "./types"

export const orderStats: OrderStatsData[] = [
  {
    title: "Total Revenue",
    value: "₹12,45,000",
    change: "+18% this month",
    changeType: "positive",
    icon: IndianRupee,
  },
  {
    title: "Total Orders",
    value: "3,456",
    change: "+12% growth",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Average Order Value",
    value: "₹3,620",
    change: "+6% increase",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    title: "Profit Margin",
    value: "42%",
    change: "Healthy margin",
    changeType: "positive",
    icon: Target,
  },
]

export const orders: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "#10042",
    customerName: "Arjun Mehta",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Arjun",
    products: [
      { name: "Wireless Mouse", quantity: 2, price: 999 },
      { name: "Mechanical Keyboard", quantity: 1, price: 2499 }
    ],
    orderDate: "10 Jun 2026",
    totalAmount: 4497,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryDate: "12 Jun 2026",
    profit: 1800,
    aiInsight: "High Profit",
  },
  {
    id: "ORD-002",
    orderNumber: "#10043",
    customerName: "Neha Sharma",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Neha",
    products: [
      { name: "Laptop Stand", quantity: 1, price: 1299 }
    ],
    orderDate: "11 Jun 2026",
    totalAmount: 1299,
    paymentMethod: "UPI",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    deliveryDate: "14 Jun 2026",
    profit: 300,
    aiInsight: "Low Margin",
  },
  {
    id: "ORD-003",
    orderNumber: "#10044",
    customerName: "Rohan Kumar",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Rohan",
    products: [
      { name: "USB-C Hub", quantity: 1, price: 1899 },
      { name: "Webcam", quantity: 1, price: 2999 }
    ],
    orderDate: "11 Jun 2026",
    totalAmount: 4898,
    paymentMethod: "Debit Card",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    deliveryDate: "15 Jun 2026",
    profit: 2100,
    aiInsight: "Growing Category",
  },
  {
    id: "ORD-004",
    orderNumber: "#10045",
    customerName: "Priya Desai",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Priya",
    products: [
      { name: "Monitor Light Bar", quantity: 1, price: 3499 }
    ],
    orderDate: "12 Jun 2026",
    totalAmount: 3499,
    paymentMethod: "UPI",
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    deliveryDate: "-",
    profit: 0,
    aiInsight: "Best Seller",
  },
  {
    id: "ORD-005",
    orderNumber: "#10046",
    customerName: "Aditya Singh",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Aditya",
    products: [
      { name: "Noise Cancelling Headphones", quantity: 2, price: 4999 }
    ],
    orderDate: "12 Jun 2026",
    totalAmount: 9998,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    deliveryDate: "16 Jun 2026",
    profit: 4500,
    aiInsight: "High Profit",
  },
  {
    id: "ORD-006",
    orderNumber: "#10047",
    customerName: "Kavya Reddy",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Kavya",
    products: [
      { name: "Bluetooth Speaker", quantity: 1, price: 1999 },
      { name: "Wireless Mouse", quantity: 1, price: 999 }
    ],
    orderDate: "12 Jun 2026",
    totalAmount: 2998,
    paymentMethod: "Net Banking",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryDate: "13 Jun 2026",
    profit: 1100,
    aiInsight: "Best Seller",
  },
  {
    id: "ORD-007",
    orderNumber: "#10048",
    customerName: "Vikram Malhotra",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Vikram",
    products: [
      { name: "Webcam", quantity: 3, price: 2999 }
    ],
    orderDate: "13 Jun 2026",
    totalAmount: 8997,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    deliveryDate: "17 Jun 2026",
    profit: 3200,
    aiInsight: "Growing Category",
  },
  {
    id: "ORD-008",
    orderNumber: "#10049",
    customerName: "Ananya Patel",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Ananya",
    products: [
      { name: "Mechanical Keyboard", quantity: 1, price: 2499 }
    ],
    orderDate: "13 Jun 2026",
    totalAmount: 2499,
    paymentMethod: "Credit Card",
    paymentStatus: "Refunded",
    orderStatus: "Cancelled",
    deliveryDate: "-",
    profit: 0,
    aiInsight: "Best Seller",
  },
  {
    id: "ORD-009",
    orderNumber: "#10050",
    customerName: "Sanjay Gupta",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sanjay",
    products: [
      { name: "Laptop Stand", quantity: 2, price: 1299 },
      { name: "USB-C Hub", quantity: 2, price: 1899 }
    ],
    orderDate: "13 Jun 2026",
    totalAmount: 6396,
    paymentMethod: "UPI",
    paymentStatus: "Pending",
    orderStatus: "Processing",
    deliveryDate: "18 Jun 2026",
    profit: 2600,
    aiInsight: "Growing Category",
  },
  {
    id: "ORD-010",
    orderNumber: "#10051",
    customerName: "Meera Nair",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Meera",
    products: [
      { name: "Noise Cancelling Headphones", quantity: 1, price: 4999 },
      { name: "Bluetooth Speaker", quantity: 1, price: 1999 }
    ],
    orderDate: "13 Jun 2026",
    totalAmount: 6998,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryDate: "15 Jun 2026",
    profit: 3100,
    aiInsight: "High Profit",
  },
  {
    id: "ORD-011",
    orderNumber: "#10052",
    customerName: "Karan Johar",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Karan",
    products: [
      { name: "Monitor Light Bar", quantity: 2, price: 3499 }
    ],
    orderDate: "14 Jun 2026",
    totalAmount: 6998,
    paymentMethod: "Debit Card",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    deliveryDate: "19 Jun 2026",
    profit: 2800,
    aiInsight: "Growing Category",
  },
  {
    id: "ORD-012",
    orderNumber: "#10053",
    customerName: "Sneha Reddy",
    customerAvatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sneha",
    products: [
      { name: "Wireless Mouse", quantity: 5, price: 999 }
    ],
    orderDate: "14 Jun 2026",
    totalAmount: 4995,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryDate: "16 Jun 2026",
    profit: 1500,
    aiInsight: "Low Margin",
  }
]
