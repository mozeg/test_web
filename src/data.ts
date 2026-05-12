import { Watch, DeliveryZone, Order } from './types';

export const initialWatches: Watch[] = [
  {
    id: 1, name: 'رويال أوك كلاسيك', category: 'رجالي', price: 185000,
    discount: 15, image: 'https://picsum.photos/id/1015/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'ساعة كلاسيكية فاخرة بتصميم أيقوني',
    fullDescription: 'تجسد ساعة رويال أوك كلاسيك الرقي والأناقة. مصنوعة من الذهب المطفي عيار 18 قيراط.',
    specs: ['حركة أوتوماتيكية', 'علبة ذهب 18K', 'مقاومة للماء 50م', 'ضمان 5 سنوات'],
    active: true, featured: true
  },
  {
    id: 2, name: 'إيليجانس بلاك', category: 'رجالي', price: 125000,
    discount: 20, image: 'https://picsum.photos/id/160/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'تصميم أسود ملكي مع لمسات ذهبية',
    fullDescription: 'ساعة إيليجانس بلاك تجمع بين التصميم الحديث والتقاليد الفاخرة.',
    specs: ['حركة سويسرية', 'علبة تيتانيوم', 'سوار جلد إيطالي', 'كرونوغراف'],
    active: true, featured: false
  },
  {
    id: 3, name: 'ليدي كريستال', category: 'نسائي', price: 95000,
    discount: 10, image: 'https://picsum.photos/id/201/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'ساعة أنثوية أنيقة مرصعة بالكريستال',
    fullDescription: 'ليدي كريستال هي تحفة فنية للمرأة الراقية.',
    specs: ['حركة كوارتز', 'ذهب مطفي', 'ماسات سويسرية', 'سوار قابل للتعديل'],
    active: true, featured: true
  },
  {
    id: 4, name: 'ليمتد إديشن 2024', category: 'إصدار محدود', price: 320000,
    discount: 5, image: 'https://picsum.photos/id/251/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'ساعة محدودة الإصدار بتصميم فريد',
    fullDescription: 'إصدار محدود للغاية، كل ساعة مرقمة يدوياً.',
    specs: ['محدودة 50 قطعة', 'ذهب أبيض 18K', 'حركة يدوية', 'شهادة أصالة'],
    active: true, featured: true
  },
  {
    id: 5, name: 'كلاسيك وايت', category: 'كلاسيك', price: 78000,
    discount: 25, image: 'https://picsum.photos/id/180/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'تصميم كلاسيكي أبيض كريمي فاخر',
    fullDescription: 'ساعة كلاسيك وايت تجسد البساطة الأنيقة.',
    specs: ['حركة أوتوماتيكية', 'علبة فضة', 'سوار ستانلس ستيل', 'زجاج ياقوتي'],
    active: true, featured: false
  },
  {
    id: 6, name: 'برستيج جولد', category: 'إصدار محدود', price: 245000,
    discount: 12, image: 'https://picsum.photos/id/106/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'ساعة ذهبية فاخرة للمناسبات الخاصة',
    fullDescription: 'برستيج جولد هي قطعة فنية استثنائية.',
    specs: ['ذهب أصفر 18K', 'حركة يدوية', 'نقش يدوي', 'علبة عرض فاخرة'],
    active: true, featured: false
  },
  {
    id: 7, name: 'باشا دي بغداد', category: 'إصدار محدود', price: 198000,
    discount: 8, image: 'https://picsum.photos/id/175/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'ساعة مستوحاة من تراث بغداد العريق',
    fullDescription: 'باشا دي بغداد تحفة فنية تعكس أصالة الحضارة العراقية.',
    specs: ['نقوش عراقية يدوية', 'ذهب عيار 21', 'ضمان 7 سنوات', 'علبة خشب ساج'],
    active: true, featured: true
  },
  {
    id: 8, name: 'الرافدين الذهبي', category: 'رجالي', price: 156000,
    discount: 18, image: 'https://picsum.photos/id/130/600/600',
    video: 'https://www.youtube.com/embed/3JZ_D3ELwO4',
    description: 'ساعة مستوحاة من حضارة بلاد الرافدين',
    fullDescription: 'الرافدين الذهبي تجمع بين الحداثة والتراث العراقي الأصيل.',
    specs: ['حركة سويسرية', 'علبة ذهب مطفي', 'الوان زخرفية عراقية', 'مقاومة للماء'],
    active: true, featured: false
  }
];

// جميع محافظات العراق الـ18
export const initialDeliveryZones: DeliveryZone[] = [
  // بغداد
  {
    id: 'zone-baghdad-center', name: 'بغداد - الكرخ والرصافة', city: 'بغداد',
    price: 5000, isFree: false, hasDiscount: true, discountPercent: 50,
    estimatedDays: 'نفس اليوم', active: true
  },
  {
    id: 'zone-baghdad-free', name: 'بغداد - توصيل مجاني', city: 'بغداد',
    price: 0, isFree: true, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 ساعة', active: true
  },
  {
    id: 'zone-baghdad-suburbs', name: 'بغداد - الضواحي والمناطق النائية', city: 'بغداد',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  // البصرة
  {
    id: 'zone-basra-center', name: 'البصرة - المركز', city: 'البصرة',
    price: 7000, isFree: false, hasDiscount: true, discountPercent: 30,
    estimatedDays: '1-2 يوم', active: true
  },
  {
    id: 'zone-basra-outside', name: 'البصرة - خارج المركز', city: 'البصرة',
    price: 10000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // الموصل
  {
    id: 'zone-mosul-center', name: 'الموصل - الجانب الأيمن', city: 'نينوى',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  {
    id: 'zone-mosul-left', name: 'الموصل - الجانب الأيسر', city: 'نينوى',
    price: 8000, isFree: false, hasDiscount: true, discountPercent: 20,
    estimatedDays: '1-2 يوم', active: true
  },
  // أربيل
  {
    id: 'zone-erbil-center', name: 'أربيل - المركز', city: 'أربيل',
    price: 9000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  {
    id: 'zone-erbil-outside', name: 'أربيل - المناطق الخارجية', city: 'أربيل',
    price: 12000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // السليمانية
  {
    id: 'zone-sulaymaniyah', name: 'السليمانية - المركز', city: 'السليمانية',
    price: 10000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // النجف
  {
    id: 'zone-najaf-center', name: 'النجف الأشرف - المركز', city: 'النجف',
    price: 6000, isFree: false, hasDiscount: true, discountPercent: 40,
    estimatedDays: '1-2 يوم', active: true
  },
  {
    id: 'zone-najaf-outside', name: 'النجف - المناطق الخارجية', city: 'النجف',
    price: 9000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // كربلاء
  {
    id: 'zone-karbala-center', name: 'كربلاء المقدسة - المركز', city: 'كربلاء',
    price: 6000, isFree: false, hasDiscount: true, discountPercent: 40,
    estimatedDays: '1-2 يوم', active: true
  },
  {
    id: 'zone-karbala-outside', name: 'كربلاء - المناطق الخارجية', city: 'كربلاء',
    price: 9000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // بابل
  {
    id: 'zone-babylon', name: 'بابل - الحلة', city: 'بابل',
    price: 7000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  // ديالى
  {
    id: 'zone-diyala', name: 'ديالى - بعقوبة', city: 'ديالى',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  // الأنبار
  {
    id: 'zone-anbar', name: 'الأنبار - الرمادي', city: 'الأنبار',
    price: 10000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // كركوك
  {
    id: 'zone-kirkuk-center', name: 'كركوك - المركز', city: 'كركوك',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  {
    id: 'zone-kirkuk-outside', name: 'كركوك - المناطق الخارجية', city: 'كركوك',
    price: 11000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // واسط
  {
    id: 'zone-wasit', name: 'واسط - الكوت', city: 'واسط',
    price: 7000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  // ميسان
  {
    id: 'zone-maysan', name: 'ميسان - العمارة', city: 'ميسان',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // ذي قار
  {
    id: 'zone-dhiqar', name: 'ذي قار - الناصرية', city: 'ذي قار',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  // المثنى
  {
    id: 'zone-muthanna', name: 'المثنى - السماوة', city: 'المثنى',
    price: 9000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // القادسية
  {
    id: 'zone-qadisiyah', name: 'القادسية - الديوانية', city: 'القادسية',
    price: 8000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '1-2 يوم', active: true
  },
  // صلاح الدين
  {
    id: 'zone-salahaddin', name: 'صلاح الدين - تكريت', city: 'صلاح الدين',
    price: 9000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // الدقهلية (خطأ - اصلاح)
  {
    id: 'zone-dohuk', name: 'دهوك - المركز', city: 'دهوك',
    price: 10000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
  // حلبجة
  {
    id: 'zone-halabja', name: 'حلبجة - المركز', city: 'حلبجة',
    price: 11000, isFree: false, hasDiscount: false, discountPercent: 0,
    estimatedDays: '2-3 أيام', active: true
  },
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'أحمد محمد العراقي',
    customerPhone: '+9647712345678',
    nearestPoint: 'بجانب مول المنصور',
    notes: 'الاتصال قبل الوصول اخوي',
    items: [
      { id: 1, name: 'رويال أوك كلاسيك', price: 157250, quantity: 1, image: 'https://picsum.photos/id/1015/100/100' }
    ],
    subtotal: 157250,
    deliveryFee: 5000,
    deliveryZone: 'بغداد - الكرخ والرصافة',
    deliveryCity: 'بغداد',
    totalPrice: 162250,
    status: 'delivered',
    date: '2026-01-15',
    time: '10:30'
  },
  {
    id: 'ORD-002',
    customerName: 'سارة علي البصراوية',
    customerPhone: '+9647812345678',
    nearestPoint: 'مسجد الكوفة',
    notes: '',
    items: [
      { id: 3, name: 'ليدي كريستال', price: 85500, quantity: 2, image: 'https://picsum.photos/id/201/100/100' }
    ],
    subtotal: 171000,
    deliveryFee: 7000,
    deliveryZone: 'البصرة - المركز',
    deliveryCity: 'البصرة',
    totalPrice: 178000,
    status: 'shipped',
    date: '2026-01-18',
    time: '14:15'
  },
  {
    id: 'ORD-003',
    customerName: 'خالد سعيد الربابعة',
    customerPhone: '+9647912345678',
    nearestPoint: 'أبراج الأندلس',
    notes: 'توصيل بالممسا',
    items: [
      { id: 7, name: 'باشا دي بغداد', price: 182160, quantity: 1, image: 'https://picsum.photos/id/175/100/100' }
    ],
    subtotal: 182160,
    deliveryFee: 0,
    deliveryZone: 'بغداد - توصيل مجاني',
    deliveryCity: 'بغداد',
    totalPrice: 182160,
    status: 'processing',
    date: '2026-01-20',
    time: '09:45'
  },
  {
    id: 'ORD-004',
    customerName: 'نورة الحسيني',
    customerPhone: '+9647612345678',
    nearestPoint: 'מול المأمون',
    notes: 'رسالة بالواتساب قبل التوصيل',
    items: [
      { id: 8, name: 'الرافدين الذهبي', price: 127920, quantity: 1, image: 'https://picsum.photos/id/130/100/100' }
    ],
    subtotal: 127920,
    deliveryFee: 0,
    deliveryZone: 'بغداد - توصيل مجاني',
    deliveryCity: 'بغداد',
    totalPrice: 127920,
    status: 'pending',
    date: '2026-01-22',
    time: '16:20'
  }
];
