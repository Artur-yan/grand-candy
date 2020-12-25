import React, {useContext, useEffect, useState} from "react";
import Paths from "../../../../routes/paths";
import ProductsApi from "../../../../platform/api/products/products";
import {IPopularProductModel} from "../../../../platform/api/products/res/popular-product-model";
import {Card} from "../../../../components/products";
import {IProductModel} from "../../../../platform/api/products/res/product-model";
import StateContext from "../../../../contexsts/stateContext";
import {checkBasketDuplications} from "../../../../platform/services/helpers";
import {CircularProgress} from "@material-ui/core";
import t from "../../../../i18n/translate";


export function MostPopular({history}) {

  const {basketState} = useContext(StateContext);
  const [popularProducts, setPopularProducts] = useState<IPopularProductModel[]>([]);
  const [loader, setLoader] = useState(false);

  const changeProduct = (id) => {
    history.push(`${Paths.PRODUCT}/${id}`);
  }

  const checkDuplication = (item: IProductModel) => {
    const newBasket = checkBasketDuplications(basketState, item)
    basketState.setBasket(newBasket);
  };

  useEffect(() => {
    setLoader(true)
    ProductsApi.popular().then((res) => {
      setPopularProducts(res.data.slice(0, 50));
      setLoader(false)
    })
  }, []);

  return (
    <div className='G-mt-100 G-position-relative'>
      <h3 className='G-mb-35'>{t('home_page_most_popular')}</h3>
      {loader ? (
        <CircularProgress size={70} className='G-full-center' color="secondary"/>
      ) : (
        <div className='P-product-card P-home-must_popular G-flex-wrap'>
          {popularProducts.length > 0 &&
          popularProducts.map((val, index) => {
            return (
              <Card key={index} classes='P-card-item-sm' product={val} toProductPage={(id:number) => {changeProduct(id)}} onClick={() => {checkDuplication(val)}}/>
            )
          })
          }
        </div>
      )}
    </div>
  )
}
