import { useState } from 'react';
import StoreFront from './StoreFront';
import AdminDashboard from './AdminDashboard';
import { Watch, DeliveryZone, Order } from './types';
import { initialWatches, initialDeliveryZones, initialOrders } from './data';

type AppView = 'store' | 'admin';

export default function App() {
  const [view, setView] = useState<AppView>('store');
  const [watches, setWatches] = useState<Watch[]>(initialWatches);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(initialDeliveryZones);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleAddOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  if (view === 'admin') {
    return (
      <AdminDashboard
        watches={watches}
        setWatches={setWatches}
        deliveryZones={deliveryZones}
        setDeliveryZones={setDeliveryZones}
        orders={orders}
        setOrders={setOrders}
        onLogout={() => setView('store')}
      />
    );
  }

  return (
    <StoreFront
      watches={watches}
      deliveryZones={deliveryZones}
      onAddOrder={handleAddOrder}
      onGoToAdmin={() => setView('admin')}
    />
  );
}
