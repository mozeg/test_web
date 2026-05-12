import React, { useState } from 'react';
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Settings, LogOut,
  Plus, Edit3, Trash2, Eye, Search, DollarSign,
  Menu, X, AlertCircle, Clock, Shield,
  Truck, MapPin
} from 'lucide-react';
import { Watch, DeliveryZone, Order, AdminPage } from './types';

interface AdminProps {
  watches: Watch[];
  setWatches: (w: Watch[]) => void;
  deliveryZones: DeliveryZone[];
  setDeliveryZones: (d: DeliveryZone[]) => void;
  orders: Order[];
  setOrders: (o: Order[]) => void;
  onLogout: () => void;
}

// ==================== LOGIN PAGE ====================
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (username === 'admin' && password === 'fashionista2026') {
        onLogin();
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c5a26f]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c5a26f]/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#c5a26f_0.5px,transparent_1px)] bg-[length:30px_30px] opacity-[0.07]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#c5a26f]/20 to-[#c5a26f]/5 border-2 border-[#c5a26f]/30 mb-6 animate-pulse-gold">
            <Shield className="w-10 h-10 text-[#c5a26f]" />
          </div>
          <h1 className="font-serif text-5xl tracking-[6px] text-[#c5a26f] mb-3">FASHIONISTA</h1>
          <p className="text-white/40 text-sm tracking-[4px]">لوحة التحكم الإدارية</p>
        </div>

        <div className="bg-[#1c1c28]/80 backdrop-blur-xl border border-[#2a2a3a] rounded-3xl p-10 shadow-2xl">
          <h2 className="text-2xl font-serif text-white mb-2 text-center">تسجيل الدخول</h2>
          <p className="text-white/40 text-sm text-center mb-8">أدخل بياناتك للوصول إلى لوحة التحكم</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-3">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a26f] transition-all"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-3">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a26f] transition-all"
                placeholder="fashionista2026"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#c5a26f] to-[#a68a54] text-black font-bold py-4 rounded-xl tracking-widest text-sm hover:shadow-lg hover:shadow-[#c5a26f]/20 transition-all disabled:opacity-60"
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#2a2a3a] text-center">
            <p className="text-white/20 text-xs tracking-wider">
              بيانات الدخول: admin / fashionista2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== STATUS BADGE ====================
function StatusBadge({ status }: { status: Order['status'] }) {
  const config: Record<Order['status'], { label: string; bg: string }> = {
    pending: { label: 'قيد الانتظار', bg: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
    processing: { label: 'قيد التجهيز', bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    shipped: { label: 'تم الشحن', bg: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
    delivered: { label: 'تم التسليم', bg: 'bg-green-500/15 text-green-400 border-green-500/30' },
    cancelled: { label: 'ملغي', bg: 'bg-red-500/15 text-red-400 border-red-500/30' },
  };
  const c = config[status];
  return <span className={`status-badge border ${c.bg}`}>{c.label}</span>;
}

// ==================== DASHBOARD PAGE ====================
function DashboardPage({ watches, orders }: { watches: Watch[]; orders: Order[] }) {
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.totalPrice, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const activeProducts = watches.filter(p => p.active).length;
  const totalOrders = orders.length;

  const stats = [
    { label: 'إجمالي الإيرادات', value: `${totalRevenue.toLocaleString()}`, unit: 'د.ع', icon: DollarSign, color: 'from-emerald-500/20 to-emerald-500/5', iconColor: 'text-emerald-400' },
    { label: 'الطلبات الجديدة', value: pendingOrders.toString(), unit: 'طلب', icon: Clock, color: 'from-yellow-500/20 to-yellow-500/5', iconColor: 'text-yellow-400' },
    { label: 'إجمالي الطلبات', value: totalOrders.toString(), unit: 'طلب', icon: ShoppingCart, color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-400' },
    { label: 'المنتجات النشطة', value: activeProducts.toString(), unit: 'منتج', icon: Package, color: 'from-[#c5a26f]/20 to-[#c5a26f]/5', iconColor: 'text-[#c5a26f]' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-[#c5a26f]/10 via-[#1c1c28] to-[#1c1c28] border border-[#2a2a3a] rounded-2xl p-8">
        <h2 className="font-serif text-3xl text-white mb-2">مرحباً بك في لوحة التحكم 👋</h2>
        <p className="text-white/50">إليك ملخص أداء متجر Fashionista</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} border border-[#2a2a3a] rounded-2xl p-6 hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.iconColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-white/30 text-xs tracking-wider">{stat.unit}</span>
            </div>
            <div className="font-mono text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/40 text-sm tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl p-6">
        <h3 className="font-serif text-xl text-white mb-6">أحدث الطلبات</h3>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-[#0a0a0f]/40 rounded-xl hover:bg-[#0a0a0f]/60 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c5a26f]/10 flex items-center justify-center text-[#c5a26f] font-serif text-sm">
                  {order.customerName.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{order.customerName}</div>
                  <div className="text-white/40 text-xs">{order.deliveryZone} • {order.id}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm font-mono">{order.totalPrice.toLocaleString()} د.ع</div>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCTS PAGE ====================
function ProductsPage({ watches, setWatches }: { watches: Watch[]; setWatches: (w: Watch[]) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Watch | null>(null);
  const [formData, setFormData] = useState<Partial<Watch>>({});
  const [newSpec, setNewSpec] = useState('');

  const filtered = watches.filter(p => p.name.includes(searchTerm) || p.category.includes(searchTerm));

  const openAdd = () => {
    setEditing(null);
    setFormData({ name: '', category: 'رجالي', price: 0, discount: 0, image: '', video: '', description: '', fullDescription: '', specs: [], active: true, featured: false });
    setShowModal(true);
  };

  const openEdit = (w: Watch) => {
    setEditing(w);
    setFormData({ ...w });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;
    if (editing) {
      setWatches(watches.map(p => p.id === editing.id ? { ...p, ...formData } as Watch : p));
    } else {
      const newW: Watch = {
        id: Date.now(),
        name: formData.name || '',
        category: formData.category || 'رجالي',
        price: formData.price || 0,
        discount: formData.discount || 0,
        image: formData.image || 'https://picsum.photos/id/1015/400/400',
        video: formData.video || '',
        description: formData.description || '',
        fullDescription: formData.fullDescription || '',
        specs: formData.specs || [],
        active: true,
        featured: false,
      };
      setWatches([...watches, newW]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setWatches(watches.filter(p => p.id !== id));
    }
  };

  const addSpec = () => {
    if (newSpec.trim()) {
      setFormData({ ...formData, specs: [...(formData.specs || []), newSpec.trim()] });
      setNewSpec('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-white">إدارة المنتجات</h2>
          <p className="text-white/40 text-sm mt-1">إضافة وتعديل وحذف المنتجات</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#c5a26f] text-black px-6 py-3 rounded-xl font-bold text-sm tracking-wider hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> إضافة منتج
        </button>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <input type="text" placeholder="ابحث عن منتج..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1c1c28] border border-[#2a2a3a] rounded-xl pr-12 pl-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#c5a26f] transition-all" />
      </div>

      <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a3a]">
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">المنتج</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">الفئة</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">السعر</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">الخصم</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">الحالة</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id} className="border-b border-[#2a2a3a]/50 hover:bg-[#0a0a0f]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={w.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <div className="text-white text-sm font-medium">{w.name}</div>
                        <div className="text-white/40 text-xs">{w.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="bg-[#c5a26f]/10 text-[#c5a26f] text-xs px-3 py-1 rounded-full">{w.category}</span></td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-white text-sm">{w.price.toLocaleString()} د.ع</div>
                    <div className="text-[#c5a26f] text-xs">{Math.floor(w.price * (1 - w.discount / 100)).toLocaleString()} د.ع</div>
                  </td>
                  <td className="px-6 py-4"><span className="text-[#c5a26f] font-mono text-sm">{w.discount}%</span></td>
                  <td className="px-6 py-4">
                    <span className={`status-badge ${w.active ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-red-500/15 text-red-400 border-red-500/30'}`}>
                      {w.active ? 'نشط' : 'معطل'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(w)} className="p-2 rounded-lg bg-[#c5a26f]/10 text-[#c5a26f] hover:bg-[#c5a26f]/20 transition"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(w.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-white/30">لا توجد منتجات</div>}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-white">{editing ? 'تعديل المنتج' : 'إضافة منتج'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/5 text-white/40"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">اسم المنتج *</label>
                  <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
                </div>
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">الفئة</label>
                  <select value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition">
                    <option value="رجالي">رجالي</option>
                    <option value="نسائي">نسائي</option>
                    <option value="كلاسيك">كلاسيك</option>
                    <option value="إصدار محدود">إصدار محدود</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">السعر *</label>
                  <input type="number" value={formData.price || ''} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
                </div>
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">نسبة الخصم %</label>
                  <input type="number" value={formData.discount || ''} onChange={e => setFormData({ ...formData, discount: Number(e.target.value) })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
                </div>
              </div>

              <div>
                <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">رابط الصورة</label>
                <input type="text" value={formData.image || ''} onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
              </div>

              <div>
                <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">رابط الفيديو</label>
                <input type="text" value={formData.video || ''} onChange={e => setFormData({ ...formData, video: e.target.value })}
                  className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
              </div>

              <div>
                <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">الوصف المختصر</label>
                <textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2}
                  className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition resize-none" />
              </div>

              <div>
                <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">الوصف الكامل</label>
                <textarea value={formData.fullDescription || ''} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} rows={3}
                  className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition resize-none" />
              </div>

              <div>
                <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">المواصفات</label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={newSpec} onChange={e => setNewSpec(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSpec())}
                    className="flex-1 bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" placeholder="أضف مواصفة..." />
                  <button onClick={addSpec} className="bg-[#c5a26f]/10 text-[#c5a26f] px-4 rounded-xl hover:bg-[#c5a26f]/20 transition"><Plus className="w-5 h-5" /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.specs || []).map((spec, i) => (
                    <span key={i} className="bg-[#c5a26f]/10 text-[#c5a26f] text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                      {spec}
                      <button onClick={() => setFormData({ ...formData, specs: formData.specs?.filter((_, idx) => idx !== i) })} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`toggle-switch ${formData.active ? 'active' : ''}`} onClick={() => setFormData({ ...formData, active: !formData.active })}></div>
                  <span className="text-white/60 text-sm">نشط</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`toggle-switch ${formData.featured ? 'active' : ''}`} onClick={() => setFormData({ ...formData, featured: !formData.featured })}></div>
                  <span className="text-white/60 text-sm">مميز</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#2a2a3a]">
                <button onClick={handleSave} className="flex-1 bg-[#c5a26f] text-black py-3 rounded-xl font-bold text-sm tracking-wider hover:shadow-lg transition-all">
                  {editing ? 'حفظ' : 'إضافة'}
                </button>
                <button onClick={() => setShowModal(false)} className="px-8 py-3 rounded-xl border border-[#2a2a3a] text-white/60 hover:bg-white/5 transition">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== OFFERS PAGE ====================
function OffersPage({ watches, setWatches }: { watches: Watch[]; setWatches: (w: Watch[]) => void }) {
  const toggleActive = (id: number) => {
    setWatches(watches.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const activeOffers = watches.filter(p => p.active && p.discount > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-serif text-3xl text-white">إدارة العروض</h2>
        <p className="text-white/40 text-sm mt-1">تفعيل وتعطيل الخصومات</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6">
          <div className="text-green-400 text-3xl font-bold mb-1">{activeOffers.length}</div>
          <div className="text-white/40 text-sm">عروض نشطة</div>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <div className="text-red-400 text-3xl font-bold mb-1">{watches.filter(p => !p.active).length}</div>
          <div className="text-white/40 text-sm">عروض معطلة</div>
        </div>
        <div className="bg-gradient-to-br from-[#c5a26f]/10 to-[#c5a26f]/5 border border-[#c5a26f]/20 rounded-2xl p-6">
          <div className="text-[#c5a26f] text-3xl font-bold mb-1">{activeOffers.length > 0 ? Math.round(activeOffers.reduce((s, p) => s + p.discount, 0) / activeOffers.length) : 0}%</div>
          <div className="text-white/40 text-sm">متوسط الخصم</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watches.map((w) => (
          <div key={w.id} className={`bg-[#1c1c28] border rounded-2xl overflow-hidden transition-all hover:scale-[1.02] ${w.active ? 'border-[#c5a26f]/30' : 'border-[#2a2a3a]/50 opacity-60'}`}>
            <div className="relative">
              <img src={w.image} alt="" className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 bg-black/70 px-4 py-1.5 text-xs tracking-widest text-[#c5a26f] border border-[#c5a26f]/30 rounded-full">
                خصم {w.discount}%
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-serif text-xl text-white mb-2">{w.name}</h4>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-2xl text-[#c5a26f]">{Math.floor(w.price * (1 - w.discount / 100)).toLocaleString()}</span>
                <span className="text-white/30 line-through text-sm">{w.price.toLocaleString()} د.ع</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`status-badge ${w.active ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-red-500/15 text-red-400 border-red-500/30'}`}>
                  {w.active ? 'نشط' : 'معطل'}
                </span>
                <button onClick={() => toggleActive(w.id)} className={`toggle-switch ${w.active ? 'active' : ''}`}></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== DELIVERY PAGE ====================
function DeliveryPage({ deliveryZones, setDeliveryZones }: { deliveryZones: DeliveryZone[]; setDeliveryZones: (d: DeliveryZone[]) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<DeliveryZone | null>(null);
  const [formData, setFormData] = useState<Partial<DeliveryZone>>({});

  const openAdd = () => {
    setEditing(null);
    setFormData({ name: '', city: '', price: 0, isFree: false, hasDiscount: false, discountPercent: 0, estimatedDays: '1-2 يوم', active: true });
    setShowModal(true);
  };

  const openEdit = (zone: DeliveryZone) => {
    setEditing(zone);
    setFormData({ ...zone });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.city) return;
    if (editing) {
      setDeliveryZones(deliveryZones.map(z => z.id === editing.id ? { ...z, ...formData } as DeliveryZone : z));
    } else {
      const newZone: DeliveryZone = {
        id: `zone-${Date.now()}`,
        name: formData.name || '',
        city: formData.city || '',
        price: formData.isFree ? 0 : (formData.price || 0),
        isFree: formData.isFree || false,
        hasDiscount: formData.hasDiscount || false,
        discountPercent: formData.hasDiscount ? (formData.discountPercent || 0) : 0,
        estimatedDays: formData.estimatedDays || '1-2 يوم',
        active: true,
      };
      setDeliveryZones([...deliveryZones, newZone]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف منطقة التوصيل هذه؟')) {
      setDeliveryZones(deliveryZones.filter(z => z.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setDeliveryZones(deliveryZones.map(z => z.id === id ? { ...z, active: !z.active } : z));
  };

  const getEffectivePrice = (zone: DeliveryZone) => {
    if (zone.isFree) return 0;
    if (zone.hasDiscount) return Math.floor(zone.price * (1 - zone.discountPercent / 100));
    return zone.price;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-white">إدارة التوصيل</h2>
          <p className="text-white/40 text-sm mt-1">إضافة وتعديل مناطق التوصيل</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#c5a26f] text-black px-6 py-3 rounded-xl font-bold text-sm tracking-wider hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> إضافة منطقة
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6">
          <div className="text-green-400 text-3xl font-bold mb-1">{deliveryZones.filter(z => z.active).length}</div>
          <div className="text-white/40 text-sm">مناطق نشطة</div>
        </div>
        <div className="bg-gradient-to-br from-[#c5a26f]/10 to-[#c5a26f]/5 border border-[#c5a26f]/20 rounded-2xl p-6">
          <div className="text-[#c5a26f] text-3xl font-bold mb-1">{deliveryZones.filter(z => z.isFree).length}</div>
          <div className="text-white/40 text-sm">توصيل مجاني</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
          <div className="text-purple-400 text-3xl font-bold mb-1">{deliveryZones.filter(z => z.hasDiscount).length}</div>
          <div className="text-white/40 text-sm">خصومات توصيل</div>
        </div>
      </div>

      <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a3a]">
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">المنطقة</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">المدينة</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">سعر التوصيل</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">الخصم</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">الوقت</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">الحالة</th>
                <th className="text-right text-[#c5a26f]/80 text-xs tracking-widest px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {deliveryZones.map((zone) => (
                <tr key={zone.id} className="border-b border-[#2a2a3a]/50 hover:bg-[#0a0a0f]/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#c5a26f]" />
                      <span className="text-white text-sm">{zone.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-white/60 text-sm">{zone.city}</span></td>
                  <td className="px-6 py-4">
                    {zone.isFree ? (
                      <span className="text-green-400 font-bold text-sm">مجاني 🎉</span>
                    ) : (
                      <div>
                        {zone.hasDiscount && <span className="text-white/30 line-through text-xs mr-2">{zone.price} د.ع</span>}
                        <span className="font-mono text-[#c5a26f]">{getEffectivePrice(zone)} د.ع</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {zone.hasDiscount ? (
                      <span className="bg-[#c5a26f]/10 text-[#c5a26f] text-xs px-3 py-1 rounded-full">{zone.discountPercent}%</span>
                    ) : (
                      <span className="text-white/30 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">{zone.estimatedDays}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleActive(zone.id)} className={`toggle-switch ${zone.active ? 'active' : ''}`}></button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(zone)} className="p-2 rounded-lg bg-[#c5a26f]/10 text-[#c5a26f] hover:bg-[#c5a26f]/20 transition"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(zone.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={() => setShowModal(false)}>
          <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-3xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl text-white">{editing ? 'تعديل منطقة' : 'إضافة منطقة'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-white/5 text-white/40"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">اسم المنطقة *</label>
                  <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" placeholder="مثال: شمال الرياض" />
                </div>
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">المدينة *</label>
                  <input type="text" value={formData.city || ''} onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" placeholder="الرياض" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">سعر التوصيل (د.ع)</label>
                  <input type="number" value={formData.isFree ? 0 : (formData.price || '')} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    disabled={formData.isFree}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition disabled:opacity-30" />
                </div>
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">وقت التوصيل</label>
                  <select value={formData.estimatedDays || ''} onChange={e => setFormData({ ...formData, estimatedDays: e.target.value })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition">
                    <option value="نفس اليوم">نفس اليوم</option>
                    <option value="1-2 يوم">1-2 يوم</option>
                    <option value="2-3 أيام">2-3 أيام</option>
                    <option value="3-5 أيام">3-5 أيام</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`toggle-switch ${formData.isFree ? 'active' : ''}`} onClick={() => setFormData({ ...formData, isFree: !formData.isFree, price: formData.isFree ? formData.price : 0 })}></div>
                  <span className="text-white/60 text-sm">توصيل مجاني</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`toggle-switch ${formData.hasDiscount ? 'active' : ''}`} onClick={() => setFormData({ ...formData, hasDiscount: !formData.hasDiscount })}></div>
                  <span className="text-white/60 text-sm">خصم على التوصيل</span>
                </label>
              </div>

              {formData.hasDiscount && !formData.isFree && (
                <div>
                  <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">نسبة الخصم %</label>
                  <input type="number" value={formData.discountPercent || ''} onChange={e => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                    className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-[#2a2a3a]">
                <button onClick={handleSave} className="flex-1 bg-[#c5a26f] text-black py-3 rounded-xl font-bold text-sm tracking-wider hover:shadow-lg transition-all">
                  {editing ? 'حفظ' : 'إضافة'}
                </button>
                <button onClick={() => setShowModal(false)} className="px-8 py-3 rounded-xl border border-[#2a2a3a] text-white/60 hover:bg-white/5 transition">إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== ORDERS PAGE ====================
function OrdersPage({ orders, setOrders }: { orders: Order[]; setOrders: (o: Order[]) => void }) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showDetail, setShowDetail] = useState<Order | null>(null);

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const statusLabels: Record<string, string> = {
    all: 'الكل', pending: 'انتظار', processing: 'تجهيز', shipped: 'شحن', delivered: 'تسليم', cancelled: 'ملغي'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-white">إدارة الطلبات</h2>
          <p className="text-white/40 text-sm mt-1">متابعة وإدارة طلبات الزبائن ({orders.length} طلب)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 text-xs tracking-wider rounded-full border transition-all ${filterStatus === s ? 'bg-[#c5a26f] text-black border-[#c5a26f]' : 'border-[#2a2a3a] text-white/40 hover:text-white hover:border-[#c5a26f]/50'}`}>
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 text-lg">لا توجد طلبات</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl p-6 hover:border-[#c5a26f]/30 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#c5a26f]/10 flex items-center justify-center text-[#c5a26f] font-serif text-lg">
                    {order.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{order.customerName}</div>
                    <div className="text-white/40 text-sm flex items-center gap-3">
                      <span>{order.id}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{order.deliveryZone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <div className="text-white/40 text-xs">المنتجات</div>
                    <div className="text-white text-sm">{order.items.length}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs">الإجمالي</div>
                    <div className="font-mono text-[#c5a26f]">{order.totalPrice.toLocaleString()} د.ع</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white/40 text-xs">التاريخ</div>
                    <div className="text-white/60 text-sm">{order.date}</div>
                  </div>
                  <StatusBadge status={order.status} />
                  <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                    className="bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a26f]">
                    <option value="pending">انتظار</option>
                    <option value="processing">تجهيز</option>
                    <option value="shipped">شحن</option>
                    <option value="delivered">تسليم</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                  <button onClick={() => setShowDetail(order)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-white">تفاصيل الطلب</h3>
              <button onClick={() => setShowDetail(null)} className="p-2 rounded-xl hover:bg-white/5 text-white/40"><X className="w-6 h-6" /></button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-[#2a2a3a]">
                <span className="text-white/40 text-sm">رقم الطلب</span>
                <span className="font-mono text-[#c5a26f]">{showDetail.id}</span>
              </div>
              <div className="flex justify-between"><span className="text-white/40 text-sm">الزبون</span><span className="text-white">{showDetail.customerName}</span></div>
              <div className="flex justify-between"><span className="text-white/40 text-sm">الهاتف</span><span className="text-white" dir="ltr">{showDetail.customerPhone}</span></div>
              <div className="flex justify-between"><span className="text-white/40 text-sm">المنطقة</span><span className="text-white">{showDetail.deliveryZone} - {showDetail.deliveryCity}</span></div>
              <div className="flex justify-between"><span className="text-white/40 text-sm">نقطة دالة</span><span className="text-white">{showDetail.nearestPoint}</span></div>
              {showDetail.notes && <div className="flex justify-between"><span className="text-white/40 text-sm">ملاحظات</span><span className="text-white text-sm">{showDetail.notes}</span></div>}

              <div className="pt-3 border-t border-[#2a2a3a]">
                <div className="text-[#c5a26f]/80 text-xs tracking-widest mb-3">المنتجات</div>
                {showDetail.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0a0a0f]/40 rounded-xl p-3 mb-2">
                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-white text-sm">{item.name}</div>
                      <div className="text-white/40 text-xs">الكمية: {item.quantity}</div>
                    </div>
                    <div className="font-mono text-[#c5a26f]">{(item.price * item.quantity).toLocaleString()} د.ع</div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#2a2a3a] space-y-2">
                <div className="flex justify-between"><span className="text-white/40 text-sm">المجموع الفرعي</span><span className="font-mono text-white">{showDetail.subtotal.toLocaleString()} د.ع</span></div>
                <div className="flex justify-between"><span className="text-white/40 text-sm">التوصيل</span><span className="font-mono text-white">{showDetail.deliveryFee === 0 ? 'مجاني' : showDetail.deliveryFee.toLocaleString() + ' د.ع'}</span></div>
                <div className="flex justify-between pt-2 border-t border-[#2a2a3a]"><span className="text-white font-bold">الإجمالي</span><span className="font-mono text-2xl text-[#c5a26f]">{showDetail.totalPrice.toLocaleString()} د.ع</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SETTINGS PAGE ====================
function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-serif text-3xl text-white">الإعدادات</h2>
        <p className="text-white/40 text-sm mt-1">إعدادات المتجر</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl p-8">
          <h3 className="font-serif text-xl text-white mb-6">معلومات المتجر</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">اسم المتجر</label>
              <input type="text" defaultValue="Fashionista" className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
            </div>
            <div>
              <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">البريد الإلكتروني</label>
              <input type="email" defaultValue="admin@fashionista.iq" className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
            </div>
            <div>
              <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">رقم الهاتف</label>
              <input type="tel" defaultValue="+964 771 234 5678" className="w-full bg-[#0a0a0f]/60 border border-[#2a2a3a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c5a26f] transition" />
            </div>
            <button className="bg-[#c5a26f] text-black px-8 py-3 rounded-xl font-bold text-sm tracking-wider hover:shadow-lg transition-all">
              حفظ التغييرات
            </button>
          </div>
        </div>

        <div className="bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl p-8">
          <h3 className="font-serif text-xl text-white mb-6">ربط قاعدة البيانات</h3>
          <div className="space-y-4">
            <div className="bg-[#0a0a0f]/40 rounded-xl p-4 border border-[#2a2a3a]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-400 text-sm">Firebase - متصل</span>
              </div>
              <div className="text-white/40 text-xs space-y-1">
                <p>• المشروع: fashionista-admin</p>
                <p>• آخر مزامنة: منذ 5 دقائق</p>
              </div>
            </div>
            <div className="bg-[#0a0a0f]/40 rounded-xl p-4 border border-[#2a2a3a]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-yellow-400 text-sm">MySQL - غير متصل</span>
              </div>
              <div className="text-white/40 text-xs">
                <p>• خادم: localhost:3306</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN ADMIN COMPONENT ====================
export default function AdminDashboard({ watches, setWatches, deliveryZones, setDeliveryZones, orders, setOrders, onLogout }: AdminProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const menuItems: { id: AdminPage; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'offers', label: 'العروض', icon: Tag },
    { id: 'delivery', label: 'التوصيل', icon: Truck },
    { id: 'orders', label: 'الطلبات', icon: ShoppingCart, badge: orders.filter(o => o.status === 'pending').length },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-[#16161e] border-l border-[#2a2a3a] flex-col transition-all duration-300 fixed h-full z-40 hidden md:flex`}>
        <div className="p-6 border-b border-[#2a2a3a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5a26f] to-[#a68a54] flex items-center justify-center flex-shrink-0">
              <span className="text-black font-serif text-xl font-bold">F</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-serif text-[#c5a26f] text-lg tracking-[3px]">FASHIONISTA</h1>
                <p className="text-white/30 text-[10px] tracking-widest">لوحة التحكم</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)}
              className={`sidebar-link w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm transition-all ${currentPage === item.id ? 'bg-[#c5a26f]/10 text-[#c5a26f]' : 'text-white/50 hover:text-white/80'}`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="tracking-wider flex-1 text-right">{item.label}</span>}
              {sidebarOpen && item.badge && item.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2a2a3a]">
          <button onClick={onLogout}
            className="sidebar-link w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400/70 hover:text-red-400 text-sm transition-all">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="tracking-wider">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 ${sidebarOpen ? 'md:mr-72' : 'md:mr-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-[#1c1c28]/50 backdrop-blur-xl border-b border-[#2a2a3a] sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-white/5 text-white/40">
                <Menu className="w-5 h-5" />
              </button>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block p-2 rounded-xl hover:bg-white/5 text-white/40">
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-white font-medium">{menuItems.find(m => m.id === currentPage)?.label}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage('orders')} className="relative p-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition">
                <ShoppingCart className="w-5 h-5" />
                {orders.filter(o => o.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {orders.filter(o => o.status === 'pending').length}
                  </span>
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a26f] to-[#a68a54] flex items-center justify-center">
                <span className="text-black font-bold text-sm">م</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-72 h-full bg-[#16161e] p-6 animate-slide-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-serif text-[#c5a26f] text-lg tracking-[3px]">FASHIONISTA</h1>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/40"><X className="w-6 h-6" /></button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                    className={`sidebar-link w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm ${currentPage === item.id ? 'bg-[#c5a26f]/10 text-[#c5a26f]' : 'text-white/50'}`}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && <span className="bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-auto">{item.badge}</span>}
                  </button>
                ))}
                <button onClick={onLogout} className="sidebar-link w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-400/70 text-sm mt-6">
                  <LogOut className="w-5 h-5" /> تسجيل الخروج
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 md:p-8">
          {currentPage === 'dashboard' && <DashboardPage watches={watches} orders={orders} />}
          {currentPage === 'products' && <ProductsPage watches={watches} setWatches={setWatches} />}
          {currentPage === 'offers' && <OffersPage watches={watches} setWatches={setWatches} />}
          {currentPage === 'delivery' && <DeliveryPage deliveryZones={deliveryZones} setDeliveryZones={setDeliveryZones} />}
          {currentPage === 'orders' && <OrdersPage orders={orders} setOrders={setOrders} />}
          {currentPage === 'settings' && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}
