const API_URL = 'https://staging-api.qongfu.com';
const IMAGE_URL_PREFIX = 'https://qongfu-staging.s3.ap-south-1.amazonaws.com';
//'https://qongfu.s3.me-south-1.amazonaws.com';

const GOOGLE_PACKAGE_NAME = 'com.qongfu.qongfu';
const APPLE_STORE_ID = '1471513755';

const AppName = 'QongfuApp';
const QONGFU_FCM_TOKEN_KEY = '___QONGFU_FCM_TOKEN___';
const QONGFU_USER_TOKEN_KEY = '----qongfuUserTokenKey@2020----';
const QONGFU_USER_KEY = '----qongfuUserKey@2020----';
const SuccessStatusCode = [200, 201, 202];
const confirmOTPTimeLimit = 60 * 10;

const MaxImageSize = 512000;
const acceptedFiles = ['jpeg', 'jpg', 'png'];
const acceptedFilesForDocumentUplaod = ['jpeg', 'jpg', 'png', 'pdf', 'doc'];
const defaultPageSize = 10;
const defaultCountry = {
  id: 18,
  country: 'Bahrain',
  native: null,
  capital: 'Manama',
  country_code: 'BH',
  nationality: 'Bahrain',
  dial_code: '973',
  approved: 1,
  currency: null,
  currency_code: null,
  currency_decimal: null,
  emoji: '🇧🇭',
  emojiU: null,
  flag: '🇧🇭',
  content: null,
  slag: null,
  meta: null,
  official_language: null,
  regions: [],
};
const COUNTRIES = [
  {
    id: 18,
    country: 'Bahrain',
    capital: 'Manama',
    country_code: 'BH',
    nationality: 'Bahraini',
    dial_code: '973',
    approved: 1,
    icon: 'bahrain',
  },
  {
    id: 166,
    country: 'Oman',
    capital: 'Muscat',
    country_code: 'OM',
    nationality: 'Omani',
    dial_code: '968',
    approved: 1,
    icon: 'oman',
  },

  {
    id: 179,
    country: 'Qatar',
    capital: 'Doha',
    country_code: 'QA',
    nationality: 'Qatari',
    dial_code: '974',
    approved: 1,
    icon: 'qatar',
  },
  {
    id: 194,
    country: 'Saudi Arabia',
    capital: 'Riyadh',
    country_code: 'SA',
    nationality: 'Saudi',
    dial_code: '966',
    approved: 1,
    icon: 'sau',
  },
  {
    id: 231,
    country: 'United Arab Emirates',
    capital: 'Abu Dhabi',
    country_code: 'AE',
    nationality: 'Emirati',
    dial_code: '971',
    approved: 1,
    icon: 'uae',
  },
  {
    id: 102,
    country: 'India',
    capital: 'New Delhi',
    country_code: 'IN',
    nationality: 'Indian',
    dial_code: '91',
    approved: 1,
    icon: 'india',
  },
];

const Filter_List = [
  {
    value: 'lifestyles',
    label: 'Lifestyles',
  },
  // {
  //   value: 'country',
  //   label: 'Country',
  // },
  {
    value: 'area&Cities',
    label: 'Area & Cities',
  },
  {
    value: 'nearby',
    label: 'Nearby Places',
    desc: 'Note: Turning off will enable area/city search.',
  },
];

const FilterCountryList = [
  {label: 'Bahrain', icon: 'FlagBahrain', value: 'Bahrain'},
  {label: 'Saudi Arabia', icon: 'FlagSAU', value: 'Saudi Arabia'},
  {label: 'Kuwait', icon: 'FlagKuwait', value: 'Kuwait'},
  {
    label: 'United Arab Emirates',
    icon: 'FlagUAE',
    value: 'United Arab Emirates',
  },
  {label: 'Qatar', icon: 'FlagQatar', value: 'Qatar'},
  {label: 'Oman', icon: 'FlagOman', value: 'Oman'},
];

const FilterLifestylesList = [
  {label: 'All', icon: 'InnerFilterAll', value: 'all'},
  {label: 'Fitness', icon: 'InnerFilterFitness', value: 'fitness'},
  {label: 'Sports', icon: 'InnerFilterSports', value: 'sports'},
  {label: 'Martial Arts', icon: 'InnerMartialArts', value: 'martialArts'},
  {label: 'Wellness', icon: 'InnerWellness', value: 'wellness'},
  {label: 'Recreation', icon: 'InnerRecreation', value: 'recreation'},
];

const FilterAreaAndCities = [
  {
    label: 'Northern Governorate',
    icon: '',
    value: 'northernGovernorate',
    checked: false,
    regions: [
      {label: 'Saar', value: 'saar', checked: false},
      {label: 'Budaiya', value: 'budaiya', checked: false},
      {label: 'Barbar', value: 'barbar', checked: false},
    ],
  },
  {
    label: 'Capital Governorate',
    icon: '',
    value: 'capitalGovernorate',
    checked: false,
    regions: [
      {label: 'Maqabah', value: 'maqabah', checked: false},
      {label: 'Diraz', value: 'diraz', checked: false},
    ],
  },
  {
    label: 'Southern Governorate',
    icon: '',
    value: 'southernGovernorate',
    checked: false,
    regions: [{label: 'Bani Jamrah', value: 'baniJamrah', checked: false}],
  },
  {
    label: 'Muharraq Governorate',
    icon: '',
    value: 'muharraqGovernorate',
    checked: false,
    regions: [{label: 'Manama', value: 'manama', checked: false}],
  },
];
const MaxSendOTPAgainLimit = 3;

const EnableSendOTPAgain = 1000 * 30;

const LIFESTYLES = [
  {label: 'Fitness', icon: 'fitness'},
  {label: 'Wellness', icon: 'wellness'},
  {label: 'Sports', icon: 'sports'},
  {label: 'Martial Arts', icon: 'martial_arts'},
  {label: 'Recreation', icon: 'recreation'},
];

// const RATINGS = [
//   '5 Star Only',
//   '4 Star Plus',
//   '4 Star Only',
//   '3 Star Plus',
//   '3 Star Only',
// ];

const Map_Key = 'AIzaSyAa50F53uzHl7CVh_bfmwQq5y-hFtfI_C8';
const Week_Day = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const CountriesList = [
  {
    id: 18,
    country: 'Bahrain',
    capital: 'Manama',
    country_code: 'BH',
    nationality: 'Bahraini',
    dial_code: '973',
    approved: 1,
    icon: 'bahrain',
  },
  {
    id: 166,
    country: 'Oman',
    capital: 'Muscat',
    country_code: 'OM',
    nationality: 'Omani',
    dial_code: '968',
    approved: 1,
    icon: 'oman',
  },

  {
    id: 179,
    country: 'Qatar',
    capital: 'Doha',
    country_code: 'QA',
    nationality: 'Qatari',
    dial_code: '974',
    approved: 1,
    icon: 'qatar',
  },
  {
    id: 194,
    country: 'Saudi Arabia',
    capital: 'Riyadh',
    country_code: 'SA',
    nationality: 'Saudi',
    dial_code: '966',
    approved: 1,
    icon: 'sau',
  },
  {
    id: 231,
    country: 'United Arab Emirates',
    capital: 'Abu Dhabi',
    country_code: 'AE',
    nationality: 'Emirati',
    dial_code: '971',
    approved: 1,
    icon: 'uae',
  },
  {
    id: 102,
    country: 'India',
    capital: 'New Delhi',
    country_code: 'IN',
    nationality: 'Indian',
    dial_code: '91',
    approved: 1,
    icon: 'india',
  },
];
const Languages = [
  {
    id: 1,
    language: 'Afrikanns',
    language_code: 'AF',
  },
  {
    id: 2,
    language: 'Albanian',
    language_code: 'SQ',
  },
  {
    id: 3,
    language: 'Arabic',
    language_code: 'AR',
  },
  {
    id: 4,
    language: 'Armenian',
    language_code: 'HY',
  },
  {
    id: 5,
    language: 'Basque',
    language_code: 'EU',
  },
];

const ADVANCE_SEARCH_OPTIONS = {
  sortBy: {
    label: 'Sort Places by',
    values: [
      {label: 'Nearest', icon: 'InnerFilterNearestIcon', value: 'distance'},
      {label: 'Highest Rated', icon: 'HighestRated', value: 'rating'},
      // {label: 'Most Reviewed', icon: 'MostReviewed', value: 'views'},
    ],
    type: 'checkbox',
    fieldValue: 'value',
    // hiddenOnMobile: true,
    multiSelect: false,
  },
  lifestyle: {
    label: 'LifeStyles',
    allLabel: 'Multi...',
    noneLabel: 'All',
    values: [
      {label: 'Fitness', icon: 'InnerFilterFitness', value: 'fitness'},
      {label: 'Sports', icon: 'InnerFilterSports', value: 'sports'},
      {label: 'Martial Arts', icon: 'InnerMartialArts', value: 'martialArts'},
      {label: 'Wellness', icon: 'InnerWellness', value: 'wellness'},
      {label: 'Recreation', icon: 'InnerRecreation', value: 'recreation'},
    ],
    type: 'checkbox',
    fieldValue: 'label',
    multiSelect: true,
  },
  // country: {
  //   label: 'Country',
  //   values: [{label: '', value: '', icon: ''}], //values filled from redux->app-state->countries
  //   type: 'checkbox',
  //   fieldValue: 'value',
  //   multiSelect: false,
  // },
  rated: {
    label: 'Rated',
    allLabel: 'Multi...',
    noneLabel: 'All Ratings',
    values: [
      {label: '5 Star Only', value: '5', icon: 'Star'},
      // {label: '4 Star Plus', value: '4+', icon: 'Star'},
      {label: '4 Star Only', value: '4', icon: 'Star'},
      // {label: '3 Star Plus', value: '3+', icon: 'Star'},
      {label: '3 Star Only', value: '3', icon: 'Star'},
    ],
    type: 'checkbox',
    fieldValue: 'value',
    multiSelect: true,
  },
  areaAndCities: {
    label: 'Area/Cities',
    allLabel: 'All',
    noneLabel: 'NearBy',
    values: [{label: '', icon: '', value: ''}],
    type: 'checkbox',
    fieldValue: 'label',
    multiSelect: true,
  },
};
const CATEGORY_FILTERS = ADVANCE_SEARCH_OPTIONS.lifestyle.values.map(
  (item) => item.label,
);
const RATED_FILTERS = ADVANCE_SEARCH_OPTIONS.rated.values.map(
  (item) => item.value,
);
const defaultSearchFilters = {
  sortBy: 'distance',
  lifestyle: [], //CATEGORY_FILTERS
  country: `${defaultCountry.id}`,
  nearByArea: true,
  areaAndCities: [],
  rated: [], //RATED_FILTERS
  search: '',
  location_lat: null,
  location_lng: null,
};

const GenderList = {
  m: 'Male',
  f: 'Female',
};

const BusinessSettings = [
  {
    title: 'Business Account',
    description: 'Lorem ipsum dolor sit amet consecteur lipzig',
    components: [
      {
        title: 'Account Info',
        value: 'account-info',
      },
      {
        title: 'Account Admin',
        value: 'account-admin',
      },
      {
        title: 'Subscriptions',
        value: 'subscriptions',
      },
    ],
  },
  {
    title: 'Business Profile',
    description: 'Lorem ipsum dolor sit amet consecteur lipzig',
    components: [
      {
        title: 'General Info',
        value: 'general-info',
      },
      {
        title: 'More Info ',
        value: 'more-info',
      },
      {
        title: 'Location',
        value: 'location',
      },
      {
        title: 'Business Hours',
        value: 'business-hours',
      },
      {
        title: 'Lifestyles And Qongfus',
        value: 'lifestyles-and-qongfus',
      },
    ],
  },
  {
    title: 'Media Gallery',
    description: 'Lorem ipsum dolor sit amet consecteur lipzig',
    components: [],
  },
  // {
  //   title: 'Services',
  //   description: 'Lorem ipsum dolor sit amet consecteur lipzig',
  //   components: [
  //     'Memberships(0)',
  //     'Classes(0)',
  //     'Private Bookings(0)',
  //     'Personal Training(0)',
  //   ],
  // },
  // {
  //   title: 'Resources',
  //   description: '(Workforce, facilities and other resources)',
  //   components: [],
  // },
];

const BusinessNotificationSettings = [
  'Calls Enabled',
  'Messaging Enabled',
  'Push Notifications',
  'Show Place',
];

const Default_Timing = [
  {
    day: 0,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: false,
  },
  {
    day: 1,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: false,
  },
  {
    day: 2,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: false,
  },
  {
    day: 3,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: false,
  },
  {
    day: 4,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: false,
  },
  {
    day: 5,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: true,
  },
  {
    day: 6,
    time: [{start: '08:00:00', close: '16:00:00'}],
    isClosed: false,
  },
];

const NewEntities = {
  calendar: {
    label: '',
    isClosed: false,
    active: 1,
    date_from: '',
    date_to: '',
    timing: [],
  },
};

const businessSetupSteps = [
  {
    title: 'Add or claim a place',
    description:
      'Lorem ipsum dolor sit amet, cponsectuter adipising elit. Send iaculis nunc non lectus.',
  },
  {
    title: 'Define the location',
    description:
      'Lorem ipsum dolor sit amet, cponsectuter adipising elit. Send iaculis nunc non lectus.',
  },
  {
    title: 'Submit business documents',
    description:
      'Lorem ipsum dolor sit amet, cponsectuter adipising elit. Send iaculis nunc non lectus.',
  },
];
const ROLE_TYPE_BUSINESS_OWNER = 4;
const ROLE_TYPE_BUSINESS_AUTHORIZED = 5;
const ROLE_TYPE_BUSINESS_SPECIALIST = 8;
export {
  API_URL,
  QONGFU_USER_TOKEN_KEY,
  QONGFU_FCM_TOKEN_KEY,
  SuccessStatusCode,
  confirmOTPTimeLimit,
  QONGFU_USER_KEY,
  MaxImageSize,
  acceptedFiles,
  defaultPageSize,
  Filter_List,
  FilterCountryList,
  FilterLifestylesList,
  FilterAreaAndCities,
  MaxSendOTPAgainLimit,
  EnableSendOTPAgain,
  AppName,
  defaultSearchFilters,
  Map_Key,
  Week_Day,
  COUNTRIES,
  defaultCountry,
  CountriesList,
  Languages,
  LIFESTYLES,
  ADVANCE_SEARCH_OPTIONS,
  GenderList,
  CATEGORY_FILTERS,
  RATED_FILTERS,
  // RATINGS,
  IMAGE_URL_PREFIX,
  GOOGLE_PACKAGE_NAME,
  APPLE_STORE_ID,
  BusinessSettings,
  BusinessNotificationSettings,
  Default_Timing,
  NewEntities,
  businessSetupSteps,
  acceptedFilesForDocumentUplaod,
  ROLE_TYPE_BUSINESS_OWNER,
  ROLE_TYPE_BUSINESS_AUTHORIZED,
  ROLE_TYPE_BUSINESS_SPECIALIST,
};
