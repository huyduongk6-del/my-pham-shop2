// Mock Data for Beauty Luxe - K-Style Premium Beauty
// 100% Chanel Focused Edition

export const navigationLinks = [
  { name: "홈", path: "/" },
  { name: "샤넬 향수", path: "/perfume" },
  { name: "샤넬 메이크업", path: "/makeup" },
  { name: "샤넬 스킨케어", path: "/skincare" },
  { name: "기프트 세트", path: "/gift-set" },
  { name: "베스트셀러", path: "/best-seller" },
  { name: "세일", path: "/sale" },
  { name: "고객문의", path: "/contact" },
];

export const serviceCommitments = [
  {
    id: 1,
    title: "100% 정품 보장",
    description: "샤넬 공식 수입 및 100% 정품 보장",
    iconName: "ShieldCheck",
  },
  {
    id: 2,
    title: "전 지역 무료 배송",
    description: "모든 주문 대상 고품격 안전 무료 배송",
    iconName: "Truck",
  },
  {
    id: 3,
    title: "간편한 교환/반품",
    description: "수령 후 7일 이내 편리하고 신속한 접수",
    iconName: "RotateCcw",
  },
  {
    id: 4,
    title: "안전 결제 시스템",
    description: "보안 인증 완료, 완벽한 개인정보 보호",
    iconName: "CreditCard",
  },
  {
    id: 5,
    title: "프레스티지 상담",
    description: "샤넬 전문 어드바이저의 1:1 맞춤형 케어",
    iconName: "Headphones",
  },
];

export const categories = [
  { id: 1, name: "Chanel Perfume", image: "/images/categories/chanel-perfume.png" },
  { id: 2, name: "Chanel Lip", image: "/images/categories/chanel-lipstick.png" },
  { id: 3, name: "Chanel Foundation", image: "/images/categories/chanel-foundation.png" },
  { id: 4, name: "Chanel Powder", image: "/images/categories/chanel-powder.png" },
  { id: 5, name: "Chanel Serum", image: "/images/categories/chanel-serum.png" },
  { id: 6, name: "Chanel Cream", image: "/images/categories/chanel-cream.png" },
  { id: 7, name: "Chanel Cleanser", image: "/images/categories/chanel-cleanser.png" },
  { id: 8, name: "Chanel Gift", image: "/images/categories/chanel-gift.png" },
];

const defaultReviewList = [
  {
    id: 1,
    name: "김지우",
    date: "2026.05.12",
    rating: 5,
    option: "기본",
    content: "향과 텍스처 모두 고급스럽고 기대 이상입니다. 역시 샤넬이라는 생각이 드는 최고의 경험이었습니다.",
    tags: ["고급스러워요", "샤넬은진리"]
  },
  {
    id: 2,
    name: "이하은",
    date: "2026.05.08",
    rating: 5,
    option: "기본",
    content: "배송도 꼼꼼하게 도착했고 패키지가 정성스럽네요. 매일매일 사용할 때마다 만족스럽습니다.",
    tags: ["패키지대박", "소장가치"]
  },
  {
    id: 3,
    name: "박서윤",
    date: "2026.05.01",
    rating: 5,
    option: "기본",
    content: "샤넬 특유의 우아한 아우라가 확실히 느껴집니다. 가격대가 아깝지 않은 프리미엄 선물입니다.",
    tags: ["재구매의사", "품격있어요"]
  }
];

// ==================== 1. FRAGRANCE (샤넬 향수) ====================
export const perfumeProducts = [
  {
    id: "chanel-perfume-1",
    brand: "CHANEL",
    name: "N°5 Eau de Parfum",
    koreanName: "샤넬 N°5 오 드 빠르펭",
    price: "₩193,000",
    image: "/images/chanel/chanel-1.png",
    category: "향수",
    subCategory: "Fragrance",
    rating: 5,
    reviews: 240,
    volume: "100ml",
    shortDescription: "시대를 초월한 고전적인 우아함, 샤넬의 아이코닉 전설의 향수.",
    description: "샤넬 N°5 오 드 빠르펭은 영원한 여성미를 상징하며, 화사한 플로럴 부케 향의 관능적인 터치로 완성된 프리미엄 향수입니다.",
    options: [
      { label: "35ml", price: "₩115,000" },
      { label: "50ml", price: "₩158,000" },
      { label: "100ml", price: "₩193,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "EDP", shipping: "무료 배송", exchange: "7일 이내" },
    benefits: ["우아하고 클래식한 잔향", "소장 가치가 뛰어난 아이코닉 보틀"],
    howToUse: ["맥박이 뛰는 귀 뒤쪽과 손목에 뿌립니다."],
    isBestSeller: true,
    salesCount: 1200,
    gallery: [
      "/images/chanel/chanel-1.png",
      "/images/chanel/chanel-1-2.png",
      "/images/chanel/chanel-1-3.png",
      "/images/chanel/chanel-1-4.png"
    ]
  },
  {
    id: "chanel-perfume-2",
    brand: "CHANEL",
    name: "Coco Mademoiselle Eau de Parfum",
    koreanName: "코코 마드모아젤 오 드 빠르펭",
    price: "₩210,000",
    image: "/images/chanel/chanel-2.png",
    category: "향수",
    subCategory: "Fragrance",
    rating: 5,
    reviews: 185,
    volume: "100ml",
    shortDescription: "생동감 넘치는 여성의 자유를 표현한 매혹적인 플로럴.",
    description: "상쾌한 시트러스 노트와 세련된 파출리 향이 어우러져 자유롭고 대담한 매력을 완성하는 스테디셀러 향수.",
    options: [
      { label: "35ml", price: "₩125,000" },
      { label: "50ml", price: "₩168,000" },
      { label: "100ml", price: "₩210,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "EDP", shipping: "무료 배송", exchange: "7일 이내" },
    benefits: ["모던하고 매혹적인 실루엣", "오래도록 남는 고혹적인 잔향"],
    howToUse: ["가슴 부위와 어깨선 주변에 가볍게 안개 분사합니다."],
    isBestSeller: true,
    salesCount: 1100,
    discountPercent: 15,
    originalPrice: "₩247,000",
    salePrice: "₩210,000",
    gallery: [
      "/images/chanel/chanel-2.png",
      "/images/chanel/chanel-2-2.png",
      "/images/chanel/chanel-2-3.png",
      "/images/chanel/chanel-2-4.png"
    ]
  },
  {
    id: "chanel-perfume-3",
    brand: "CHANEL",
    name: "Chance Eau Tendre",
    koreanName: "샹스 오 땅드르",
    price: "₩198,000",
    image: "/images/chanel/chanel-3.png",
    category: "향수",
    subCategory: "Fragrance",
    rating: 5,
    reviews: 160,
    volume: "100ml",
    shortDescription: "부드럽고 러블리한 감각의 은은한 프루티 플로럴 향.",
    description: "사랑스럽고 섬세한 프루티-플로럴 노트가 포근한 잔향을 남겨 남녀노소 모두에게 사랑받는 제품입니다.",
    options: [
      { label: "50ml", price: "₩159,000" },
      { label: "100ml", price: "₩198,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "EDT", shipping: "무료 배송", exchange: "7일 이내" },
    benefits: ["은은하면서도 밝고 경쾌한 아우라"],
    howToUse: ["공중에 스프레이 후 몸 전체를 통과하듯 사용."],
    salesCount: 800,
    gallery: [
      "/images/chanel/chanel-3.png",
      "/images/chanel/chanel-3-2.png",
      "/images/chanel/chanel-3-3.png"
    ]
  },
  {
    id: "chanel-perfume-4",
    brand: "CHANEL",
    name: "Bleu de Chanel Parfum",
    koreanName: "블루 드 샤넬 빠르펭",
    price: "₩220,000",
    image: "/images/chanel/chanel-4.png",
    category: "향수",
    subCategory: "Fragrance",
    rating: 5,
    reviews: 210,
    volume: "100ml",
    shortDescription: "현대적인 신사의 당당한 품격을 선사하는 묵직한 우디 아로마틱.",
    description: "따뜻하고 고급스러운 뉴칼레도니아 샌달우드 에센스가 풍부하게 번지는 남성용 프레스티지 라인.",
    options: [
      { label: "50ml", price: "₩165,000" },
      { label: "100ml", price: "₩220,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "Parfum", shipping: "무료 배송", exchange: "7일 이내" },
    benefits: ["샌달우드의 깊고 묵직한 잔향"],
    howToUse: ["맥박 점과 의류 안감 부위에 가볍게 도포."],
    isBestSeller: true,
    salesCount: 920,
    gallery: [
      "/images/chanel/chanel-4.png",
      "/images/chanel/chanel-4-2.png",
      "/images/chanel/chanel-4-3.png"
    ]
  }
];

// ==================== 2. MAKEUP (샤넬 메이크업) ====================
export const makeupProducts = [
  {
    id: "chanel-makeup-1",
    brand: "CHANEL",
    name: "Rouge Coco Bloom",
    koreanName: "루쥬 코코 블룸",
    price: "₩59,000",
    image: "/images/makeup/makeup-1.png",
    category: "메이크업",
    subCategory: "Lip",
    rating: 5,
    reviews: 140,
    volume: "3g",
    shortDescription: "선명한 발색과 눈부신 고광택 립스틱.",
    description: "오랜 시간 지속되는 강렬한 볼륨 래디언스와 입술 밀착 영양감을 주는 하이드레이팅 플럼핑 립스틱.",
    options: [
      { label: "118 Radiant", price: "₩59,000" },
      { label: "선물 포장 세트", price: "₩66,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "Lipstick", shipping: "무료 배송", exchange: "가능" },
    benefits: ["볼륨 오일 특허 성분", "초고발색 샤인 글로우"],
    howToUse: ["입술 라인을 따라 고르게 밀어주듯 바릅니다."],
    isBestSeller: true,
    salesCount: 950,
    gallery: [
      "/images/makeup/makeup-1.png",
      "/images/makeup/makeup-1-2.png",
      "/images/makeup/makeup-1-3.png",
      "/images/makeup/makeup-1-4.png"
    ]
  },
  {
    id: "chanel-makeup-2",
    brand: "CHANEL",
    name: "Rouge Allure Velvet",
    koreanName: "루쥬 알뤼르 벨벳",
    price: "₩61,000",
    image: "/images/makeup/makeup-2.png",
    category: "메이크업",
    subCategory: "Lip",
    rating: 5,
    reviews: 110,
    volume: "3.5g",
    shortDescription: "벨벳처럼 부드럽고 편안한 울트라-웨어 매트 립스틱.",
    description: "입술을 부드럽게 감싸는 세컨 스킨 포뮬러로 선명하게 밀착되어 건조함 없이 보송하게 마무리됩니다.",
    options: [{ label: "58 루쥬 뷔", price: "₩61,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["고농축 초미세 피그먼트", "호호바 오일 유도체의 부드러운 케어"],
    howToUse: ["입술 안쪽부터 가볍게 톡톡 바릅니다."],
    salesCount: 720,
    gallery: [
      "/images/makeup/makeup-2.png",
      "/images/makeup/makeup-2-2.png",
      "/images/makeup/makeup-2-3.png"
    ]
  },
  {
    id: "chanel-makeup-3",
    brand: "CHANEL",
    name: "Les Beiges Foundation",
    koreanName: "레 베쥬 헬시 글로우 파운데이션",
    price: "₩89,000",
    image: "/images/makeup/makeup-3.png",
    category: "메이크업",
    subCategory: "Foundation",
    rating: 5,
    reviews: 115,
    volume: "30ml",
    shortDescription: "자연스러운 안색을 돋보이게 해주는 촉촉한 수분 파운데이션.",
    description: "마치 내 원래 피부가 좋은 듯 투명하고 가벼우며, 맑고 깨끗한 헬시 글로우를 선사하는 제품.",
    options: [
      { label: "B10", price: "₩89,000" },
      { label: "B20", price: "₩89,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "Foundation", shipping: "무료 배송" },
    benefits: ["12시간 지속 광채", "답답함 없는 초경량 텍스처"],
    howToUse: ["흔든 뒤 브러시나 스펀지로 소량 레이어링합니다."],
    salesCount: 750,
    discountPercent: 10,
    originalPrice: "₩99,000",
    salePrice: "₩89,000",
    gallery: [
      "/images/makeup/makeup-3.png",
      "/images/makeup/makeup-3-2.png",
      "/images/makeup/makeup-3-3.png"
    ]
  },
  {
    id: "chanel-makeup-4",
    brand: "CHANEL",
    name: "Ultra Le Teint Foundation",
    koreanName: "울트라 르 떼엥 파운데이션",
    price: "₩93,000",
    image: "/images/makeup/makeup-4.png",
    category: "메이크업",
    subCategory: "Foundation",
    rating: 5,
    reviews: 95,
    volume: "30ml",
    shortDescription: "24시간 완벽 밀착, 무너짐 없는 결점 커버 플루이드.",
    description: "땀과 습기에도 강한 포뮬러가 하루 종일 다크닝 없이 벨벳처럼 매끄러운 피부 결을 유지합니다.",
    options: [{ label: "BD11", price: "₩93,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["롱웨어 울트라 컨트롤", "루미너스 매트 피니시"],
    howToUse: ["피부에 얇고 넓게 펴 바른 뒤 가볍게 두드립니다."],
    salesCount: 680,
    gallery: [
      "/images/makeup/makeup-4.png",
      "/images/chanel/chanel-7.png",
      "/images/chanel/chanel-8.png"
    ]
  },
  {
    id: "chanel-makeup-5",
    brand: "CHANEL",
    name: "Le Volume de Chanel Mascara",
    koreanName: "르 볼륨 드 샤넬 마스카라",
    price: "₩54,000",
    image: "/images/makeup/makeup-5.png",
    category: "메이크업",
    subCategory: "Eye",
    rating: 5,
    reviews: 88,
    volume: "6g",
    shortDescription: "즉각적인 볼륨과 렝스닝을 선사하는 시그니처 마스카라.",
    description: "스노우플레이크 브러시가 눈썹 한 올 한 올에 뭉침 없이 밀착되어 깊고 매혹적인 눈매를 연출합니다.",
    options: [{ label: "10 누와르", price: "₩54,000" }],
    reviewList: defaultReviewList,
    details: { origin: "이탈리아" },
    benefits: ["초강력 롱래스팅 볼륨 아카시아 검 주입"],
    howToUse: ["속눈썹 뿌리부터 지그재그 모션으로 빗어 올립니다."],
    salesCount: 510,
    gallery: [
      "/images/makeup/makeup-5.png",
      "/images/chanel/chanel-8.png",
      "/images/makeup/makeup-8.png"
    ]
  },
  {
    id: "chanel-makeup-6",
    brand: "CHANEL",
    name: "Les Beiges Healthy Glow Powder",
    koreanName: "레 베쥬 헬시 글로우 파우더",
    price: "₩88,000",
    image: "/images/makeup/makeup-6.png",
    category: "메이크업",
    subCategory: "Powder",
    rating: 5,
    reviews: 130,
    volume: "12g",
    shortDescription: "야외 활동 후 느껴지는 생기를 자연스럽게 불어넣는 루미너스 파우더.",
    description: "피부에 가볍고 맑게 번지며 번들거림은 잡고 은은한 빛만 남기는 투명 파우더 콤팩트.",
    options: [{ label: "No.10 내추럴", price: "₩88,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["자연광 효과 헬시 샤인", "내장 반달 브러시 무료 탑재"],
    howToUse: ["얼굴의 튀어나온 광대 및 이마 부위에 가볍게 쓸어 줍니다."],
    isBestSeller: true,
    salesCount: 890,
    gallery: [
      "/images/makeup/makeup-6.png",
      "/images/chanel/chanel-8.png",
      "/images/chanel/chanel-12.png"
    ]
  },
  {
    id: "chanel-makeup-7",
    brand: "CHANEL",
    name: "Baume Essentiel Multi-Use Glow Stick",
    koreanName: "바움 에쌍씨엘 멀티 글로우 스틱",
    price: "₩64,000",
    image: "/images/makeup/makeup-7.png",
    category: "메이크업",
    subCategory: "Powder",
    rating: 5,
    reviews: 76,
    volume: "8g",
    shortDescription: "피부 깊은 곳에서 우러나오는 듯한 촉촉한 진주빛 물광 스틱.",
    description: "광대, 콧등, 입술 등 원하는 부위에 터치해 맑고 우아한 하이라이팅 윤광을 불어넣는 스틱형 밤.",
    options: [{ label: "Sculpting (진주빛)", price: "₩64,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["번들거림 없는 자연 수분 레이어"],
    howToUse: ["스틱을 바로 대거나 손끝 체온으로 두드려 얹습니다."],
    salesCount: 430,
    gallery: [
      "/images/makeup/makeup-7.png",
      "/images/chanel/chanel-8.png",
      "/images/makeup/makeup-8.png"
    ]
  }
];

// ==================== 3. SKINCARE (샤넬 스킨케어) ====================
export const skincareProducts = [
  {
    id: "chanel-skincare-1",
    brand: "CHANEL",
    name: "Hydra Beauty Micro Sérum",
    koreanName: "이드라 뷰티 마이크로 세럼",
    price: "₩145,000",
    image: "/images/skincare/skincare-1.png",
    category: "스킨케어",
    subCategory: "Serum",
    rating: 5,
    reviews: 195,
    volume: "30ml",
    shortDescription: "수분 캡슐 에너지가 선사하는 마르지 않는 수분 광채.",
    description: "마이크로 버블이 피부 장벽 깊은 곳까지 강력하고 즉각적인 보습 에너지를 고농축 전달합니다.",
    options: [
      { label: "30ml", price: "₩145,000" },
      { label: "50ml", price: "₩198,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "Serum", shipping: "무료 배송" },
    benefits: ["24시간 고정 잠금 수분막", "맑게 빛나는 플럼핑 속탄력"],
    howToUse: ["세안 후 토너 다음 단계에서 전체적으로 발라줍니다."],
    isBestSeller: true,
    salesCount: 870,
    discountPercent: 10,
    originalPrice: "₩145,000",
    salePrice: "₩130,500",
    gallery: [
      "/images/skincare/skincare-1.png",
      "/images/skincare/skincare-1-2.png",
      "/images/skincare/skincare-1-3.png"
    ]
  },
  {
    id: "chanel-skincare-2",
    brand: "CHANEL",
    name: "Sublimage La Crème",
    koreanName: "수블리마지 라 크렘",
    price: "₩520,000",
    image: "/images/skincare/skincare-2.png",
    category: "스킨케어",
    subCategory: "Cream",
    rating: 5,
    reviews: 65,
    volume: "50ml",
    shortDescription: "샤넬 프레스티지 최상위 안티에이징 영양 크림.",
    description: "가장 고귀한 원료로 완성되어 피부 재생, 활력, 영양 보습을 한번에 케어하는 얼티밋 트리트먼트 크림입니다.",
    options: [
      { label: "50ml 본품", price: "₩520,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "Cream", shipping: "프리미엄 등기배송" },
    benefits: ["탁월한 자생 밀도 복원", "우아하고 풍부한 영양 윤광"],
    howToUse: ["동봉된 전용 스패츌라로 결 방향대로 리프팅 마사지하며 흡수."],
    isBestSeller: true,
    salesCount: 980,
    gallery: [
      "/images/skincare/skincare-2.png",
      "/images/chanel/chanel-9.png",
      "/images/skincare/skincare-6.png"
    ]
  },
  {
    id: "chanel-skincare-3",
    brand: "CHANEL",
    name: "La Mousse Cleanser",
    koreanName: "라 무쓰 클렌저",
    price: "₩68,000",
    image: "/images/skincare/skincare-3.png",
    category: "스킨케어",
    subCategory: "Cleanser",
    rating: 5,
    reviews: 80,
    volume: "150ml",
    shortDescription: "미세 노폐물까지 쫀쫀하게 닦아내 주는 저자극 폼 클렌저.",
    description: "크리미한 제형이 물과 만나 극세사 마이크로 거품으로 변하여 자극 없이 딥 클렌징을 돕습니다.",
    options: [
      { label: "150ml", price: "₩68,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", type: "Cleanser" },
    benefits: ["당김 없는 깔끔한 수분 세안", "해조 영양 추출물 포함"],
    howToUse: ["적당량을 손에 덜어 거품을 낸 후 부드럽게 롤링합니다."],
    salesCount: 550,
    discountPercent: 12,
    originalPrice: "₩68,000",
    salePrice: "₩59,840",
    gallery: [
      "/images/skincare/skincare-3.png",
      "/images/skincare/skincare-8.png",
      "/images/chanel/chanel-12.png"
    ]
  },
  {
    id: "chanel-skincare-4",
    brand: "CHANEL",
    name: "Hydra Beauty Camellia Water Cream",
    koreanName: "이드라 뷰티 까멜리아 워터 크림",
    price: "₩98,000",
    image: "/images/skincare/skincare-4.png",
    category: "스킨케어",
    subCategory: "Cream",
    rating: 5,
    reviews: 92,
    volume: "30ml",
    shortDescription: "촉촉함과 안색을 함께 밝혀주는 물광 메이크업 부스팅 크림.",
    description: "화이트 까멜리아 수분이 피부 갈증을 해소하고, 미세 펄 입자가 자연스러운 윤곽 광채를 더해줍니다.",
    options: [{ label: "30ml", price: "₩98,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["물처럼 터지는 극대화된 수분감", "프라이머 겸용 광채 효과"],
    howToUse: ["메이크업 시작 전 가볍게 흡수시켜 스킨 캔버스를 정돈합니다."],
    salesCount: 610,
    gallery: [
      "/images/skincare/skincare-4.png",
      "/images/chanel/chanel-10.png",
      "/images/chanel/chanel-11.png"
    ]
  },
  {
    id: "chanel-skincare-5",
    brand: "CHANEL",
    name: "Le Lift Sérum",
    koreanName: "르 리프트 세럼",
    price: "₩225,000",
    image: "/images/skincare/skincare-5.png",
    category: "스킨케어",
    subCategory: "Serum",
    rating: 5,
    reviews: 72,
    volume: "30ml",
    shortDescription: "천연 알팔파 농축물 성분으로 피부에 강력한 리프팅 에너지를 전달하는 탄력 세럼.",
    description: "주름을 완화하고 페이스 라인을 견고하고 탄탄하게 관리해 주는 고성능 안티에이징 집중 에센스.",
    options: [{ label: "30ml", price: "₩225,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["93% 천연 유래 유효 추출 포뮬러", "피부 밀도 및 텐션 재구축"],
    howToUse: ["턱 라인에서 관자놀이 방향으로 끌어 올리듯 마사지하며 도포."],
    salesCount: 450,
    gallery: [
      "/images/skincare/skincare-5.png",
      "/images/skincare/skincare-8.png",
      "/images/skincare/skincare-6.png"
    ]
  },
  {
    id: "chanel-skincare-6",
    brand: "CHANEL",
    name: "N°1 de Chanel Revitalizing Serum",
    koreanName: "N°1 de 샤넬 레드 까멜리아 세럼",
    price: "₩170,000",
    image: "/images/skincare/skincare-7.png",
    category: "스킨케어",
    subCategory: "Serum",
    rating: 5,
    reviews: 145,
    volume: "30ml",
    shortDescription: "피부 초기 노화 징후를 빈틈없이 케어하는 차세대 안티에이징 활력 세럼.",
    description: "레드 까멜리아 추출물이 피부 본연의 생명력을 일깨워 주름, 모공 케어 및 광채 회복을 전방위로 선사합니다.",
    options: [
      { label: "30ml", price: "₩170,000" },
      { label: "50ml", price: "₩230,000" }
    ],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["탄력, 모공, 수분 토탈 노화 정돈", "환경을 생각한 친환경 에코 패키지"],
    howToUse: ["아침 저녁 스킨 다음 단계에서 스포이드 1회 분량을 펴 바릅니다."],
    isBestSeller: true,
    salesCount: 910,
    gallery: [
      "/images/skincare/skincare-7.png",
      "/images/chanel/chanel-10.png",
      "/images/skincare/skincare-8.png"
    ]
  }
];

// ==================== 4. GIFT SET (샤넬 기프트) ====================
export const giftProducts = [
  {
    id: "chanel-gift-1",
    brand: "CHANEL",
    name: "Fragrance & Lip Gift Set",
    koreanName: "샤넬 프래그런스 & 립 시그니처 기프트 세트",
    price: "₩210,000",
    image: "/images/gifts/gift-1.png",
    category: "기프트",
    subCategory: "Gift Set",
    rating: 5,
    reviews: 142,
    shortDescription: "사랑받는 향수 미니어처와 시그니처 립스틱이 담긴 우아한 콤보.",
    description: "특별한 날을 위해 샤넬 로고 리본 패키지에 담은 프레스티지 넘버원 선물 상자.",
    options: [{ label: "시그니처 블랙 래핑", price: "₩210,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스", shipping: "리본 래핑 특급배송" },
    benefits: ["샤넬 쇼핑백 & 리본 포장 포함"],
    howToUse: ["선물 시 동봉된 스페셜 메시지 카드와 함께 전달."],
    isBestSeller: true,
    salesCount: 750,
    discountPercent: 5,
    originalPrice: "₩221,050",
    salePrice: "₩210,000",
    gallery: [
      "/images/gifts/gift-1.png",
      "/images/gifts/gift-1-2.png",
      "/images/gifts/gift-1-3.png"
    ]
  },
  {
    id: "chanel-gift-2",
    brand: "CHANEL",
    name: "Skincare Ritual Gift Set",
    koreanName: "이드라 뷰티 고보습 스킨케어 리추얼 세트",
    price: "₩280,000",
    image: "/images/gifts/gift-2.png",
    category: "기프트",
    subCategory: "Gift Set",
    rating: 5,
    reviews: 88,
    shortDescription: "수분 가득 피부 결을 채워 줄 고농축 세럼 & 워터크림 스페셜 키트.",
    description: "맑은 수분감을 극대화해 줄 라인 결합 세트로 소중한 분의 아름다운 아침 피부를 응원합니다.",
    options: [{ label: "VIP 화이트 기프트 케이스", price: "₩280,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["스킨케어 전용 화이트 트레이 박스 포장"],
    howToUse: ["라인 순서별 가이드라인을 참조해 적용."],
    salesCount: 520,
    gallery: [
      "/images/gifts/gift-2.png",
      "/images/gifts/gift-1.png",
      "/images/gifts/gift-4.png"
    ]
  },
  {
    id: "chanel-gift-3",
    brand: "CHANEL",
    name: "Daily Makeup Gift Set",
    koreanName: "샤넬 에센셜 데일리 메이크업 세트",
    price: "₩176,000",
    image: "/images/gifts/gift-3.png",
    category: "기프트",
    subCategory: "Gift Set",
    rating: 5,
    reviews: 96,
    shortDescription: "맑은 파우더와 화사한 립, 완벽한 데일리 메이크업을 위한 기프트 세트.",
    description: "파우더팩트와 루쥬 알뤼르 베스트 컬러의 하모니로 일상 속 샤넬 무드를 완성합니다.",
    options: [{ label: "클래식 블랙 골드 패키징", price: "₩176,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["메이크업 브러쉬 파우치 무료 증정"],
    howToUse: ["베이스 메이크업 후 포인트 수정 시 필수 지참."],
    salesCount: 480,
    gallery: [
      "/images/gifts/gift-3.png",
      "/images/gifts/gift-5.png",
      "/images/gifts/gift-6.png"
    ]
  },
  {
    id: "chanel-gift-4",
    brand: "CHANEL",
    name: "Premium Gift Box Set",
    koreanName: "샤넬 익스클루시브 프리미엄 기프트 박스 세트",
    price: "₩260,000",
    image: "/images/gifts/gift-4.png",
    category: "기프트",
    subCategory: "Gift Set",
    rating: 5,
    reviews: 75,
    shortDescription: "가장 빛나는 순간을 선사할, 샤넬 블랙 프레스티지 전용 박스.",
    description: "베스트 향수와 에센셜 메이크업을 한 번에 담아 정성의 온도를 높인 한정 기프트 에디션.",
    options: [{ label: "기본 프리미엄 리본 세트", price: "₩260,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["리미티드 전용 블랙 리본 박스 패키지 무료 적용"],
    howToUse: ["전용 패키징 박스를 개봉하여 우아하게 사용."],
    isBestSeller: true,
    salesCount: 640,
    gallery: [
      "/images/gifts/gift-4.png",
      "/images/gifts/gift-2.png",
      "/images/gifts/gift-6.png"
    ]
  },
  {
    id: "chanel-gift-5",
    brand: "CHANEL",
    name: "Coco Mademoiselle Gift Set",
    koreanName: "코코 마드모아젤 오 드 빠르펭 기프트 세트",
    price: "₩235,000",
    image: "/images/gifts/gift-5.png",
    category: "기프트",
    subCategory: "Gift Set",
    rating: 5,
    reviews: 110,
    shortDescription: "대담하고 관능적인 여성을 위한 매혹의 향수 & 바디 듀오 세트.",
    description: "코코 마드모아젤 향수와 동 라인의 바디 로션이 결합되어 더욱 짙고 풍부한 살향의 잔향을 완성해 줍니다.",
    options: [{ label: "코코 로맨틱 핑크 패킹", price: "₩235,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["고급스러운 핑크 라벨 전용 백 증정"],
    howToUse: ["바디 제품 도포 후 향수를 얹으면 지속력이 배가됩니다."],
    salesCount: 690,
    gallery: [
      "/images/gifts/gift-5.png",
      "/images/gifts/gift-1.png",
      "/images/gifts/gift-3.png"
    ]
  },
  {
    id: "chanel-gift-6",
    brand: "CHANEL",
    name: "Luxury Mini Beauty Set",
    koreanName: "샤넬 럭셔리 미니 뷰티 세트",
    price: "₩180,000",
    image: "/images/gifts/gift-6.png",
    category: "기프트",
    subCategory: "Gift Set",
    rating: 5,
    reviews: 155,
    shortDescription: "샤넬의 주요 베스트셀러를 컴팩트하게 담아낸 미니멀 럭셔리 세트.",
    description: "언제 어디서든 휴대하며 샤넬의 우아한 아우라를 꺼내 볼 수 있는 VIP 트래블 컬렉션 포맷.",
    options: [{ label: "기프트 전용 파우치 세트", price: "₩180,000" }],
    reviewList: defaultReviewList,
    details: { origin: "프랑스" },
    benefits: ["트래블 프리미엄 가죽 파우치 포함"],
    howToUse: ["클러치 및 핸드백에 넣고 간편하게 터치업."],
    salesCount: 820,
    discountPercent: 15,
    originalPrice: "₩211,760",
    salePrice: "₩180,000",
    gallery: [
      "/images/gifts/gift-6.png",
      "/images/gifts/gift-2.png",
      "/images/gifts/gift-4.png"
    ]
  }
];

// ==================== CONSOLIDATE & MAP ====================

export const chanelCollection = [
  ...perfumeProducts,
  ...makeupProducts,
  ...skincareProducts,
  ...giftProducts
];

// Standard exports
export const allProducts = chanelCollection;

export const saleProducts = allProducts.filter(p => p.discountPercent > 0);

export const bestSellerProducts = [...allProducts]
  .sort((a, b) => b.salesCount - a.salesCount)
  .slice(0, 10)
  .map((p, index) => ({
    ...p,
    rank: index + 1,
    badge: index < 3 ? "BEST" : index < 6 ? "HOT" : "PICK"
  }));

export const bestSellers = allProducts
  .filter(p => p.isBestSeller)
  .slice(0, 6)
  .map((p, idx) => ({ ...p, isFavorite: idx % 2 === 0 }));

export const promoBanners = [
  {
    id: 1,
    title: "MEMBER BENEFIT",
    headline: "샤넬 뷰티 멤버십 가입 시 첫 주문 15% 특별 혜택",
    cta: "멤버십 상세 보기",
    image: "/images/promos/promo-1.png",
  },
  {
    id: 2,
    title: "SIGNATURE COLLECTION",
    headline: "시대를 초월한 클래식, 샤넬 전설의 아이템들",
    cta: "컬렉션 탐색",
    image: "/images/promos/promo-2.png",
  },
  {
    id: 3,
    title: "PRESTIGE WRAPPING",
    headline: "전 주문 고객 대상 오리지널 시그니처 선물 포장",
    cta: "포장 서비스 보기",
    image: "/images/promos/promo-3.png",
  },
];

export const footerCommitments = [
  { text: "100% 정품 보장", subtext: "샤넬 공식 수입 및 품질 책임제 보증", icon: "ShieldCheck" },
  { text: "전 지역 무료 배송", subtext: "수량 무관 특급 안전 택배 배송", icon: "Truck" },
  { text: "프레스티지 선물 래핑", subtext: "시그니처 박스 포장으로 품격 선물", icon: "Heart" },
];

export const heroSlides = [
  {
    id: 1,
    subtitle: "Premium Chanel Beauty",
    title: "PARISIAN ELEGANCE, KOREAN MOOD",
    description: "샤넬의 우아한 뷰티 컬렉션을 프리미엄 무드로 만나보세요.",
    buttonText: "지금 보기",
    image: "/images/hero/hero-1.png"
  },
  {
    id: 2,
    subtitle: "Fragrance Collection",
    title: "CHANEL PERFUME EDIT",
    description: "샤넬의 아이코닉한 향수 컬렉션을 만나보세요.",
    buttonText: "향수 보기",
    image: "/images/hero/hero-2.png"
  },
  {
    id: 3,
    subtitle: "Gift For Her",
    title: "LUXURY CHANEL GIFT SET",
    description: "소중한 사람을 위한 샤넬 기프트 셀렉션.",
    buttonText: "기프트 보기",
    image: "/images/hero/hero-3.png"
  },
  {
    id: 4,
    subtitle: "Makeup Essential",
    title: "CHANEL MAKEUP PICKS",
    description: "립, 파운데이션, 마스카라로 완성하는 우아한 메이크업.",
    buttonText: "메이크업 보기",
    image: "/images/hero/hero-4.png"
  },
  {
    id: 5,
    subtitle: "Skincare Ritual",
    title: "CHANEL SKINCARE ROUTINE",
    description: "세럼, 크림, 클렌저로 완성하는 샤넬 스킨케어.",
    buttonText: "스킨케어 보기",
    image: "/images/hero/hero-5.png"
  }
];
