import React, { useState } from 'react';
import { Watch, DeliveryZone, Order, OrderItem } from './types';
import { Search, MapPin, X, ChevronRight, Check } from 'lucide-react';

interface StoreProps {
  watches: Watch[];
  deliveryZones: DeliveryZone[];
  onAddOrder: (order: Order) => void;
  onGoToAdmin: () => void;
}

type CheckoutStep = 'cart' | 'delivery' | 'info' | 'confirm';

export default function StoreFront({ watches, deliveryZones, onAddOrder, onGoToAdmin }: StoreProps) {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [cart, setCart] = useState<Watch[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Checkout state
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [nearestPoint, setNearestPoint] = useState('');
  const [notes, setNotes] = useState('');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const categories = ['الكل', 'رجالي', 'نسائي', 'كلاسيك', 'إصدار محدود'];
  const activeWatches = watches.filter(w => w.active);
  const activeZones = deliveryZones.filter(z => z.active);

  const filteredWatches = activeWatches.filter(w => {
    const matchCategory = selectedCategory === 'الكل' || w.category === selectedCategory;
    const matchSearch = !searchQuery || w.name.includes(searchQuery) || w.description.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const addToCart = (watch: Watch) => {
    setCart([...cart, watch]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartItems: OrderItem[] = cart.map(w => ({
    id: w.id,
    name: w.name,
    price: Math.floor(w.price * (1 - w.discount / 100)),
    quantity: 1,
    image: w.image
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getDeliveryFee = () => {
    if (!selectedZone) return 0;
    if (selectedZone.isFree) return 0;
    if (selectedZone.hasDiscount) return Math.floor(selectedZone.price * (1 - selectedZone.discountPercent / 100));
    return selectedZone.price;
  };

  const deliveryFee = getDeliveryFee();
  const totalPrice = subtotal + deliveryFee;

  const resetCheckout = () => {
    setCheckoutStep('cart');
    setSelectedZone(null);
    setCustomerName('');
    setCustomerPhone('');
    setNearestPoint('');
    setNotes('');
    setCart([]);
    setIsCartOpen(false);
    setShowCheckoutSuccess(false);
  };

  const handlePlaceOrder = () => {
    if (!selectedZone || !customerName.trim() || !customerPhone.trim() || !nearestPoint.trim()) return;

    const now = new Date();
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      nearestPoint: nearestPoint.trim(),
      notes: notes.trim(),
      items: cartItems,
      subtotal,
      deliveryFee,
      deliveryZone: selectedZone.name,
      deliveryCity: selectedZone.city,
      totalPrice,
      status: 'pending',
      date: now.toISOString().split('T')[0],
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };

    onAddOrder(order);
    setShowCheckoutSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e6] font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#c5a26f]/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c5a26f] flex items-center justify-center">
              <span className="text-[#0a0a0a] font-serif text-2xl font-bold">F</span>
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl tracking-[4px] text-[#c5a26f]">FASHIONISTA</h1>
              <p className="text-[9px] text-[#c5a26f]/70 -mt-1">EST 1897</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm tracking-[2px]">
            <a href="#shop" className="hover:text-[#c5a26f] transition-colors">المتجر</a>
            <a href="#about" className="hover:text-[#c5a26f] transition-colors">عنّا</a>
            <a href="#contact" className="hover:text-[#c5a26f] transition-colors">تواصل</a>
            <button onClick={onGoToAdmin} className="text-[#c5a26f]/50 hover:text-[#c5a26f] transition-colors text-xs">لوحة التحكم</button>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-3 hover:bg-white/5 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}
              className="relative p-3 hover:bg-white/5 rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#c5a26f] text-[#0a0a0a] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </div>
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t border-[#c5a26f]/20 bg-[#0a0a0a]">
            <div className="max-w-3xl mx-auto px-6 py-4">
              <input type="text" placeholder="ابحث عن ساعة..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-[#c5a26f]/40 py-3 text-xl placeholder:text-[#c5a26f]/50 focus:outline-none font-serif" autoFocus />
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative h-[100dvh] flex items-center justify-center pt-20 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#c5a26f_0.6px,transparent_1px)] bg-[length:5px_5px] opacity-10"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-block px-5 py-1 mb-6 border border-[#c5a26f]/50 text-xs tracking-[4px] text-[#c5a26f]">SINCE 1897</div>
          <h2 className="font-serif text-[50px] md:text-[80px] leading-[0.9] tracking-[-3px] mb-6">
            فاشنيستا<br />حيث يلتقي الزمن بالأناقة
          </h2>
          <p className="text-xl text-[#c5a26f]/80 tracking-wide">مجموعة حصرية من الساعات الفاخرة</p>
          <a href="#shop" className="mt-10 inline-block border-2 border-[#c5a26f] px-12 py-4 text-sm tracking-[3px] hover:bg-[#c5a26f] hover:text-[#0a0a0a] transition-all duration-300">
            استكشف المجموعة
          </a>
        </div>
      </div>

      {/* Products */}
      <div id="shop" className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[#c5a26f] text-sm tracking-[3px]">CURATED COLLECTION</div>
            <h3 className="font-serif text-5xl md:text-6xl tracking-tight mt-1">الساعات الفاخرة</h3>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-sm tracking-wider border transition-all rounded-full ${selectedCategory === cat ? 'bg-[#c5a26f] text-black border-[#c5a26f]' : 'border-[#c5a26f]/40 hover:border-[#c5a26f] hover:bg-white/5'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch, index) => {
            const discountedPrice = Math.floor(watch.price * (1 - watch.discount / 100));
            return (
              <div key={watch.id} onClick={() => setSelectedWatch(watch)}
                className="group bg-[#111] border border-[#c5a26f]/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#c5a26f]/40 hover:-translate-y-1"
                style={{ animation: `fadeInUp 0.6s ease forwards ${index * 60}ms` }}>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={watch.image} alt={watch.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.12]" />
                  <div className="absolute top-5 right-5 bg-black/80 px-4 py-1 text-xs tracking-widest text-[#c5a26f] border border-[#c5a26f]/30">
                    -{watch.discount}%
                  </div>
                </div>
                <div className="p-8">
                  <div className="uppercase text-[#c5a26f] text-xs tracking-[3px] mb-2">{watch.category}</div>
                  <h4 className="font-serif text-2xl md:text-3xl tracking-tight mb-4">{watch.name}</h4>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-mono text-2xl md:text-3xl tracking-tighter">{discountedPrice.toLocaleString()}</span>
                    <span className="text-[#c5a26f]/50 line-through text-sm">{watch.price.toLocaleString()} د.ع</span>
                  </div>
                  <p className="text-[#c5a26f]/70 text-[15px] leading-relaxed mb-6">{watch.description}</p>
                  <button onClick={(e) => { e.stopPropagation(); addToCart(watch); }}
                    className="w-full border border-[#c5a26f] py-3 text-sm tracking-[2px] hover:bg-[#c5a26f] hover:text-[#0a0a0a] transition-all">
                    أضف إلى السلة
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {filteredWatches.length === 0 && (
          <div className="text-center py-20 text-[#c5a26f]/40 text-xl">لا توجد منتجات متاحة</div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedWatch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4" onClick={() => setSelectedWatch(null)}>
          <div className="bg-[#111] max-w-5xl w-full rounded-3xl overflow-hidden border border-[#c5a26f]/20 max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-black">
                <img src={selectedWatch.image} alt="" className="w-full rounded-2xl mb-6" />
                {selectedWatch.video && (
                  <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-950">
                    <iframe width="100%" height="100%" src={selectedWatch.video} title="Video" allowFullScreen></iframe>
                  </div>
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col">
                <button onClick={() => setSelectedWatch(null)} className="self-end text-[#c5a26f] mb-6"><X className="w-6 h-6" /></button>
                <div className="uppercase tracking-[4px] text-[#c5a26f] text-sm mb-3">{selectedWatch.category}</div>
                <h2 className="font-serif text-4xl md:text-6xl tracking-tighter mb-6">{selectedWatch.name}</h2>
                <div className="flex items-end gap-4 mb-8">
                  <span className="font-mono text-4xl md:text-6xl tracking-[-2px]">
                    {Math.floor(selectedWatch.price * (1 - selectedWatch.discount / 100)).toLocaleString()}
                  </span>
                  <span className="text-xl text-[#c5a26f]/60 line-through">{selectedWatch.price.toLocaleString()} د.ع</span>
                </div>
                <p className="text-xl text-[#c5a26f]/90 leading-relaxed mb-8">{selectedWatch.fullDescription}</p>
                <div className="mb-8">
                  <div className="text-[#c5a26f] text-xs tracking-widest mb-4">المواصفات</div>
                  <ul className="grid grid-cols-1 gap-y-3 text-[#c5a26f]/90">
                    {selectedWatch.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="inline-block w-1.5 h-px bg-[#c5a26f]"></span> {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <button onClick={() => { addToCart(selectedWatch); setSelectedWatch(null); }}
                    className="w-full py-4 bg-[#c5a26f] text-[#0a0a0a] tracking-[3px] font-medium text-sm hover:bg-white transition-all">
                    أضف إلى السلة — {Math.floor(selectedWatch.price * (1 - selectedWatch.discount / 100)).toLocaleString()} د.ع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4" onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }}>
          <div className="bg-[#111] w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl border border-[#c5a26f]/20" onClick={e => e.stopPropagation()}>

            {/* Success State */}
            {showCheckoutSuccess ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="font-serif text-4xl text-white mb-4">تم حجز طلبك بنجاح!</h2>
                <p className="text-[#c5a26f]/80 text-lg mb-8">سنتواصل معك قريباً لتأكيد الطلب</p>
                <div className="bg-[#0a0a0a] rounded-2xl p-6 mb-8 text-right">
                  <div className="flex justify-between mb-3">
                    <span className="text-white/40">رقم الطلب</span>
                    <span className="font-mono text-[#c5a26f]">ORD-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-white/40">الإجمالي</span>
                    <span className="font-mono text-white">{totalPrice.toLocaleString()} د.ع</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">منطقة التوصيل</span>
                    <span className="text-white">{selectedZone?.name}</span>
                  </div>
                </div>
                <button onClick={resetCheckout}
                  className="bg-[#c5a26f] text-[#0a0a0a] px-12 py-4 rounded-xl tracking-[3px] text-sm font-bold hover:bg-white transition-all">
                  العودة للمتجر
                </button>
              </div>
            ) : (
              <>
                {/* Progress Steps */}
                <div className="p-6 border-b border-[#c5a26f]/20">
                  <div className="flex items-center justify-center gap-2">
                    {['cart', 'delivery', 'info', 'confirm'].map((step, i) => (
                      <React.Fragment key={step}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          checkoutStep === step ? 'bg-[#c5a26f] text-[#0a0a0a]' :
                          ['cart', 'delivery', 'info', 'confirm'].indexOf(checkoutStep) > i ? 'bg-green-500 text-white' : 'bg-[#0a0a0a] text-white/30 border border-[#2a2a3a]'
                        }`}>
                          {['cart', 'delivery', 'info', 'confirm'].indexOf(checkoutStep) > i ? <Check className="w-4 h-4" /> : i + 1}
                        </div>
                        {i < 3 && <div className={`w-12 h-0.5 ${['cart', 'delivery', 'info', 'confirm'].indexOf(checkoutStep) > i ? 'bg-green-500' : 'bg-[#2a2a3a]'}`}></div>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex justify-center gap-8 mt-3 text-xs text-white/40">
                    <span>السلة</span>
                    <span>التوصيل</span>
                    <span>البيانات</span>
                    <span>التأكيد</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6 md:p-8">
                  {/* Step 1: Cart */}
                  {checkoutStep === 'cart' && (
                    <div>
                      <h3 className="font-serif text-2xl text-white mb-6">سلة المشتريات</h3>
                      {cart.length === 0 ? (
                        <div className="text-center py-12 text-white/40">سلتك فارغة</div>
                      ) : (
                        <>
                          <div className="space-y-4 mb-8">
                            {cart.map((item, idx) => {
                              const price = Math.floor(item.price * (1 - item.discount / 100));
                              return (
                                <div key={idx} className="flex gap-4 bg-[#0a0a0a] rounded-xl p-4">
                                  <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                                  <div className="flex-1">
                                    <div className="text-white font-medium">{item.name}</div>
                                    <div className="font-mono text-[#c5a26f]">{price.toLocaleString()} د.ع</div>
                                  </div>
                                  <button onClick={() => removeFromCart(idx)} className="text-white/30 hover:text-red-400 transition">
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <div className="border-t border-[#c5a26f]/20 pt-6 flex justify-between items-center mb-6">
                            <span className="text-white/60">المجموع الفرعي</span>
                            <span className="font-mono text-2xl text-white">{subtotal.toLocaleString()} د.ع</span>
                          </div>
                          <button onClick={() => setCheckoutStep('delivery')}
                            className="w-full bg-[#c5a26f] text-[#0a0a0a] py-4 rounded-xl tracking-[3px] text-sm font-bold hover:bg-white transition-all flex items-center justify-center gap-2">
                            اختر منطقة التوصيل <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 2: Delivery Zone */}
                  {checkoutStep === 'delivery' && (
                    <div>
                      <h3 className="font-serif text-2xl text-white mb-2">اختر منطقة التوصيل</h3>
                      <p className="text-white/40 text-sm mb-6">حدد منطقة التوصيل المناسبة</p>
                      <div className="space-y-3 mb-8 max-h-[50vh] overflow-y-auto">
                        {activeZones.map(zone => {
                          const effectivePrice = zone.isFree ? 0 : zone.hasDiscount ? Math.floor(zone.price * (1 - zone.discountPercent / 100)) : zone.price;
                          return (
                            <div key={zone.id}
                              onClick={() => setSelectedZone(zone)}
                              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                                selectedZone?.id === zone.id ? 'border-[#c5a26f] bg-[#c5a26f]/10' : 'border-[#2a2a3a] hover:border-[#c5a26f]/40 bg-[#0a0a0a]'
                              }`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <MapPin className={`w-5 h-5 ${selectedZone?.id === zone.id ? 'text-[#c5a26f]' : 'text-white/40'}`} />
                                  <div>
                                    <div className="text-white font-medium">{zone.name}</div>
                                    <div className="text-white/40 text-sm">{zone.city} • {zone.estimatedDays}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  {zone.isFree ? (
                                    <span className="text-green-400 font-bold">مجاني 🎉</span>
                                  ) : (
                                    <div>
                                      {zone.hasDiscount && <span className="text-white/30 line-through text-xs mr-2">{zone.price} د.ع</span>}
                                      <span className="font-mono text-[#c5a26f]">{effectivePrice} د.ع</span>
                                    </div>
                                  )}
                                  {zone.hasDiscount && <div className="text-yellow-400 text-xs mt-1">خصم {zone.discountPercent}%</div>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setCheckoutStep('cart')} className="px-6 py-3 rounded-xl border border-[#2a2a3a] text-white/60 hover:bg-white/5 transition">
                          رجوع
                        </button>
                        <button onClick={() => setCheckoutStep('info')} disabled={!selectedZone}
                          className="flex-1 bg-[#c5a26f] text-[#0a0a0a] py-3 rounded-xl tracking-[2px] text-sm font-bold hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                          التالي
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Customer Info */}
                  {checkoutStep === 'info' && (
                    <div>
                      <h3 className="font-serif text-2xl text-white mb-2">معلومات التوصيل</h3>
                      <p className="text-white/40 text-sm mb-6">أدخل بياناتك للتوصيل</p>
                      <div className="space-y-5 mb-8">
                        <div>
                          <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">الاسم الكامل *</label>
                          <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#2a2a3a] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a26f] transition"
                            placeholder="أدخل اسمك الكامل" />
                          {customerName === '' && <p className="text-red-400 text-xs mt-1 hidden first:block">هذا الحقل مطلوب</p>}
                        </div>
                        <div>
                          <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">رقم الجوال *</label>
                          <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#2a2a3a] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a26f] transition"
                            placeholder="+966 5X XXX XXXX" dir="ltr" />
                        </div>
                        <div>
                          <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">أقرب نقطة دالة *</label>
                          <input type="text" value={nearestPoint} onChange={e => setNearestPoint(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#2a2a3a] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a26f] transition"
                            placeholder="مثال: بجانب مول النخيل، مقابل المسجد" />
                        </div>
                        <div>
                          <label className="block text-[#c5a26f]/80 text-xs tracking-widest mb-2">ملاحظات (اختياري)</label>
                          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                            className="w-full bg-[#0a0a0a] border border-[#2a2a3a] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a26f] transition resize-none"
                            placeholder="أي ملاحظات إضافية لصاحب المتجر..." />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setCheckoutStep('delivery')} className="px-6 py-3 rounded-xl border border-[#2a2a3a] text-white/60 hover:bg-white/5 transition">
                          رجوع
                        </button>
                        <button
                          onClick={() => setCheckoutStep('confirm')}
                          disabled={!customerName.trim() || !customerPhone.trim() || !nearestPoint.trim()}
                          className="flex-1 bg-[#c5a26f] text-[#0a0a0a] py-3 rounded-xl tracking-[2px] text-sm font-bold hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                          التالي — تأكيد الطلب
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {checkoutStep === 'confirm' && (
                    <div>
                      <h3 className="font-serif text-2xl text-white mb-2">تأكيد الطلب</h3>
                      <p className="text-white/40 text-sm mb-6">راجع طلبك قبل التأكيد النهائي</p>

                      {/* Products Summary */}
                      <div className="bg-[#0a0a0a] rounded-2xl p-5 mb-4">
                        <div className="text-[#c5a26f] text-xs tracking-widest mb-4">المنتجات</div>
                        <div className="space-y-3">
                          {cartItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                              <div className="flex-1 text-white text-sm">{item.name}</div>
                              <div className="font-mono text-[#c5a26f]">{item.price.toLocaleString()} د.ع</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Info Summary */}
                      <div className="bg-[#0a0a0a] rounded-2xl p-5 mb-4">
                        <div className="text-[#c5a26f] text-xs tracking-widest mb-4">معلومات التوصيل</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-white/40">الاسم</span><span className="text-white">{customerName}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">الهاتف</span><span className="text-white" dir="ltr">{customerPhone}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">المنطقة</span><span className="text-white">{selectedZone?.name} - {selectedZone?.city}</span></div>
                          <div className="flex justify-between"><span className="text-white/40">نقطة دالة</span><span className="text-white">{nearestPoint}</span></div>
                          {notes && <div className="flex justify-between"><span className="text-white/40">ملاحظات</span><span className="text-white text-xs max-w-[60%] text-left">{notes}</span></div>}
                        </div>
                      </div>

                      {/* Price Summary */}
                      <div className="bg-[#0a0a0a] rounded-2xl p-5 mb-6">
                        <div className="text-[#c5a26f] text-xs tracking-widest mb-4">ملخص الفاتورة</div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/40">المجموع الفرعي</span>
                            <span className="font-mono text-white">{subtotal.toLocaleString()} د.ع</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40">رسوم التوصيل</span>
                            <span className={`font-mono ${deliveryFee === 0 ? 'text-green-400' : 'text-white'}`}>
                              {deliveryFee === 0 ? 'مجاني 🎉' : `${deliveryFee.toLocaleString()} د.ع`}
                            </span>
                          </div>
                          <div className="border-t border-[#2a2a3a] pt-3 flex justify-between">
                            <span className="text-white font-bold text-lg">الإجمالي</span>
                            <span className="font-mono text-2xl text-[#c5a26f]">{totalPrice.toLocaleString()} د.ع</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button onClick={() => setCheckoutStep('info')} className="px-6 py-3 rounded-xl border border-[#2a2a3a] text-white/60 hover:bg-white/5 transition">
                          رجوع
                        </button>
                        <button onClick={handlePlaceOrder}
                          className="flex-1 bg-gradient-to-r from-[#c5a26f] to-[#d4b88a] text-[#0a0a0a] py-4 rounded-xl tracking-[3px] text-sm font-bold hover:shadow-lg hover:shadow-[#c5a26f]/20 transition-all">
                          حجز الطلب الآن 🛍️
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="border-t border-[#c5a26f]/20 bg-black py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-y-14 text-sm">
          <div>
            <div className="font-serif text-[#c5a26f] text-5xl tracking-[-1.5px] mb-2">FASHIONISTA</div>
            <div className="text-[#c5a26f]/50">بغداد • البصرة • الموصل • أربيل</div>
          </div>
          <div className="grid grid-cols-2 gap-y-8 text-[#c5a26f]/80">
            <div>
              <div className="font-medium tracking-widest text-xs mb-4 text-[#c5a26f]">التواصل</div>
              <div>+964 771 234 5678</div>
              <div>hello@fashionista.iq</div>
            </div>
            <div>
              <div className="font-medium tracking-widest text-xs mb-4 text-[#c5a26f]">الروابط</div>
              <div>المتجر • خدمات العملاء • الضمان</div>
            </div>
          </div>
        </div>
        <div className="text-center text-[#c5a26f]/30 text-xs tracking-widest mt-20">© 1897 — 2026 FASHIONISTA العراق. جميع الحقوق محفوظة.</div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .font-serif { font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif; }
      `}</style>
    </div>
  );
}
