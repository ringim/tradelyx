import FastImage from 'react-native-fast-image';

const register_options = [
  {
    id: 0,
    label: 'Buyer',
  },
  {
    id: 1,
    label: 'Seller',
  },
];

const service = [
  {
    id: `0`,
    label: 'Request for Quotation',
    text: 'Standard & Advanced',
    icon: require('../assets/images/quotation.png'),
  },
  {
    id: `1`,
    label: 'Request for Freight',
    text: 'Air, Ocean, & Land',
    icon: require('../assets/images/freight.png'),
  },
];

const signUp = [
  {
    id: 0,
    label: 'Individual',
  },
  {
    id: 1,
    label: 'Business',
  },
];

const sourceLocation = [
  {
    id: `0`,
    label: 'Domestic',
  },
  {
    id: `1`,
    label: 'International',
  },
];

const freight = [
  {
    id: 0,
    type: 'Air',
  },
  {
    id: 1,
    type: 'Ocean',
  },
  {
    id: 2,
    type: 'Land',
  },
];

const freight_service = [
  {
    id: `0`,
    label: 'Air Freight',
    icon: require('../assets/images/air.png'),
  },
  {
    id: `1`,
    label: 'Ocean Freight',
    icon: require('../assets/images/water.png'),
  },
  {
    id: `2`,
    label: 'Land Freight',
    icon: require('../assets/images/land.png'),
  },
];

const quote_service = [
  {
    id: `0`,
    label: 'Standard RFQ',
    text: 'Request for Price Quotation from Suppliers',
    icon: require('../assets/images/standard.png'),
  },
  {
    id: `1`,
    label: 'Advance RFQ',
    text: 'Domestic & International',
    icon: require('../assets/images/advance.png'),
  },
];

const advance_rfq = [
  {
    id: `0`,
    label: 'Domestic',
    text: 'Only serving domestic delivery',
    icon: require('../assets/images/domestic.png'),
  },
  {
    id: `2`,
    label: 'International',
    text: 'Serving international delivery',
    icon: require('../assets/images/international.png'),
  },
];

const identification = [
  {id: 0, type: 'National ID Card'},
  {id: 1, type: 'Driver License'},
  {id: 2, type: 'International Passport'},
  {id: 3, type: 'Permanent Voters Card'},
];

const handling = [
  {
    id: 1,
    label: 'Stackable',
    image: require('../assets/icons/mirrorFront.png'),
  },
  {
    id: 2,
    label: 'Non-Stackable',
    image: require('../assets/icons/noMirror.png'),
  },
];

const buyFrequency = [
  {
    id: 1,
    type: 'Once',
  },
  {
    id: 2,
    type: 'Daily',
  },
  {
    id: 3,
    type: 'Bi-Weekly',
  },
  {
    id: 4,
    type: 'Weekly',
  },
  {
    id: 5,
    type: 'Monthly',
  },
  {
    id: 5,
    type: 'Quarterly',
  },
];

const packageType = [
  {
    id: 1,
    type: 'Bag',
    icon: () => (
      <FastImage
        source={require('../assets/icons/bag.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
    ),
  },
  {
    id: 2,
    type: 'Box',
    icon: () => (
      <FastImage
        source={require('../assets/icons/box.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
    ),
  },
  {
    id: 3,
    type: 'Crate',
    icon: () => (
      <FastImage
        source={require('../assets/icons/crate.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
    ),
  },
  {
    id: 4,
    type: 'Barrel',
    icon: () => (
      <FastImage
        source={require('../assets/icons/barrel.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
    ),
  },
  {
    id: 5,
    type: 'Pallet',
    icon: () => (
      <FastImage
        source={require('../assets/icons/pallet.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
    ),
  },
  {
    id: 6,
    type: 'Container',
    icon: () => (
      <FastImage
        source={require('../assets/icons/container.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
    ),
  },
];

const containerType = [
  {
    id: 1,
    type: 'Standard (Dry)',
  },
  {
    id: 2,
    type: 'Registered (Reefer)',
  },
  {
    id: 3,
    type: 'Flat Back',
  },
  {
    id: 4,
    type: 'ISO Tank',
  },
  {
    id: 5,
    type: 'Open Side',
  },
  {
    id: 6,
    type: 'Open Top',
  },
];

const incoterms = [
  {
    id: 1,
    type: 'Standard (Dry)',
  },
  {
    id: 2,
    type: 'Registered (Reefer)',
  },
  {
    id: 3,
    type: 'Flat Back',
  },
];

const categories = [
  {
    id: `0`,
    label: 'Buyer',
    type: 'BUYER',
    desc: 'Request for Services',
    icon: require('../assets/icons/buy.png'),
  },
  {
    id: `1`,
    label: 'Seller',
    type: 'SELLER',
    desc: 'Provide Product & Services',
    icon: require('../assets/icons/sell.png'),
  },
];

const incoterms2 = [
  {
    id: 1,
    type: 'EXW - Ex Works ',
  },
  {
    id: 2,
    type: 'FCA - Free Carrier',
  },
  {
    id: 3,
    type: 'CPT - Carriage Paid To',
  },
  {
    id: 4,
    type: 'CIP - Carriage and Insurance Paid To',
  },
  {
    id: 5,
    type: 'DAP - Delivered at Place',
  },
  {
    id: 6,
    type: 'DPU - Delivered at Place Unloaded',
  },
  {
    id: 7,
    type: 'DDP - Delivered Duty Paid',
  },
  {
    id: 8,
    type: 'FAS - Free Alongside Ship',
  },
  {
    id: 9,
    type: 'CIP - Carriage and Insurance Paid To (CIP)',
  },
  {
    id: 10,
    type: 'FOB - Free on Board',
  },
  {
    id: 11,
    type: 'CFR - Cost and Freight',
  },
  {
    id: 12,
    type: 'CIF - Cost, Insurance and Freight',
  },
];

const paymentType = [
  {
    id: 1,
    type: 'Letter of Credit',
  },
  {
    id: 2,
    type: 'Advance Payment',
  },
  {
    id: 3,
    type: 'Consignment',
  },
  {
    id: 4,
    type: 'Documentary Collections',
  },
];

const paymentType2 = [
  {
    id: 3,
    type: 'Full Payment',
  },
  {
    id: 2,
    type: 'Advance Payment',
  },
];

const paymentMethod = [
  {
    id: 1,
    type: 'E-Naira',
  },
  {
    id: 2,
    type: 'Bank Transfer',
  },
  {
    id: 3,
    type: 'Wallet',
  },
  {
    id: 4,
    type: 'PayStack',
  },
  {
    id: 3,
    type: 'Flutterwave',
  },
];

const paymentMethod2 = [
  {
    id: 1,
    type: 'Escrow',
  },
];

const sellerService = [
  {
    id: `0`,
    label: 'Post Sell Offer',
    text: 'Post offers to buyers',
    icon: require('../assets/images/Buy.png'),
  },
  {
    id: `1`,
    label: 'Post Products',
    text: 'Add products to store',
    icon: require('../assets/images/StoreProducts.png'),
  },
];

const filterUnit = [
  {
    id: 1,
    type: 'Kilograms (kg)',
  },
  {
    id: 2,
    type: 'Grams (g)',
  },
  {
    id: 3,
    type: 'Metric Tonnes (MT)',
  },
  {
    id: 4,
    type: 'Tonnes (T)',
  },
  {
    id: 5,
    type: 'Pounds (lb)',
  },
  {
    id: 6,
    type: 'Ounces (oz)',
  },
  {
    id: 7,
    type: 'Bushels (bu)',
  },
  {
    id: 8,
    type: 'Bags (bg)',
  },
  {
    id: 9,
    type: 'Dozen (dz)',
  },
  {
    id: 10,
    type: 'Crates (cr)',
  },
  {
    id: 11,
    type: 'Pallets (plt)',
  },
  {
    id: 12,
    type: 'Truckloads',
  },
  {
    id: 11,
    type: 'Containers (20ft, 40ft)',
  },
];

const weight = [
  {
    id: 1,
    type: 'Standard (Dry)',
  },
  {
    id: 2,
    type: 'Resinated (Reefer)',
  },
  {
    id: 3,
    type: 'Open Top',
  },
  {
    id: 4,
    type: 'Flat Back',
  },
  {
    id: 5,
    type: 'Open Side',
  },
  {
    id: 6,
    type: 'ISO Tank',
  },
];

const contDetails = [
  {
    id: 1,
    label: 'FCL',
  },
  {
    id: 2,
    label: 'LCL',
  },
];

const allCategories = [
  {
    id: '1',
    title: 'Plants',
    desc: 'Live Trees, Flowers & Plants',
    image: require('../assets/images/plant.png'),
  },
  {
    id: '2',
    title: 'Veggies',
    desc: 'Vegetable Products',
    image: require('../assets/images/veggies.png'),
  },
  {
    id: '3',
    title: 'Food',
    desc: 'Prepared Foodstuffs',
    image: require('../assets/icons/food.png'),
  },
  {
    id: '4',
    title: 'Oil',
    desc: 'Oils and Extracts',
    image: require('../assets/images/Oil.png'),
  },
  {
    id: '5',
    title: 'Seeds',
    desc: 'Seeds & Plant Seeds',
    image: require('../assets/images/seeds.png'),
  },

  {
    id: '6',
    title: 'Wood',
    desc: 'Wood and Wood Products',
    image: require('../assets/images/woods.png'),
  },
  {
    id: '7',
    title: 'Beans',
    desc: 'Beans',
    image: require('../assets/images/bean.png'),
  },
  {
    id: '8',
    title: 'Nuts',
    desc: 'Nuts and Kernels',
    image: require('../assets/images/nuts.png'),
  },
  {
    id: '9',
    title: 'Dairy',
    desc: 'Animal and Animal Products',
    image: require('../assets/images/dairy.png'),
  },
  {
    id: '10',
    title: 'Fruits',
    desc: 'Fruits',
    image: require('../assets/images/fruits.png'),
  },
  {
    id: '11',
    title: 'Chemical',
    desc: 'Chemical and Allied Industries',
    image: require('../assets/icons/chemical.png'),
  },
  {
    id: '12',
    title: 'Roots and Tubers',
    desc: 'Roots & Tubers',
    image: require('../assets/images/tuber.png'),
  },
  {
    id: '13',
    title: 'Fish',
    desc: 'Fish & Sea Foods',
    image: require('../assets/images/seafood.png'),
  },
  {
    id: '14',
    title: 'Grains & Cereals',
    desc: 'Grains & Cereals',
    image: require('../assets/images/grains.png'),
  },
  {
    id: '15',
    title: 'Coffee, Tea, Mate & Spices',
    desc: 'Coffee, Tea, Mate & Spices',
    image: require('../assets/images/coffee-beans.png'),
  },
  {
    id: '16',
    title: 'Frozen Foods',
    desc: 'Frozen Foods',
    image: require('../assets/images/frozen-goods.png'),
  },
  {
    id: '17',
    title: 'Prepared or Manufactured Foods',
    desc: 'Prepared or Manufactured Foods',
    image: require('../assets/images/production.png'),
  },
  {
    id: '18',
    title: 'Beverages, Spirits & Vinegar',
    desc: 'Beverages, Spirits & Vinegar',
    image: require('../assets/images/drinks.png'),
  },
  {
    id: '19',
    title: 'Solid Minerals',
    desc: 'Solid Minerals',
    image: require('../assets/images/gold-ingot.png'),
  },
  {
    id: '20',
    title: 'Precious Stones, Pearls, Metal & Coins',
    desc: 'Precious Stones, Pearls, Metal & Coins',
    image: require('../assets/images/diamonds.png'),
  },
  {
    id: '21',
    title: 'Base Metals & Articles',
    desc: 'Base Metals & Articles',
    image: require('../assets/images/crucible.png'),
  },
  {
    id: '22',
    title: 'Vehicles, Aircraft, Vessels and Associated Equipments',
    desc: 'Vehicles, Aircraft, Vessels and Associated Equipments',
    image: require('../assets/images/aircraft.png'),
  },
  {
    id: '23',
    title: 'Textiles & Articles',
    desc: 'Textiles & Articles',
    image: require('../assets/images/leaves.png'),
  },
  {
    id: '24',
    title: 'Plastics & Articles thereof',
    desc: 'Plastics & Articles thereof',
    image: require('../assets/images/thread.png'),
  },
  {
    id: '25',
    title: "Works of Art, Collector's Pieces & Antique",
    desc: "Works of Art, Collector's Pieces & Antique",
    image: require('../assets/images/painting.png'),
  },
];

const contSize = [
  {
    id: 1,
    label: '20 FT',
  },
  {
    id: 2,
    label: '40 FT',
  },
  {
    id: 3,
    label: '40 FT HC',
  },
  {
    id: 4,
    label: '45 FT HC',
  },
];

const searchType = [
  {
    id: 1,
    label: 'Product',
    value: 'Product',
  },
  {
    id: 2,
    label: 'Sell Offer',
    value: 'SellOffer',
  },
  {
    id: 3,
    label: 'Suppliers',
    value: 'User',
  },
];

const searchType2 = [
  {
    id: 1,
    label: 'Products',
  },
  {
    id: 2,
    label: 'Air',
  },
  {
    id: 3,
    label: 'Land',
  },
  {
    id: 4,
    label: 'Ocean',
  },
];

const orderTabs = [
  {
    id: `0`,
    label: 'Pending',
  },
  {
    id: `1`,
    label: 'In Progress',
  },
  {
    id: `2`,
    label: 'Complete',
  },
];

const OrderTabItem = [
  {
    id: 1,
    label: 'RFQ',
  },
  {
    id: 2,
    label: 'RFF',
  },
  {
    id: 3,
    label: 'SELLOFFER',
  },
];

const relatedServices = [
  {
    id: 2,
    label: 'Insurance',
  },
  {
    id: 3,
    label: 'Customs Clearance',
  },
  {
    id: 4,
    label: 'Certification',
  },
  {
    id: 5,
    label: 'Inspection Service',
  },
];

const requestType = [
  {
    id: 1,
    type: 'RFF',
  },
  {
    id: 2,
    type: 'RFQ',
  },
];

const businessType = [
  {
    id: 0,
    type: 'Exporter',
    icon: require('../assets/icons/exporter.png'),
  },
  {
    id: 1,
    type: 'Importer',
    icon: require('../assets/icons/importer.png'),
  },
  {
    id: 2,
    type: 'Trade Association',
    icon: require('../assets/icons/trade.png'),
  },
  {
    id: 3,
    type: 'Manufacturer',
    icon: require('../assets/icons/manufacturing.png'),
  },
  {
    id: 4,
    type: 'Producer',
    icon: require('../assets/icons/producer.png'),
  },
  {
    id: 5,
    type: 'Reseller/Distributor',
    icon: require('../assets/icons/distributor.png'),
  },
  {
    id: 6,
    type: 'Agent',
    icon: require('../assets/icons/agent.png'),
  },
  {
    id: 7,
    type: 'Freight Forwarder',
    icon: require('../assets/icons/freight.png'),
  },
  {
    id: 8,
    type: 'Logistics Provider',
    icon: require('../assets/icons/logistics.png'),
  },
];

const languages = [
  {
    id: 1,
    type: 'Seller-Agreement - English',
  },
  {
    id: 2,
    type: 'Seller-Agreement - Hausa',
  },
  {
    id: 3,
    type: 'Seller-Agreement - French',
  },
];

const charges = [
  {
    id: 1,
    type: 'Basic Freight',
  },
  {
    id: 2,
    type: 'Duties & Taxes',
  },
  {
    id: 3,
    type: 'Insurance',
  },
  {
    id: 4,
    type: 'Total',
  },
];

const loadType = [
  {
    id: 1,
    type: 'Full Container Load',
  },
  {
    id: 2,
    type: 'Full Truck Load',
  },
  {
    id: 3,
    type: 'Less Truck Load',
  },
];

const priceOffer = [
  {
    id: 1,
    type: 'Fixed',
  },
  {
    id: 2,
    type: 'Negotiable',
  },
];

const payType = [
  {
    id: 1,
    type: 'Letter of Credit',
  },
  {
    id: 2,
    type: 'Advance Payment',
  },
  {
    id: 3,
    type: 'Full Payment',
  },
];

const payType3 = [
  {
    id: 2,
    type: 'Letter of Credit',
  },
  {
    id: 3,
    type: 'Escrow',
  },
];

const payType2 = [
  {
    id: 1,
    type: 'Full Payment',
  },
  {
    id: 2,
    type: 'Advance Payment',
  },
];

const exploreTabs = [
  {
    id: 0,
    label: 'RFQ List',
  },
  {
    id: 1,
    label: 'RFF List',
  },
];

const freightType = [
  {
    id: 0,
    label: 'Quote Request',
  },
  {
    id: 1,
    label: 'Agent Request',
  },
];

const RFQType = [
  {
    id: 0,
    label: 'Standard',
  },
  {
    id: 1,
    label: 'Domestic',
  },
  {
    id: 2,
    label: 'International',
  },
];

const storeProducts = [
  {
    id: 0,
    label: 'Products',
  },
  {
    id: 1,
    label: 'Sell Offers',
  },
];

const onboarding = [
  {
    id: '1',
    title: 'Welcome to TradelyX!',
    description:
      'Discover endless possibilities in Export Business. Buy, sell, and connect with businesses across Africa.',
    image: require('./../assets/images/image1.png'),
  },
  {
    id: '2',
    title: 'Trade Your Way',
    description:
      "Customize your trade experience. Set preferences and receive tailored RFQ's or Sell Offers from verified users.",
    image: require('./../assets/images/image2.png'),
  },
  {
    id: '3',
    title: 'Grow Your Business',
    description:
      'Sellers, showcase your products to a vast audience. Buyers, find the best deals for your business needs.',
    image: require('./../assets/images/image3.png'),
  },
  {
    id: '4',
    title: 'Real-time Chat',
    description:
      'Communicate directly with sellers and buyers through our chat feature. Ask questions and negotiate effortlessly.',
    image: require('./../assets/images/image4.png'),
  },
  {
    id: '5',
    title: 'Pay with Confidence',
    description:
      'Trust our escrow service for secure transactions. Your payments are protected until you confirm satisfaction.',
    image: require('./../assets/images/image5.png'),
  },
];

const notifyTypes = [
  {
    id: '1',
    type: 'ORDER',
    title: 'Orders',
    text: 'Order status, tracking updates, disputes, etc',
    icon: require('../assets/icons/order.png'),
  },
  {
    id: '2',
    type: 'PROMOTIONS',
    title: 'Promotions',
    text: 'Discounts, sales announcements, price alerts',
    icon: require('../assets/icons/promo.png'),
  },
];

export default {
  notifyTypes,
  freightType,
  OrderTabItem,
  requestType,
  weight,
  orderTabs,
  storeProducts,
  payType,
  languages,
  exploreTabs,
  containerType,
  contSize,
  contDetails,
  service,
  freight_service,
  quote_service,
  charges,
  searchType,
  register_options,
  advance_rfq,
  relatedServices,
  incoterms2,
  packageType,
  buyFrequency,
  handling,
  paymentType,
  incoterms,
  filterUnit,
  onboarding,
  allCategories,
  paymentMethod,
  signUp,
  categories,
  paymentMethod2,
  sourceLocation,
  sellerService,
  identification,
  searchType2,
  loadType,
  priceOffer,
  freight,
  paymentType2,
  RFQType,
  businessType,
  payType2,
  payType3,
};
