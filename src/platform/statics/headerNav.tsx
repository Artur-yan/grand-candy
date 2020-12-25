import Paths from "../../routes/paths";
import t from "../../i18n/translate";

export const navItems = [
  {
    name: t('home'),
    index: 'home',
    isActive: true,
    classes: 'P-products-top',
    isDropping: false,
    exact: true,
    path: Paths.HOME
  },
  {
    name: t('products'),
    index: 'products',
    isDropping: true,
    classes: 'P-products-top',
    exact: true,
    path: `${Paths.PRODUCTS}?products=all`
  },
  {
    name: t('about'),
    index: 'about',
    classes: 'P-products-top',
    isDropping: false,
    exact: true,
    path: Paths.ABOUT
  },
  {
    name: t('shop'),
    index: 'shop',
    classes: 'P-products-top',
    isDropping: false,
    exact: true,
    path: Paths.SHOPS
  },
  {
    name: t('how_its_made'),
    index: 'news',
    classes: 'P-products-top',
    isDropping: false,
    exact: true,
    path: Paths.HOW_ITS_MADE
  },
  // {
  //   name: t('careers'),
  //   index: 'careers',
  //   classes: 'P-products-top',
  //   isDropping: false,
  //   exact: true,
  //   path: Paths.CAREERS
  // },
  {
    name: t('contact_us'),
    index: 'contact-us',
    classes: 'P-products-top',
    isDropping: false,
    exact: true,
    path: Paths.CONTACT_US
  },
]
