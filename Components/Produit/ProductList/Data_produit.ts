// Data_produit.ts
export type ProductRow = {
  id: number;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  /* clés i18n : */
  titleKey: string;
  descKey: string;
  catKey: string;
  tagKey?: string;
};

export const products: ProductRow[] = [
  { id: 1,  price: 2300, image: '/img/Product/sacluis.png',  rating: 4.4,
    titleKey: 'products.1.title',  descKey: 'products.1.description',  catKey: 'products.1.category' },
  { id: 2,  price: 1600, image: '/img/Product/Car2.png',     rating: 4.3,
    titleKey: 'products.2.title',  descKey: 'products.2.description',  catKey: 'products.2.category',
    tagKey:   'products.2.tag' },
  { id: 3,  price:  750, oldPrice: 800, image: '/img/Product/produit1.webp', rating: 4.5,
    titleKey: 'products.3.title',  descKey: 'products.3.description',  catKey: 'products.3.category' },
  { id: 4,  price:  450, oldPrice: 500, image: '/img/Product/produit5.jpg',  rating: 4.6,
    titleKey: 'products.4.title',  descKey: 'products.4.description',  catKey: 'products.4.category',
    tagKey:   'products.4.tag' },
  { id: 5,  price: 1200, image: '/img/Product/produit1.webp', rating: 4.1,
    titleKey: 'products.5.title',  descKey: 'products.5.description',  catKey: 'products.5.category' },
  { id: 6,  price: 1100, image: '/img/Product/silvio.webp',   rating: 4.2,
    titleKey: 'products.6.title',  descKey: 'products.6.description',  catKey: 'products.6.category',
    tagKey:   'products.6.tag' },
  { id: 7,  price: 1200, image: '/img/Product/produit1.webp', rating: 4.8,
    titleKey: 'products.7.title',  descKey: 'products.7.description',  catKey: 'products.7.category',
    tagKey:   'products.7.tag' },
  { id: 8,  price:  900, image: '/img/Product/produit1.webp', rating: 4.5,
    titleKey: 'products.8.title',  descKey: 'products.8.description',  catKey: 'products.8.category' },
  { id: 9,  price:  600, oldPrice: 650, image: '/img/Product/produit1.webp', rating: 4.3,
    titleKey: 'products.9.title',  descKey: 'products.9.description',  catKey: 'products.9.category',
    tagKey:   'products.9.tag' },
  { id:10,  price: 3500, image: '/img/Product/produit1.webp', rating: 4.7,
    titleKey: 'products.10.title', descKey: 'products.10.description', catKey: 'products.10.category' }
];


/*
    { id: 11, title: "مكابس هيدروليكية", price: 4800, image: "/img/Product/produit1.webp", rating: 4.6, description: "مكابس هيدروليكية قوية للصناعات الثقيلة." },
    { id: 12, title: "أنابيب بلاستيكية", price: 700, image: "/img/Product/produit1.webp", oldPrice: 750, rating: 4.4, description: "أنابيب بلاستيكية عالية الجودة للصرف الصحي." },
    { id: 13, title: "أجهزة كهربائية", price: 1300, image: "/img/Product/produit1.webp", rating: 4.2, description: "أجهزة كهربائية منزلية فعالة وموفرة." },
    { id: 14, title: "معدات رياضية", price: 2200, image: "/img/Product/produit1.webp", tag: "خصم 5%", rating: 4.7, description: "معدات رياضية عالية الجودة للنوادي." },
    { id: 15, title: "كابلات كهربائية", price: 600, image: "/img/Product/produit1.webp", rating: 4.1, description: "كابلات كهربائية معزولة ومطابقة للمواصفات." },
  
    { id: 16, title: "أجهزة تكييف", price: 4300, image: "/img/Product/produit1.webp", rating: 4.8, description: "أجهزة تكييف بقدرات مختلفة للاستخدام المنزلي." },
    { id: 17, title: "أسلاك لحام", price: 900, image: "/img/Product/produit1.webp", tag: "متوفر", rating: 4.3, description: "أسلاك لحام عالية الجودة لجميع المعادن." },
    { id: 18, title: "إضاءة LED", price: 700, image: "/img/Product/produit1.webp", rating: 4.5, description: "مصابيح LED موفرة للطاقة وذات عمر طويل." },
    { id: 19, title: "معدات بناء", price: 3500, image: "/img/Product/produit1.webp", oldPrice: 3700, rating: 4.6, description: "معدات بناء حديثة ومتينة للمشاريع." },
    { id: 20, title: "أدوات حدادة", price: 1200, image: "/img/Product/produit1.webp", rating: 4.2, description: "أدوات حدادة يدوية عالية الجودة." },
  
    { id: 21, title: "مراوح سقف", price: 800, image: "/img/Product/produit1.webp", rating: 4.4, description: "مراوح سقف صامتة وفعالة." },
    { id: 22, title: "ألواح جدارية", price: 1500, image: "/img/Product/produit1.webp", tag: "خصم 7%", rating: 4.3, description: "ألواح جدارية سهلة التركيب وعازلة." },
    { id: 23, title: "مواد عازلة", price: 1300, image: "/img/Product/produit1.webp", rating: 4.6, description: "مواد عازلة للحرارة والصوت عالية الجودة." },
    { id: 24, title: "دهانات داخلية", price: 650, image: "/img/Product/produit1.webp", rating: 4.1, description: "دهانات داخلية بألوان متعددة ومشرقة." },
    { id: 25, title: "معدات سلامة", price: 900, image: "/img/Product/produit1.webp", rating: 4.7, description: "معدات سلامة شخصية وصناعية معتمدة." },
  
    { id: 26, title: "خزائن معدنية", price: 2100, image: "/img/Product/produit1.webp", tag: "متوفر", rating: 4.5, description: "خزائن معدنية متينة لحفظ المستندات." },
    { id: 27, title: "أدوات كهربائية", price: 1400, image: "/img/Product/produit1.webp", rating: 4.4, description: "أدوات كهربائية عالية الأداء للورش." },
    { id: 28, title: "أجهزة مراقبة", price: 3200, image: "/img/Product/produit1.webp", oldPrice: 3400, rating: 4.3, description: "أجهزة مراقبة حديثة للمنازل والشركات." },
    { id: 29, title: "مضخات مياه", price: 2800, image: "/img/Product/produit1.webp", rating: 4.6, description: "مضخات مياه فعالة وعالية الجودة." },
    { id: 30, title: "أقمشة صناعية", price: 1100, image: "/img/Product/produit1.webp", rating: 4.2, description: "أقمشة صناعية متينة للاستخدامات المختلفة." },
  
  */  
  
  