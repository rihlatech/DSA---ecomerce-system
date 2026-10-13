export const COLLECTIONS = [
  { slug: 'objects', name: 'Objects', blurb: 'Vessels, tools, and quiet totems for the everyday.' },
  { slug: 'apparel', name: 'Apparel', blurb: 'Durable garments cut for a long life.' },
  { slug: 'lighting', name: 'Lighting', blurb: 'Soft sources of light, cast in honest materials.' },
]

export const PRODUCTS = [
  {
    id: '01',
    slug: 'calder-vessel',
    name: 'Calder Vessel',
    category: 'Objects',
    collection: 'objects',
    price: 184,
    compareAt: null,
    blurb: 'Hand-thrown stoneware, glazed in a single warm signal tone.',
    image: '/products/01.svg',
    alt: 'A tall stoneware vessel on a warm studio background',
    tags: ['ceramic', 'handcrafted'],
  },
  {
    id: '02',
    slug: 'isla-drape-coat',
    name: 'Isla Drape Coat',
    category: 'Apparel',
    collection: 'apparel',
    price: 390,
    compareAt: 460,
    blurb: 'Single-pleat wool coat that settles into a tailored drape.',
    image: '/products/02.svg',
    alt: 'A draped charcoal wool coat suspended on a warm background',
    tags: ['outerwear', 'wool'],
  },
  {
    id: '03',
    slug: 'meridian-light',
    name: 'Meridian Light',
    category: 'Lighting',
    collection: 'lighting',
    price: 240,
    compareAt: null,
    blurb: 'Machined aluminium ring lamp with a dimmable warm core.',
    image: '/products/03.svg',
    alt: 'A machined aluminium ring lamp against a warm canvas',
    tags: ['lamp', 'aluminium'],
  },
  {
    id: '04',
    slug: 'terrain-tote',
    name: 'Terrain Tote',
    category: 'Objects',
    collection: 'objects',
    price: 96,
    compareAt: null,
    blurb: 'Waxed canvas holdall reinforced for the daily commute.',
    image: '/products/04.svg',
    alt: 'A structured waxed canvas tote on a warm background',
    tags: ['bag', 'canvas'],
  },
  {
    id: '05',
    slug: 'halo-collar-shirt',
    name: 'Halo Collar Shirt',
    category: 'Apparel',
    collection: 'apparel',
    price: 148,
    compareAt: null,
    blurb: 'Garment-dyed twill shirt with a softly rolled collar.',
    image: '/products/05.svg',
    alt: 'A garment-dyed twill shirt shown in editorial light',
    tags: ['shirt', 'twill'],
  },
  {
    id: '06',
    slug: 'ember-era-vase',
    name: 'Ember Era Vase',
    category: 'Objects',
    collection: 'objects',
    price: 132,
    compareAt: 168,
    blurb: 'Low-fired ceramic vase with a heat-bloomed surface.',
    image: '/products/06.svg',
    alt: 'A low-fired ceramic vase with a warm glaze surface',
    tags: ['ceramic', 'decor'],
  },
  {
    id: '07',
    slug: 'slate-shore-jacket',
    name: 'Slate Shore Jacket',
    category: 'Apparel',
    collection: 'apparel',
    price: 320,
    compareAt: null,
    blurb: 'Water-resistant shell with a matte, near-silent finish.',
    image: '/products/07.svg',
    alt: 'A matte water-resistant shell jacket on a warm background',
    tags: ['outerwear', 'shell'],
  },
  {
    id: '08',
    slug: 'nook-desk-lamp',
    name: 'Nook Desk Lamp',
    category: 'Lighting',
    collection: 'lighting',
    price: 175,
    compareAt: null,
    blurb: 'Over-engineered lamp arm with a focused reading beam.',
    image: '/products/08.svg',
    alt: 'A focused desk lamp with a fully articulated arm',
    tags: ['lamp', 'desk'],
  },
  {
    id: '09',
    slug: 'brine-carafe',
    name: 'Brine Carafe',
    category: 'Objects',
    collection: 'objects',
    price: 88,
    compareAt: null,
    blurb: 'Thin-blown glass carafe with a ground, weighted stopper.',
    image: '/products/09.svg',
    alt: 'A thin-blown glass carafe against a variegated background',
    tags: ['glass', 'tabletop'],
  },
  {
    id: '10',
    slug: 'woven-hour-basket',
    name: 'Woven Hour Basket',
    category: 'Objects',
    collection: 'objects',
    price: 124,
    compareAt: null,
    blurb: 'Fired raffia basket that holds its hourglass silhouette.',
    image: '/products/10.svg',
    alt: 'A raffia basket with an hourglass silhouette',
    tags: ['woven', 'storage'],
  },
  {
    id: '11',
    slug: 'flax-line-trousers',
    name: 'Flax Line Trousers',
    category: 'Apparel',
    collection: 'apparel',
    price: 210,
    compareAt: 260,
    blurb: 'Heavy flax trousers with a pressed crease that holds.',
    image: '/products/11.svg',
    alt: 'Heavy flax trousers shown in natural light',
    tags: ['trousers', 'flax'],
  },
  {
    id: '12',
    slug: 'sundial-cluster',
    name: 'Sundial Cluster',
    category: 'Lighting',
    collection: 'lighting',
    price: 310,
    compareAt: null,
    blurb: 'A hanging cluster of three shaded spheres on one drop.',
    image: '/products/12.svg',
    alt: 'A hanging cluster of three shaded spheres',
    tags: ['pendant', 'cluster'],
  },
]

export const SHOP = {
  name: 'DSA Atelier',
  currency: 'USD',
}

export function getAllCollections() {
  return COLLECTIONS
}

export function getAllProducts() {
  return PRODUCTS
}

export function getProductBySlug(slug) {
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return undefined
  const base = product.image.replace(/\.svg$/, '')
  return {
    ...product,
    images: [`${base}.svg`, `${base}-b.svg`, `${base}-c.svg`],
  }
}

export function getProductsByCollection(slug) {
  return PRODUCTS.filter((p) => p.collection === slug)
}

export function getFeaturedProducts(count = 4) {
  return PRODUCTS.slice(0, count)
}