import React, {useContext, useEffect, useState} from 'react';
import defaultImg from '../../../assets/img/default.png'
import {ButtonBase, FavoriteOutline} from "../../formElements";
import './styles.scss'
import { IProductModel } from '../../../platform/api/products/res/product-model';
import {Measurement} from "../../../platform/statics/measurement";
import ProductsApi from "../../../platform/api/products/products";
import {SelfToLocalString, toFixedNumber} from "../../../platform/services/helpers";
import StateContext from "../../../contexsts/stateContext";
import {MeasurementEnum} from "../../../platform/enums/measurement";

interface IProps {
  onClick: (event?: MouseEvent) => void;
  toProductPage: (id: number) => void;
  handleFavorite?: () => void;
  product: IProductModel;
  showIsFavorite?: boolean
  classes: string
}

export function Card(props: IProps) {

  const [isFavorite] = useState(true);
  const [productIndex, setProductIndex] = useState(null);
  const { basketState } = useContext(StateContext);

  const changeSum = (index, increase) => {
    let basket = [...basketState.basket];
    const isFloat = basket[index].item.measurementEnumValue === MeasurementEnum.kg;
    const basketCount = isFloat ? toFixedNumber(basket[index].count) : basket[index].count;
    const increasingNumber = isFloat ? 0.1 : 1;

    if (increase) {
      basket[index].count = toFixedNumber(increasingNumber + basketCount)
    } else {
      if (basket[index].count > increasingNumber) {
        basket[index].count = toFixedNumber(basketCount - increasingNumber)
      } else {
        basket.splice(index, 1);
      };
    }

    basketState.setBasket(basket);
  };

  const favorite = () => {
    ProductsApi.isFavorite(props.product.id).then((res) => {
      if (res.success) {
        if (props.handleFavorite) {
          props.handleFavorite()
        }
      }
    })
  }

  useEffect(() => {
    let productIndex = basketState.basket.findIndex((item, index) => item.item.id === props.product.id)
    setProductIndex(productIndex)
  }, [basketState.basket])

  return (
    <div className={`G-position-relative G-flex-column ${props.classes}`}>
      {props.showIsFavorite &&
        <div className='P-card-favorite-icon'>
            <FavoriteOutline isFavorite={isFavorite} onClick={() => {favorite()}}/>
        </div>
      }
      <div className=' P-card-image' onClick={() => props.toProductPage(props.product.id)}
           style={{backgroundImage:`url(${props.product.imageUrl ? props.product.imageUrl+'/400/400' : defaultImg})`}}>
      </div>
      <div className='P-card-info G-cursor-pointer' onClick={() => props.toProductPage(props.product.id)}>
        <div className='P-card-title'>{props.product.productName}</div>
        <span className='P-card-description'>
          {props.product.description}
        </span>
      </div>
      <div className='G-flex-space-between G-flex-vertical-center G-pt-3 G-move-bottom '>
        <div className='G-font-lg-1'>{SelfToLocalString(props.product.price)}֏ / {Measurement[props.product.measurementEnumValue]}</div>
        <div className='G-flex G-overflow'>
          {!basketState.basket[productIndex] &&
            <ButtonBase loading={false} classes='P-btn-bg-ping P-btn-sm G-flex-align-center'
                         onClick={() => props.onClick()}>
              <i className="icon-shopping-cart-4"></i>
            </ButtonBase>}
          <div className={`G-flex P-count-control ${basketState.basket[productIndex] && 'P-count-control-active'}`}>
            <div className='P-item-counter'>
              <div className='P-counter-btn' onClick={() => {changeSum(productIndex, false)}}>
                <span>-</span>
              </div>
              <div className='P-count'>
                <span>{basketState.basket[productIndex] && basketState.basket[productIndex].count}</span>
              </div>
              <div className='P-counter-btn' onClick={() => {changeSum(productIndex, true)}}>
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
