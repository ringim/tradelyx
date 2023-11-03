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

const product_categories = [
  {
    id: '1',
    type: 'Animal & Animal Products',
  },
  {
    id: '2',
    type: 'Vegetable Products',
  },
  {
    id: '3',
    type: 'Animal and Vegetable Fats and Oils',
  },
  {
    id: '4',
    type: 'Foodstuff, Beverages and Tobacco',
  },
  {
    id: '5',
    type: 'Mineral Products',
  },
  {
    id: '6',
    type: 'Chemical & Allied Industries',
  },
];

const sourceLocation = [
  {
    id: 0,
    label: 'Domestic',
  },
  {
    id: 1,
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
    text: 'Delivery within 7-10 days',
    icon: require('../assets/images/air.png'),
  },
  {
    id: `1`,
    label: 'Ocean Freight',
    text: 'Delivery within 20-25 days',
    icon: require('../assets/images/water.png'),
  },
  {
    id: `2`,
    label: 'Land Freight',
    text: 'Delivery within 20-25 days',
    icon: require('../assets/images/land.png'),
  },
];

const quote_service = [
  {
    id: `0`,
    label: 'Standard RFQ',
    text: 'Sent via chat or direct message',
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
    icon: require('../assets/icons/buy.png'),
  },
  {
    id: `1`,
    label: 'Seller',
    type: 'SELLER',
    icon: require('../assets/icons/sell.png'),
  },
];

const incoterms2 = [
  {
    id: 1,
    type: 'Free on Board (FOB)',
  },
  {
    id: 2,
    type: 'Free Alongside Ship (FAS)',
  },
  {
    id: 3,
    type: 'Free Carrier (FCA)',
  },
  {
    id: 4,
    type: 'Cost Insurance and Freight',
  },
  {
    id: 5,
    type: 'Carriage Paid To (CPT)',
  },
  {
    id: 6,
    type: 'Carriage and Insurance Paid To (CIP)',
  },
];

const paymentType = [
  {
    id: 1,
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

const sellerService = [
  {
    id: `0`,
    label: 'Post Sell Offer',
    text: 'Post offers to buyers',
    icon: require('../assets/images/Buy.png'),
  },
  {
    id: `1`,
    label: 'Store and Products',
    text: 'Add new products ',
    icon: require('../assets/images/StoreProducts.png'),
  },
];

const filterUnit = [
  {
    id: 1,
    type: 'Containers',
  },
  {
    id: 2,
    type: 'Tonnes',
  },
  {
    id: 3,
    type: 'Kilograms',
  },
  {
    id: 4,
    type: 'Metric Tonnes',
  },
  {
    id: 5,
    type: 'Meter',
  },
  {
    id: 6,
    type: 'Yard',
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
  {id: '1', type: 'Fresh Vegetables'},
  {id: '2', type: 'Beans'},
  {id: '3', type: 'Wood'},
  {id: '4', type: 'Plants & Trees'},
  {id: '5', type: 'Grains'},
  {id: '6', type: 'Seeds'},
  {id: '7', type: 'Oils'},
  {id: '8', type: 'Buts'},
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
];

const searchType = [
  {
    id: 1,
    label: 'All',
    value: 'All',
  },
  {
    id: 2,
    label: 'Product',
    value: 'Product',
  },
  {
    id: 3,
    label: 'Sell Offer',
    value: 'SellOffer',
  },
  {
    id: 4,
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

const countries = [
  {
    id: 1,
    type: 'Algeria',
  },
  {
    id: 40,
    type: 'Brazil',
  },
  {
    id: 13,
    type: 'Congo',
  },
  {
    id: 21,
    type: 'Ethiopia',
  },
  {
    id: 11,
    type: 'Finland',
  },
  {
    id: 13,
    type: 'India',
  },
  {
    id: 15,
    type: 'Jamaica',
  },
  {
    id: 10,
    type: 'Kenya',
  },
  {
    id: 2,
    type: 'Ghana',
  },
  {
    id: 3,
    type: 'Nigeria',
  },
  {
    id: 3,
    type: 'United Arab Emirates',
  },
  {
    id: 3,
    type: 'United Kingdom',
  },
  {
    id: 3,
    type: 'USA',
  },
  {
    id: 3,
    type: 'Zimbabwe',
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
    label: 'All Orders',
  },
  {
    id: 2,
    label: 'RFF',
  },
  {
    id: 3,
    label: 'RFQ',
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
    type: 'Cooperation',
  },
  {
    id: 1,
    type: 'Distribution',
  },
  {
    id: 1,
    type: 'Manufacturing',
  },
  {
    id: 1,
    type: 'Retail',
  },
  {
    id: 1,
    type: 'Supply Chain',
  },
  {
    id: 2,
    type: 'Wholesale',
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
    type: 'Instant Payment',
  },
];

const exploreTabs = [
  {
    id: `0`,
    label: 'RFQ List',
  },
  {
    id: `1`,
    label: 'RFF List',
  },
];

const freightType = [
  {
    id: `0`,
    label: 'Quote Request',
  },
  {
    id: `1`,
    label: 'Agent Request',
  },
];

const RFFType = [
  {
    id: `0`,
    label: 'Standard',
  },
  {
    id: `1`,
    label: 'Domestic',
  },
  {
    id: `2`,
    label: 'International',
  },
];

const storeProducts = [
  {
    id: `0`,
    label: 'My Store',
  },
  {
    id: `1`,
    label: 'Sell Offers',
  },
];

const packageType2 = [
  {
    id: 1,
    type: 'Bag',
    image: require('../assets/icons/bag.png'),
  },
  {
    id: 2,
    type: 'Box',
    image: require('../assets/icons/box.png'),
  },
  {
    id: 3,
    type: 'Crate',
    image: require('../assets/icons/crate.png'),
  },
  {
    id: 4,
    type: 'Barrel',
    image: require('../assets/icons/barrel.png'),
  },
  {
    id: 5,
    type: 'Pallet',
    image: require('../assets/icons/pallet.png'),
  },
  {
    id: 6,
    type: 'Container',
    image: require('../assets/icons/container.png'),
  },
  {
    id: 8,
    type: 'Less Truck Load',
    image: require('../assets/icons/fullTruck.png'),
  },
  {
    id: 9,
    type: 'Full Truck Load',
    image: require('../assets/icons/fullTruck.png'),
  },
];

export default {
  freightType,
  countries,
  OrderTabItem,
  requestType,
  weight,
  orderTabs,
  storeProducts,
  packageType2,
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
  product_categories,
  filterUnit,
  allCategories,
  paymentMethod,
  signUp,
  categories,
  sourceLocation,
  sellerService,
  identification,
  searchType2,
  loadType,
  priceOffer,
  freight,
  RFFType,
  businessType,
};
