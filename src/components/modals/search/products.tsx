import React, {useContext} from "react";
import Paths from "../../../routes/paths";
import {Card} from "../../../components/products";
import {IProductModel} from "../../../platform/api/products/res/product-model";
import StateContext from "../../../contexsts/stateContext";
import {checkBasketDuplications} from "../../../platform/services/helpers";

interface IProps {
  products: IProductModel[]
  history: any
  onClick: () => void
}

export function Products(props: IProps) {

  const {basketState} = useContext(StateContext);

  const changeProduct = (id) => {
    props.history.push(`${Paths.PRODUCT}/${id}`);
  }

  const checkDuplication = (item: IProductModel) => {
    const newBasket = checkBasketDuplications(basketState, item)
    basketState.setBasket(newBasket);
  };

  return (
    <div className='P-product-card G-flex-wrap'>
      {props.products.length > 0 &&
      props.products.map((val, index) => {
        return (
          <Card key={index} classes='P-card-item-search' product={val} toProductPage={(id: number) => {
            changeProduct(id);
            props.onClick()
          }} onClick={() => {
            checkDuplication(val)
          }}/>
        )
      })}
    </div>
  )
}