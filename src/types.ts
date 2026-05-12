// ==================== TYPES ====================
export interface Watch {
  id: number;
  name: string;
  price: number;
  discount: number;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  video: string;
  specs: string[];
  active: boolean;
  featured: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  city: string;
  price: number;
  isFree: boolean;
  hasDiscount: boolean;
  discountPercent: number;
  estimatedDays: string;
  active: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  nearestPoint: string;
  notes: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  deliveryZone: string;
  deliveryCity: string;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  time: string;
}

export type AdminPage = 'dashboard' | 'products' | 'offers' | 'orders' | 'delivery' | 'settings';
