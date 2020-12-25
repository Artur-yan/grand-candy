import React, {Suspense, useEffect, useState} from "react";
import {BrowserRouter, Redirect, Switch} from "react-router-dom";
import Base from "../modules/layouts/base";
import {
  Home,
  Products,
  Product,
  Checkout,
  Favorite,
  News,
  NewsPage,
  Profile,
  HowItsMade,
  Careers,
  ContactUs,
  Shops,
  Info,
  About, FAQ
} from "../modules/containers";
import StateContext from "../contexsts/stateContext";
import Paths from './paths';
import BasketStorage from "../platform/services/storages/basketStorage";
import {IUserModel} from "../platform/api/user/res/user-model";
import AuthStorage from "../platform/services/storages/authStorage";
import {ICategoryModel} from "../platform/api/category/res/category-model";
import {I18nPropvider, locales} from "../i18n";
import t from "../i18n/translate";
import LanguageStorage from "../platform/services/storages/languageStorage";

const RoutContainer = () => {

  const [basket, setBasket] = useState(BasketStorage.getProducts());
  const [categories, setCategories] = useState([]);
  const [category, setActiveCategory] = useState<ICategoryModel>(null);
  const [user, setUser] = useState<IUserModel>(AuthStorage.getUser());
  const [locale, setLanguage] = useState(LanguageStorage.getLanguage());

  useEffect(() => {
    BasketStorage.setProduct(basket)
  }, [basket]);

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <I18nPropvider locale={locale}>
        <StateContext.Provider value={
          {
            basketState: { basket, setBasket },
            categoriesState: {categories, setCategories},
            activeCategory: {category, setActiveCategory},
            userState: {user, setUser},
            language: {setLanguage}
          }
        }>
          <BrowserRouter>
            <Switch>
              <Base exact path={Paths.HOME} component={Home}/>
              <Base exact path={`${Paths.INFO_PAGES}/:content`} component={Info}/>
              <Base exact path={`${Paths.FAQ}/:content`} component={FAQ}/>
              <Base exact path={`${Paths.PROFILE}/:content`} auth={true} component={Profile} />
              <Base exact path={`${Paths.PROFILE}/:content/:orderId`} auth={true} component={Profile}/>
              <Base exact path={`/success`} auth={true} component={Profile}/>
              <Base exact path={`/fail`} auth={true} component={Profile}/>
              <Base exact path={Paths.PRODUCTS} component={Products} />
              <Base exact path={Paths.SHOPS} component={Shops}/>
              <Base exact path={Paths.CAREERS} component={Careers}/>
              <Base exact path={Paths.ABOUT} component={About}/>
              <Base exact path={Paths.FAVORITE} component={Favorite} />
              <Base exact path={Paths.CONTACT_US} component={ContactUs} />
              <Base exact path={`${Paths.PRODUCT}/:id`} component={Product} />
              <Base exact path={`${Paths.CHECKOUT}`} auth={true} component={Checkout} />
              <Base exact path={`${Paths.NEWS}`} component={News} />
              <Base exact path={`${Paths.HOW_ITS_MADE}`} component={HowItsMade} />
              <Base exact path={`${Paths.NEWS_PAGE}/:id`} component={NewsPage} />
              <Redirect to={Paths.HOME} />
            </Switch>
          </BrowserRouter>
        </StateContext.Provider>
      </I18nPropvider>
    </Suspense>
  )
};

export default RoutContainer;
