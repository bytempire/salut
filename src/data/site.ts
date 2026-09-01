export const SITE_URL = 'https://salut62.ru'

export function img(path: string) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${SITE_URL}/${clean}`
}

export const CATEGORIES = [
  {
    name: 'Свадебная коллекция',
    path: '61_69',
    count: 34,
    image: 'catalog/view/theme/salut/image/img1.jpg',
    color: 'from-pink-500/30 to-rose-500/10',
  },
  {
    name: 'Спецпредложения',
    path: '61_70',
    count: 9,
    image: 'catalog/view/theme/salut/image/img2.jpg',
    color: 'from-red-500/30 to-orange-500/10',
  },
  {
    name: 'Салюты мелкие',
    path: '61_59',
    count: 18,
    image: 'catalog/view/theme/salut/image/img-salut-melkii.png',
    color: 'from-yellow-500/30 to-amber-500/10',
  },
  {
    name: 'Салюты средние',
    path: '61_62',
    count: 24,
    image: 'catalog/view/theme/salut/image/img-salut-srednii.png',
    color: 'from-orange-500/30 to-red-500/10',
  },
  {
    name: 'Салюты большие',
    path: '61_63',
    count: 14,
    image: 'catalog/view/theme/salut/image/img-salut_big.png',
    color: 'from-purple-500/30 to-pink-500/10',
  },
  {
    name: 'Римские свечи',
    path: '61_64',
    count: 5,
    image: 'catalog/view/theme/salut/image/img-rimskie_svechi.png',
    color: 'from-blue-500/30 to-cyan-500/10',
  },
  {
    name: 'Супер салюты',
    path: '61_65',
    count: 10,
    image: 'catalog/view/theme/salut/image/img-salut-super.png',
    color: 'from-red-500/30 to-yellow-500/10',
  },
  {
    name: 'Хлопушки, бенгалы',
    path: '61_66',
    count: 15,
    image: 'catalog/view/theme/salut/image/img-bengaly.png',
    color: 'from-green-500/30 to-emerald-500/10',
  },
  {
    name: 'Петарды',
    path: '61_67',
    count: 6,
    image: 'catalog/view/theme/salut/image/img-petardy.png',
    color: 'from-slate-500/30 to-gray-500/10',
  },
  {
    name: 'Фонтаны, колеса',
    path: '61_68',
    count: 5,
    image: 'catalog/view/theme/salut/image/img-fontany.png',
    color: 'from-teal-500/30 to-cyan-500/10',
  },
  {
    name: 'Дымы и файеры',
    path: '61_71',
    count: 16,
    image: 'catalog/view/theme/salut/image/img-dymy.png',
    color: 'from-indigo-500/30 to-purple-500/10',
  },
] as const

export const PROMO_SLIDES = [
  {
    title: 'Свадебная коллекция',
    subtitle: 'Для организации и проведения свадебного торжества',
    image: 'catalog/view/theme/salut/image/bg-promo5.jpg',
    link: '61_69',
  },
  {
    title: 'Специальные предложения',
    subtitle: 'Акции и скидки в ограниченном количестве',
    image: 'catalog/view/theme/salut/image/bg-promo66.jpg',
    link: '61_70',
  },
  {
    title: 'Скидки до −50%',
    subtitle: 'При заказе от 5000 ₽ — бесплатная доставка по Рязанскому району',
    image: 'catalog/view/theme/salut/image/bg4.jpg',
    link: null,
  },
  {
    title: 'Оптовая продажа',
    subtitle: 'Салюты и фейерверки в любом количестве для праздников любой сложности',
    image: 'catalog/view/theme/salut/image/bg3.jpg',
    link: '61_63',
  },
]

export const PARTNERS = [
  { name: 'Парк-отель Фестиваль', logo: 'catalog/view/theme/salut/image/festival.png' },
  { name: 'Виктори Холл', logo: 'catalog/view/theme/salut/image/banket-kholl-victory-ruazan.png' },
  { name: 'В некотором царстве', logo: 'catalog/view/theme/salut/image/tsarstvo.png' },
  { name: 'Зеленый Сад', logo: 'catalog/view/theme/salut/image/img-partner1.png' },
  { name: 'Олимпиада Сочи 2014', logo: 'catalog/view/theme/salut/image/sochi2014.png' },
  { name: 'М5 Молл', logo: 'catalog/view/theme/salut/image/img-partner2.png' },
  { name: 'Единство', logo: 'catalog/view/theme/salut/image/edinstvo.png' },
  { name: 'Администрация г. Рязань', logo: 'catalog/view/theme/salut/image/administration.png' },
  { name: 'Администрация г. Сасово', logo: 'catalog/view/theme/salut/image/sasovo.png' },
  { name: 'Барс', logo: 'catalog/view/theme/salut/image/bars.jpg' },
  { name: 'Ниссан Рязань', logo: 'catalog/view/theme/salut/image/nissan.png' },
  { name: 'Администрация г. Луховицы', logo: 'catalog/view/theme/salut/image/luchovichi.png' },
  { name: 'Технониколь', logo: 'catalog/view/theme/salut/image/technonicol.png' },
  { name: 'ТРЦ Окская Жемчужина', logo: 'catalog/view/theme/salut/image/zhemchuzhina.png' },
]

export const TEAM = [
  {
    name: 'Молостов Сергей Викторович',
    role: 'Старший пиротехник',
    phone: '+7 (910) 575-00-30',
    photo: 'catalog/view/theme/salut/image/Molostov.jpg',
    bio: 'Опыт работы более 10 лет. Специализация — подготовка смесей и составов для красивых эффектов с соблюдением всех мер безопасности.',
  },
  {
    name: 'Маркин Алексей Викторович',
    role: 'Директор',
    phone: 'Уточняется',
    photo: 'catalog/view/theme/salut/image/Markin.jpg',
    bio: 'Опыт в сфере продаж и организации салютов более 10 лет. Сертификат на проведение салютов повышенного класса опасности (2016).',
  },
  {
    name: 'Тимофеев Антон Александрович',
    role: 'Заместитель директора',
    phone: 'Уточняется',
    photo: 'catalog/view/theme/salut/image/Timofeev.jpg',
    bio: 'Опыт организации салютов более 10 лет, особенно с изделиями повышенных классов опасности.',
  },
  {
    name: 'Андреев Михаил Юрьевич',
    role: 'Руководитель отдела логистики',
    phone: 'Уточняется',
    photo: 'catalog/view/theme/salut/image/Andreev.jpg',
    bio: 'Чётко и оперативно работающий отдел логистики. Опыт более 10 лет в ответственной сфере компании.',
  },
]
