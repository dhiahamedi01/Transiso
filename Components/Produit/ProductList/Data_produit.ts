export type Product = {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    image: string;
    tag?: string;
    rating: number;
    description: string;
    category:string;
  };
  
  export const products: Product[] = [
      
    { id: 1, title: "مكائن خياطة", price: 2300, image: "/img/Product/produit1.webp", rating: 4.4, category: "معدات صناعية", description: "مكائن خياطة صناعية وعادية لجميع الأقمشة." },
    { id: 2, title: "ألواح خشبية", price: 1100, image: "/img/Product/silvio.webp", tag: "متوفر", rating: 4.2, category: "مواد البناء", description: "ألواح خشبية صلبة ومقاومة للرطوبة." },
    { id: 3, title: "دهانات خارجية", price: 750, oldPrice: 800, image: "/img/Product/produit1.webp", rating: 4.5, category: "دهانات ومواد التشطيب", description: "دهانات عالية الجودة ضد العوامل الجوية." },
    { id: 4, title: "حاويات بلاستيكية", price: 450, oldPrice: 500, image: "/img/Product/produit5.jpg", tag: "خصم 10%", rating: 4.6, category: "حاويات وتخزين", description: "حاويات متعددة الاستخدامات لتخزين المنتجات." },
    { id: 5, title: "مبردات هواء", price: 1200, image: "/img/Product/produit7.jpg", rating: 4.1, category: "أجهزة التبريد والتكييف", description: "مبردات هواء فعالة للطاقة ومناسبة للمكاتب." },
    
    { id: 6, title: "إطارات سيارات", price: 1600, image: "/img/Product/produit1.webp", tag: "متوفر", rating: 4.3, category: "إطارات وقطع غيار سيارات", description: "إطارات متينة وعالية الأداء لجميع السيارات." },
    { id: 7, title: "فولاذ مجلفن", price: 1200, image: "/img/Product/produit1.webp", tag: "متوفر", rating: 4.8, category: "مواد البناء", description: "فولاذ عالي الجودة للمشاريع الصناعية." },
    { id: 8, title: "أخشاب معالجة", price: 900, image: "/img/Product/produit1.webp", rating: 4.5, category: "مواد البناء", description: "خشب متين ومقاوم للرطوبة للأثاث والبناء." },
    { id: 9, title: "زيت نباتي خام", price: 600, oldPrice: 650, image: "/img/Product/produit1.webp", tag: "خصم 8%", rating: 4.3, category: "منتجات غذائية", description: "زيت نباتي عالي النقاء للاستخدام الغذائي." },
    { id: 10, title: "آلات تعبئة وتغليف", price: 3500, image: "/img/Product/produit1.webp", rating: 4.7, category: "آلات التغليف والتعبئة", description: "معدات حديثة لتغليف المنتجات بكفاءة." },
    
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
  
  */  ];
  
  