import React, { useContext, useEffect, useState } from 'react';
import StateContext from '../../../contexsts/stateContext';
import ProductsApi from '../../../platform/api/products/products';
import { IProductModel } from '../../../platform/api/products/res/product-model';
import { Card, Breadcrumb } from '../../../components/products';
import defaultImg from '../../../assets/img/default.png';
import { ButtonBase, Favorite } from '../../../components/formElements';
import { IPopularProductModel } from '../../../platform/api/products/res/popular-product-model';
import { Measurement } from '../../../platform/statics/measurement';
import { MeasurementEnum } from '../../../platform/enums/measurement';
import { toFixedNumber } from '../../../platform/services/helpers';
import { CircularProgress } from '@material-ui/core';
import t from '../../../i18n/translate';


export function Product({match, history}) {
	
	const {basketState, activeCategory} = useContext(StateContext);
	const [popularProducts, setPopularProducts] = useState<IPopularProductModel[]>([]);
	const [product, setProduct] = useState<IProductModel>(null);
	const [success, setSuccess] = useState(false);
	const [loader, setLoader] = useState(false);
	const [showToBasket, setShowToBasket] = useState(true);
	const [localBasket, setLocalBasket] = useState(null);
	const [isFavorite, setIsFavorite] = useState(null);
	const urlParams = new URLSearchParams(window.location.search);
	
	let checkDuplication = (item: IProductModel) => {
		let basket = [...basketState.basket];
		const index = basket.findIndex(x => x.item.id === item.id);
		
		if (index === -1) {
			basket.push({item: item, count: 1});
		} else {
			basket[index].count++;
		}
		basketState.setBasket(basket);
	};
	
	let addToBasket = (item: IProductModel) => {
		let basket = [...basketState.basket];
		const index = basket.findIndex(x => x.item.id === item.id);
		
		if (index === -1) {
			basket.push(localBasket);
		}
		basketState.setBasket(basket);
	}
	
	const favorite = () => {
		ProductsApi.isFavorite(product.id).then((res) => {
			if (res.success) {
				setIsFavorite(!isFavorite)
			}
		})
	}
	
	const changeProduct = (id) => {
		history.push(`${id}`);
	}
	
	const changeSum = (item, increase) => {
		
		let basket = [...basketState.basket];
		const index = basket.findIndex(x => x.item.id === item.id);
		const isFloat = item.measurementEnumValue === MeasurementEnum.kg;
		const basketCount = isFloat ? toFixedNumber(localBasket.count) : localBasket.count;
		const increasingNumber = isFloat ? 0.1 : 1;
		
		if (increase) {
			setLocalBasket({...localBasket, count: localBasket.count = toFixedNumber(increasingNumber + basketCount)})
		} else {
			
			if (basketCount > increasingNumber) {
				setLocalBasket({...localBasket, count: localBasket.count = toFixedNumber(basketCount - increasingNumber)})
			} else {
				basket.splice(index, 1);
				basketState.setBasket(basket);
				return
			}
		}
		
		if (!showToBasket) {
			basket[index] = localBasket;
			basketState.setBasket(basket);
		}
	};
	
	useEffect(() => {
		let basket = [...basketState.basket];
		const index = basket.findIndex(x => x.item.id == match.params.id);
		if (index === -1) {
			setShowToBasket(true)
			setLocalBasket({item: product, count: 1})
		} else {
			setShowToBasket(false)
			setLocalBasket(basket[index])
		}
		
	}, [basketState.basket])
	
	useEffect(() => {
		
		let basket = [...basketState.basket];
		let count = 1;
		const index = basket.findIndex(x => x.item.id == match.params.id);
		
		if (index === -1) {
			setShowToBasket(true)
		} else {
			count = basket[index].count
			setShowToBasket(false)
		}
		setLoader(true);
		ProductsApi.product({id: match.params.id}).then((res) => {
			setProduct(res.data);
			setIsFavorite(res.data.favorite)
			setLocalBasket({item: res.data, count: count})
			setSuccess(res.success);
			setLoader(false)
		});
		
		ProductsApi.popular().then((res) => {
			setPopularProducts(res.data.slice(0, 4));
		})
	}, [match.url]);
	
	return (
		loader ? (
			<CircularProgress size={70} className='G-full-center' color="secondary"/>
		) : (
			success &&
      <div className='P-products G-mb-100'>
        <div className='G-flex-column'>
          <div className='G-flex-space-between G-flex-vertical-center'>
            <Breadcrumb category={activeCategory.category} product={product.productName}/>
          </div>
          <div className='G-flex-column P-product'>
            <div className='P-product'>
              <div className='P-img' style={{backgroundImage: `url(${product.imageUrl || defaultImg})`}}></div>
              <div className='P-info'>
                <div className='P-product-header'>
                  <div className="P-bars">{product.productName}</div>
                  <Favorite isFavorite={isFavorite} onClick={() => {
										favorite()
									}}/>
                </div>
                <div className='P-title'>
									{product.productName}
                </div>
                <div className="P-price">
									{product.price}֏ / {Measurement[product.measurementEnumValue]}
                </div>
                <div className='P-product-actions'>
                  <div className='P-counter '>
                    <div className='P-decrease G-use-select-none G-flex-vertical-center' onClick={() => {
											changeSum(product, false)
										}}>-
                    </div>
                    <div className='P-count'>{localBasket.count}</div>
                    <div className='P-increase G-use-select-none G-flex-vertical-center' onClick={() => {
											changeSum(product, true)
										}}>+
                    </div>
                  </div>
                  <div className='P-add-to-basket'>
										{showToBasket &&
                    <ButtonBase loading={false} classes='P-btn-bg-ping P-btn-primary' onClick={() => {
											addToBasket(product)
										}}>
											{t('product_details_add_to_basket')}
                    </ButtonBase>
										}
                  </div>
                </div>
                <div className='P-description'>
                  <div className='G-text-sm-gray-2'>
                    Made of delicious, creamy milk chocolate, Grand Candy Milk Chocolate Bars make life delicious,
                    whether enjoyed alone or shared with a friend.
                  </div>
									{/*<div className='P-desc-title G-mt-32'>*/}
									{/*  Ingredients*/}
									{/*</div>*/}
									{/*<div className='G-text-sm-gray-2 G-mt-32'>*/}
									{/*  {product.ingredients}*/}
									{/*</div>*/}
                  <div className='P-desc-shelf G-mt-32'>
										{t('product_details_shelf_life')}
                  </div>
                  <div className='G-text-sm-gray-2 G-mt-32'>
										{product.shelfLife}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='P-favorite-section'>{t('recommended_for_you')}</div>
              <div className=''>
                <div className='P-product-card G-flex-wrap'>
									{popularProducts.length > 0 &&
									popularProducts.map((val, index) => {
										return (
											<Card key={index} classes='P-card-item-md' product={val} toProductPage={(id: number) => {
												changeProduct(id)
											}} onClick={() => {
												checkDuplication(val)
											}}/>
										)
									})
									}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	);
}
