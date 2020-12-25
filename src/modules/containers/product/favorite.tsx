import React, {useContext, useEffect, useState} from "react";
import StateContext from "../../../contexsts/stateContext";
import ProductsApi from "../../../platform/api/products/products";
import {IProductModel} from "../../../platform/api/products/res/product-model";
import {Card} from "../../../components/products";
import {IPopularProductModel} from "../../../platform/api/products/res/popular-product-model";
import Paths from "../../../routes/paths";
import './styles.scss';
import IcBub from "../../../assets/svg/emptyViews/ic_emptyfavoritescircles.svg";
import EmptyIc from "../../../assets/svg/emptyViews/ic_emptyfavorites.svg";
import {EmptyView} from "../../../components/emptyView";
import {checkBasketDuplications} from "../../../platform/services/helpers";
import {CircularProgress} from "@material-ui/core";
import {Success} from "../../../components/alerts/toast";
import t from "../../../i18n/translate";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

export function Favorite({match, history}) {

  const {basketState} = useContext(StateContext);
  const [popularProducts, setPopularProducts] = useState<IPopularProductModel[]>([]);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const checkDuplication = (item: IProductModel) => {
    const newBasket = checkBasketDuplications(basketState, item)
    Success('Added to Basket')
    basketState.setBasket(newBasket);
  };

  const changeProduct = (id) => {
    history.push(`${Paths.PRODUCT}/${id}`);
  }

  const favorites = () => {
    setLoader(true)
    ProductsApi.favorites().then((res) => {
      setPopularProducts(res.data.slice(0, 20));
      setSuccess(res.success);
      setLoader(false)
    })
  }

  useEffect(() => {
    favorites()
  }, []);

  return (
    loader ? (
      <CircularProgress size={70} className='G-full-center' color="secondary"/>
    ) : (
    success &&
    <div className="P-favorite">
      <div className='P-favorite-section'>
      {popularProducts.length == 0 ?
        <div className='G-flex-align-center P-favorite-empty-view'>
            <EmptyView title={messages[LanguageStorage.getLanguage()]['empty_favorite_title']} desc={messages[LanguageStorage.getLanguage()]['empty_favorite_description']} bubble={IcBub} icon={EmptyIc}/>
        </div>
        : <div>{t('favorites')}</div>
      }
      </div>
      <div className=''>
        <div className='P-product-card G-flex-wrap'>
          {popularProducts.length > 0 &&
          popularProducts.map((val, index) => {
            return (
              <Card handleFavorite={() => {favorites()}} showIsFavorite={true} key={index} classes='P-card-item-md' product={val} toProductPage={(id:number) => {changeProduct(id)}} onClick={() => {checkDuplication(val)}}/>
            )
          })}
        </div>
      </div>
    </div>
  ));
}
