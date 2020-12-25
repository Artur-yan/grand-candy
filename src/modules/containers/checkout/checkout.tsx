import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import defaultImg from '../../../assets/img/default.png';
import StateContext from '../../../contexsts/stateContext';
import { AutocompleteInput, ButtonBase, DatePicker, Input, Textarea } from '../../../components/formElements';
import { Steps } from './steps';
import BranchApi from '../../../platform/api/branch/branch';
import DeliveryFee from '../../../platform/api/deliveryFee/deliveryFee';
import Address from '../../../platform/api/address/address';
import Order from '../../../platform/api/order/order';
import Radio from '@material-ui/core/Radio';
import { OrderEnum } from '../../../platform/enums/order';
import { PaymentEnum } from '../../../platform/enums/payment';
import MapContainer from '../../../components/map/map';
import { Error, Warning } from '../../../components/alerts/toast';
import { OrderSuccess } from '../../../components/modals/orderSuccess';
import { ValidateEnum } from '../../../platform/enums/validate';
import AuthStorage from '../../../platform/services/storages/authStorage';
import { Measurement } from '../../../platform/statics/measurement';
import { MeasurementEnum } from '../../../platform/enums/measurement';
import { MomentDateTimeMilliSec, SelfToLocalString, toFixedNumber } from '../../../platform/services/helpers';
import { Check } from '../../../components/formElements/checkBox';
import Paths from '../../../routes/paths';
import { CircularProgress } from '@material-ui/core';
import t from '../../../i18n/translate';
import messages from '../../../i18n/messages';
import LanguageStorage from '../../../platform/services/storages/languageStorage';
import CardApi from '../../../platform/api/card/card';
import { ICardModel } from '../../../platform/api/card/res/card-model';
import { WorkingHours } from '../../../components/workingHours';

export function Checkout({history}) {
	
	let counter = 0;
	
	const [stepNumber, setStepNumber] = useState(1);
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(false);
	const [nextLoader, setNextLoader] = useState(false);
	const {basketState} = useContext(StateContext);
	const [total, setTotal] = useState(0);
	const [subTotal, setSubtotal] = useState(0);
	const [isBonusChecked, setIsBonusChecked] = useState(false);
	const [deliveryFee, setDeliveryFee] = useState<{ deliveryFee: number, bonuses: number }>({
		deliveryFee: 0,
		bonuses: 0
	});
	const [useBonuses, setUseBonuses] = useState(null);
	
	//cards
	const [cards, setCards] = useState<ICardModel[]>([]);
	const [defaultCard, setDefaultCard] = useState<ICardModel>();
	const [loader, setLoader] = useState(false)
	const [addLoader, setAddLoader] = useState(false);
	
	//lists
	const [branches, setBranches] = useState(null);
	const [address, setAddress] = useState(null);
	
	//active
	const [addAddressIsOpen, setAddAddressIsOpen] = useState(false);
	const [activeBranch, setActiveBranch] = useState(null);
	const [activeAddress, setActiveAddress] = useState(null);
	const [pickUpDate, setPickUpDate] = useState(null);
	const [pickUpTime, setPickUpTime] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState(PaymentEnum.card);
	
	//order
	const [orderType, setOrderType] = useState<OrderEnum>(null);
	const [success, setSuccess] = useState(false);
	const [orderSuccessData, setOrderSuccessData] = useState(null);
	const [order, setOrder] = useState({
		address: {},
		branchId: 0,
		orderDateTime: null,
		recipientName: AuthStorage.getUser() && AuthStorage.getUser().firsName,
		recipientPhoneNumber: AuthStorage.getUser() && AuthStorage.getUser().phoneNumber,
		comment: '',
		orderTypeValue: 0,
		paymentMethodValue: 0,
		productCountList: [],
		userCardId: 0,
		usedBonus: 0
	});
	
	const changeUseBonuses = (value) => {
		if (value > deliveryFee.bonuses) {
			setErrors(true)
		} else {
			setErrors(false);
			setUseBonuses(value)
		}
	};
	
	const getCards = () => {
		setLoader(true)
		CardApi.getAllCards().then((res) => {
			if (res) {
				setCards(res.data);
				const getDefault = res.data.filter((card) => card.default)
				getDefault.length > 0 && setDefaultCard(getDefault[0])
				setSuccess(res.success);
				setLoader(false)
			}
		})
	}
	
	useEffect(() => {
		getCards()
	}, [])
	
	useEffect(() => {
		if (orderType === OrderEnum.pickups) {
			if (!isBonusChecked) {
				setTotal(subTotal)
				setUseBonuses(null)
			}
		}
	}, [isBonusChecked])
	
	useEffect(() => {
		if (useBonuses) {
			if (!subTotal) {
				setSubtotal(total);
			}
			setTotal(total - useBonuses)
		}
		
		if (!deliveryFee.deliveryFee && !useBonuses) {
			setSubtotal(0)
		}
	}, [useBonuses])
	
	useEffect(() => {
		if (!deliveryFee.bonuses && !deliveryFee.deliveryFee) {
			setSubtotal(total)
		}
	}, [deliveryFee])
	
	useEffect(() => {
		
		let fee = [];
		
		basketState.basket.map((prod, index) => {
			fee.push({productCount: prod.count, productId: prod.item.id})
		})
		
		DeliveryFee.getDeliveryFeeValueForOrder({basketCreatingDto: fee}).then((res) => {
			
			if (res.data) {
				setDeliveryFee(res.data);
			}
			
			if (orderType === OrderEnum.delivery) {
				if (res.deliveryFee) {
					setSubtotal(total);
					setTotal(total - res.deliveryFee)
				}
			}
		})
	}, [basketState])
	
	useEffect(() => {
		if (orderType === OrderEnum.delivery && deliveryFee.deliveryFee) {
			setSubtotal(total);
			setTotal(total + deliveryFee.deliveryFee)
		}
		
		if (orderType === OrderEnum.pickups) {
			setTotal(subTotal)
		}
	}, [orderType])
	
	//order
	useEffect(() => {
		
		let newOrder = {...order};
		
		newOrder.productCountList = basketState.basket.map((val, index) => {
			return {count: val.count, productId: val.item.id}
		});
		newOrder.paymentMethodValue = paymentMethod;
		
		if (paymentMethod === PaymentEnum.card) {
			newOrder.userCardId = defaultCard ? defaultCard.cardId : 0
		} else {
			delete newOrder.userCardId;
		}
		
		if (pickUpDate || pickUpTime) {
			if (pickUpDate) {
				newOrder.orderDateTime = pickUpTime ? pickUpDate + (pickUpTime - pickUpDate) : pickUpDate
			}
		}
		if (orderType === OrderEnum.pickups) {
			delete newOrder.address;
			newOrder.branchId = activeBranch.id;
			newOrder.orderTypeValue = OrderEnum.pickups;
		}
		
		if (orderType === OrderEnum.delivery) {
			newOrder.address = activeAddress;
			delete newOrder.branchId;
			newOrder.orderTypeValue = OrderEnum.delivery;
		}
		setOrder(newOrder);
		
	}, [orderType, pickUpDate, pickUpTime, activeBranch, activeAddress, paymentMethod])
	
	//sum
	useEffect(() => {
		basketState.basket.map((val, index) => {
			counter += val.item.price * val.count;
			setTotal(counter);
			setSubtotal(counter)
		})
		if (basketState.basket.length === 0) {
			history.push('/')
			setTotal(0)
			setSubtotal(0)
		}
	}, [basketState.basket]);
	
	//init calls
	useEffect(() => {
		
		setActiveAddress(null)
		
		if (addAddressIsOpen) {
			return
		}
		
		setLoading(true);
		BranchApi.branches().then((res) => {
			const products = res.data;
			setBranches(res.data)
			setActiveBranch(products[0]);
			setLoading(false)
		});
		
		Address.address().then((res) => {
			setAddress(res.data);
			const defaultAddressIndex = res.data.findIndex((item, index) => item.isDefault)
			setActiveAddress(res.data[defaultAddressIndex]);
			
			if (!res.data[0]) {
				setOrderType(OrderEnum.delivery)
				setAddAddressIsOpen(true)
			}
		})
	}, [addAddressIsOpen])
	
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
			}
			;
		}
		
		basketState.setBasket(basket);
	};
	
	const changeBranch = (index) => {
		setActiveBranch(branches[index])
	}
	
	const deleteItem = (index) => {
		let basket = [...basketState.basket];
		basket.splice(index, 1);
		basketState.setBasket(basket);
	}
	
	const validator = () => {
		
		if (stepNumber === 2) {
			if (orderType) {
				if (orderType === OrderEnum.pickups) {
					if (!pickUpTime || !pickUpDate) {
						return messages[LanguageStorage.getLanguage()]['error_pickup_time_required']
					}
				}
				if (orderType === OrderEnum.delivery) {
					if (addAddressIsOpen) {
						if (!activeAddress) {
							return messages[LanguageStorage.getLanguage()]['error_fields_required']
						}
					} else {
						if (!activeAddress) {
							return messages[LanguageStorage.getLanguage()]['error_address_required']
						}
					}
				}
				if (!order.recipientPhoneNumber) {
					return messages[LanguageStorage.getLanguage()]['error_phone_number_required']
				}
				if (!order.recipientName) {
					return messages[LanguageStorage.getLanguage()]['error_name_required']
				}
				if (order.comment) {
					if (order.comment.length > 100) {
						return messages[LanguageStorage.getLanguage()]['error_comment_contain']
					}
				}
			} else {
				return messages[LanguageStorage.getLanguage()]['basket_delivery_method_error']
			}
			return false
		}
		return false
	}
	
	const nextStep = () => {
		
		let validate = validator();
		
		if (validate) {
			Error(validate)
			return false;
		}
		;
		
		if (stepNumber !== 3) {
			setStepNumber(stepNumber + 1)
		} else {
			setNextLoader(true)
			Order.order(order).then((res) => {
				
				if (!res.success) {
					Warning(res.message)
				} else {
					setSuccess(true)
					setOrderSuccessData(res.data)
				}
				setNextLoader(false)
			}).catch((err) => {
				Error(err.message)
				setNextLoader(false)
			})
		}
	}
	
	const exit = () => {
		setSuccess(false)
		basketState.setBasket([]);
		history.push(`${Paths.PROFILE}/order/${orderSuccessData.orderId}`)
	}
	
	
	const addNewCard = () => {
		setAddLoader(true)
		CardApi.addCard().then((res) => {
			if (res && res.success) {
				window.open(res.data.formUrl)
			}
			setAddLoader(false)
		})
	}
	
	return (
		<div className='P-checkout'>
			{orderSuccessData && <OrderSuccess order={orderSuccessData} show={success} close={() => {
				exit()
			}}/>}
			<Steps steps={stepNumber}/>
			<div className='P-checkout-content'>
				<div className='P-checkout-basket G-position-relative'>
					{stepNumber === 1 &&
					(
						<div className='P-stepOne'>
							<div className='G-font-bold-md-2 G-mb-35'>{t('basket_title')}(<span
								className='G-color-ping'>{basketState.basket && basketState.basket.length}</span>)
							</div>
							{basketState.basket && basketState.basket.map((val, index) => {
								return (
									<div key={index} className='G-flex-space-between P-item'>
										<div className='G-flex G-width-70 G-width-100-mob'>
											<div className='P-img'
													 style={{backgroundImage: `url(${val.item.imageUrl || defaultImg})`}}>
											</div>
											<div className='P-item-info'>
												<span className='P-title'>{val.item.productName}</span>
												<span
													className='G-text-sm-gray-3'>{SelfToLocalString(val.item.price)}֏/{Measurement[val.item.measurementEnumValue]}</span>
												{/*<span className='G-color-ping G-cursor-pointer'>Add to favorite</span>*/}
											</div>
										</div>
										<div className='P-self-price'>
											<div className='G-flex G-flex-align-center'>
												<div className='P-item-counter'>
													<div className={`P-counter-btn ${val.count < 2 && 'G-opacity-0'}`} onClick={() => {
														val.count > 1 && changeSum(index, false)
													}}>
														<span>-</span>
													</div>
													<div className='P-count'>
														<span>{val.count}</span>
													</div>
													<div className='P-counter-btn' onClick={() => {
														changeSum(index, true)
													}}>
														<span>+</span>
													</div>
												</div>
											</div>
											<div
												className='G-text-lg-bold P-self-price-text'>{SelfToLocalString((val.item.price * basketState.basket[index].count))}֏
											</div>
											<div className='G-delete-md-icon' onClick={() => {
												deleteItem(index)
											}}><i className='icon-delete_bin'></i>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					)
					}
					{stepNumber === 2 &&
					(loading ?
							(
								<CircularProgress size={60} className='G-full-center' color="secondary"/>
							) : (
								<>
									{activeBranch &&
                  <div className='P-back'>
                    <div className='P-back-action G-flex-vertical-center G-cursor-pointer' onClick={() => {
											setStepNumber(stepNumber - 1)
										}}><i className='icon-ic_back'></i><span className=''>{t('back_to_delivery')}</span></div>
                    <div className='G-font-bold-md-2 G-mt-32'>{t('order_recipient_information')}</div>
                    <div className="P-delivery-sections G-flex G-mt-32">
                      <div className='G-flex-space-between G-width-100'>
                        <div className='G-width-45'>
                          <Input value={order['recipientName']} onBlur={(name, val) => {
														setOrder({...order, [name]: val})
													}} name='recipientName' placeholder={messages[LanguageStorage.getLanguage()]['first_full']}/>
                        </div>
                        <div className='G-width-45'>
                          <Input value={order['recipientPhoneNumber']} validate={ValidateEnum.phoneNumber}
                                 onBlur={(name, val) => {
																	 setOrder({...order, [name]: val})
																 }} name='recipientPhoneNumber'
                                 placeholder={messages[LanguageStorage.getLanguage()]['phone_number']}/>
                        </div>
                      </div>
                    </div>
                    <div className='G-font-bold-md-2 G-mt-32'>{t('basket_delivery_method_error')}</div>
                    <div className={`P-delivery-sections G-flex G-mt-32 ${(!orderType) && 'G-flex-column'} G-mt-3`}>
                      <div className='P-pick-up G-flex G-flex-start G-position-relative'>
												{orderType === OrderEnum.delivery && <div className='P-blur-section'></div>}
                        <Radio checked={orderType === OrderEnum.pickups} onChange={() => {
													setOrderType(OrderEnum.pickups)
												}} value={OrderEnum.pickups} name='das' inputProps={{'aria-label': 'A'}}/>
                        <div className='P-delivery-description'>
                          <div className='G-font-bold-md-2 G-mb-20'>{t('basket_pick_up')}</div>
                          <div className='G-text-sm-gray-2'>
														{t('basket_pick_ap_description')}
                          </div>
                        </div>
                      </div>
                      <div className='P-delivery G-flex G-flex-start G-position-relative'>
												{orderType === OrderEnum.pickups && <div className='P-blur-section'></div>}
                        <Radio checked={orderType === OrderEnum.delivery} onChange={(name, value) => {
													setOrderType(OrderEnum.delivery)
												}} value={OrderEnum.delivery} name='das'/>
                        <div className='P-delivery-description'>
                          <div className='G-font-bold-md-2 G-mb-20'>{t('delivery')}</div>
                          <div className='G-text-sm-gray-2'> {t('basket_delivery_description')} <MomentDateTimeMilliSec
                            milliSec={new Date().getTime() + 2400000}/>
                          </div>
                        </div>
                      </div>
                    </div>
										{orderType === OrderEnum.pickups &&
                    <div>
                      <div className='P-delivery-content G-pt-3'>
                        <div className='G-text-md-1'>{t('choose_pick_up_location')}</div>
                        <div className='G-flex-column-mob G-flex G-pt-3'>
                          <div className='P-branch-content'>
														
														{activeBranch && branches.map((val, index) => {
															return (
																<div key={index} onClick={() => {
																	changeBranch(index)
																}}
																		 className={`P-branch-item ${val.id === activeBranch.id && 'P-branch-item-active'}`}>
																	<div className='P-branch-title G-text-md-1 G-mb-15'>
																		{val.title}
																	</div>
																	<div className='P-branch-address G-mb-7'>
																		<i className='icon-ic_location'></i>
																		<span>{val.address}</span>
																	</div>
																	<div className='P-branch-hours'>
																		<i className='icon-Ic_pending'></i>
																		<WorkingHours days={val.workingDateHours} className='G-flex'/>
																	</div>
																</div>
															)
														})}
                          </div>
                          <div className='P-map'>
                            <MapContainer
                              markers={[{lat: activeBranch.latitude, lng: activeBranch.longitude}]}
                              zoom={11}/>
                          </div>
                        </div>
                      </div>
                    </div>
										}
										{orderType === OrderEnum.delivery &&
                    <div>
                      <div className='P-delivery-content G-pt-3'>
                        <div className='G-flex-space-between G-width-40 G-width-100-mob'>
                          <div className='G-text-md-1'>{t('basket_delivery_address')}</div>
                          <span className='G-color-ping G-cursor-pointer' onClick={() => {
														setAddAddressIsOpen(!addAddressIsOpen)
													}}>{addAddressIsOpen ? t('cancel') : t('change')}</span>
                        </div>
                        <div className='G-flex-column-mob G-flex G-pt-3'>
													{addAddressIsOpen ? (
														<div className='G-width-45 G-width-100-mob'>
															<div className='G-mb-25'>
																<AutocompleteInput
																	placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_address']}
																	defaultValue={''}
																	onSelect={(location) => {
																		setActiveAddress(
																			{
																				...activeAddress,
																				id: 5,
																				latitude: location.lat,
																				longitude: location.lng,
																				addressName: location.description
																			})
																	}}/>
															</div>
															<div className='G-flex-space-between G-mb-25'>
																<div className='G-width-45'>
																	<Input value={order.address && order.address['building']} onBlur={(name, value) => {
																		setActiveAddress({...activeAddress, [name]: value})
																	}} placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_building']}
																				 name='building'/>
																</div>
																<div className='G-width-45'>
																	<Input value={order.address && order.address['apartment']}
																				 onBlur={(name, value) => {
																					 setActiveAddress({...activeAddress, [name]: value})
																				 }}
																				 placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_apartment']}
																				 name='apartment'/>
																</div>
															</div>
															<div className='G-mb-25 G-flex-space-between'>
																<div className='G-width-45'>
																	<Input value={order.address && order.address['entrance']} onBlur={(name, value) => {
																		setActiveAddress({...activeAddress, [name]: value})
																	}} placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_entrance']}
																				 name='entrance'/>
																</div>
																<div className='G-width-45'>
																	<Input value={order.address && order.address['floor']} onBlur={(name, value) => {
																		setActiveAddress({...activeAddress, [name]: value})
																	}} placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_floor']}
																				 name='floor'/>
																</div>
															</div>
														</div>
													) : (
														<div className='P-branch-content'>
															{activeAddress && address.map((val, index) => {
																return (
																	<div key={index} onClick={() => {
																		setActiveAddress(address[index])
																	}}
																			 className={`P-branch-item ${val.id === activeAddress.id && 'P-branch-item-active'}`}>
																		<div className='P-branch-title G-text-md-1 G-mb-15'>
																			{val.title}
																		</div>
																		<div className='P-branch-address G-mb-7'>
																			<i className='icon-ic_location'></i>
																			<span>{val.addressName}</span>
																		</div>
																	</div>
																)
															})}
														</div>
													)}
                          <div className='P-map'>
                            <MapContainer
                              markers={activeAddress ? [{
																lat: activeAddress.latitude,
																lng: activeAddress.longitude
															}] : []}
                              zoom={11}/>

                          </div>
                        </div>
                      </div>
                    </div>
										}
										
										{orderType &&
                    <>
                      <div className='P-delivery-content G-pt-5'>
                        <div className='G-text-md-1'>{t('order_comment_description')}</div>
                        <div className='G-flex-space-between G-width-100 G-mt-19'>
                          <div className='G-width-100'>
                            <Textarea defaultValue={order['comment']}
                                      placeholder={messages[LanguageStorage.getLanguage()]['comment_to_driver']}
                                      name='comment' onBlur={(name, val) => {
															!!val.trim() && setOrder({...order, [name]: val})
														}
														}/>
                          </div>
                        </div>
                      </div>
                      <div className='P-delivery-content G-pt-4'>
                        <div className='G-text-md-1'>{t('choose_pickup_date')}</div>
                        <div className='G-flex-space-between G-width-100 G-mt-19'>
                          <div className='G-width-45'>
                            <DatePicker placeholder={messages[LanguageStorage.getLanguage()]['select_date']}
                                        defaultValue={pickUpDate} onChange={(val) => {
															setPickUpDate(val)
														}}/>
                          </div>
                          <div className='G-width-45'>
                            <DatePicker placeholder={messages[LanguageStorage.getLanguage()]['select_time']}
                                        defaultValue={pickUpTime} onChange={(val) => {
															setPickUpTime(val)
														}} type='time'/>
                          </div>
                        </div>
                      </div>
                    </>
										}
                  </div>}
								</>
							)
					)
					}
					{stepNumber === 3 &&
					(
						<div className='P-back'>
							<div className='P-back-action G-flex-vertical-center G-cursor-pointer' onClick={() => {
								setStepNumber(stepNumber - 1)
							}}><i className='icon-ic_back'></i><span className=''>{t('back_to_delivery')}</span></div>
							<div className='P-payment-content G-pt-3'>
								<div className='P-pick-up G-flex G-flex-start G-position-relative'>
									<Radio checked={paymentMethod === PaymentEnum.card || OrderEnum.pickups === orderType}
												 onChange={() => {
													 setPaymentMethod(PaymentEnum.card)
												 }} value={PaymentEnum.card} name='payment'/>
									<div className='P-delivery-description G-width-100'>
										<div className='G-flex-space-between'>
											<div className='G-font-bold-md-2 G-mb-20'>Credit Card</div>
											{cards && cards.length > 1 && (
												<span className='G-color-ping'>{t('change')}</span>)
											}
											{!defaultCard && (
												<span className='G-color-ping' onClick={() => addNewCard()}>{t('add_card')}</span>)
											}
										</div>
										<div onClick={() => {
										}} className="P-payment-item">
											{defaultCard && (
												<div className='P-payment-info G-mb-7'>
													<div>
														<i className='icon-ic_cash2'></i>
													</div>
													<div className='G-flex-column'>
														<b className='G-fsb-20'>Select Card</b>
														<p
															className='G-fs-18 G-mt-10'>*****{defaultCard.cardNumber.substr(defaultCard.cardNumber.length - 4)}</p>
													</div>
												</div>
											)}
											{loader && <div>
                        <CircularProgress size={40} className='G-full-center' color="secondary"/>
                      </div>}
										</div>
									</div>
								</div>
								{OrderEnum.pickups !== orderType &&
                <div className='P-pick-up G-flex G-flex-start G-position-relative'>
                  <Radio checked={paymentMethod === PaymentEnum.cash} onChange={() => {
										setPaymentMethod(PaymentEnum.cash)
									}} value={PaymentEnum.cash} name='payment'/>
                  <div className='P-delivery-description G-width-100'>
                    <div className='G-font-bold-md-2 G-mb-20'>{t('payment_type_enum_cash')}</div>
                    <div onClick={() => {
										}} className="P-payment-item">
                      <div className='P-payment-info G-mb-7'>
                        <div>
                          <i className='icon-ic_cash'></i>
                        </div>
                        <div className='G-flex-column'>
                          <span>{t('pay_order_desc')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
								}
								{deliveryFee && deliveryFee.bonuses !== 0 &&
                <div>
                  <div className='G-font-bold-md-2 G-mb-20 G-ml-10'>User collected bonuses</div>
                  <div className='G-flex-vertical-center'>
                    <Check name='privacy' isChecked={isBonusChecked} onChange={(checked) => {
											setIsBonusChecked(checked);
										}}/>
                    <div className='G-fs-18 G-ml-1'>{t('basket_use_bonuses')}</div>
                    <div
                      className='G-fsb-20 G-move-right G-color-ping'>{deliveryFee.bonuses} {t('order_details_bonuses')}</div>

                  </div>
                  <div className='G-mt-10'>
										{isBonusChecked &&
                    <Input
                      error={errors && `you can use no more than ${deliveryFee.bonuses}`}
                      placeholder='Bonuses...'
                      value={useBonuses}
                      validate={ValidateEnum.number}
                      name='bonus'
                      onBlur={(name, value) => {
												changeUseBonuses(value)
											}}
                      onChanging={(name, value) => {
												changeUseBonuses(value)
											}}
                    />}
                  </div>
                </div>
								}
							</div>
						</div>
					)}
				</div>
				<div className='P-checkout-price'>
					<div className='P-summary'>{t('order_summary')}</div>
					<div className='G-flex-column G-flex-space-between'>
						{OrderEnum.delivery === orderType &&
            <div className='G-flex-space-between G-mb-20'>
              <span className='P-info-text'>{t('basket_subtotal')}</span>
              <span className='P-info-text'>{SelfToLocalString(subTotal)}֏</span>
            </div>
						}
						{OrderEnum.pickups === orderType && useBonuses &&
            <div className='G-flex-space-between G-mb-20'>
              <span className='P-info-text'>{t('basket_subtotal')}</span>
              <span className='P-info-text'>{SelfToLocalString(subTotal)}֏</span>
            </div>
						}
						{OrderEnum.delivery === orderType &&
            <div className='G-flex-space-between G-mb-20'>
              <span className='P-info-text'>{t('basket_delivery_fee')}</span>
              <span className='P-info-text'>{deliveryFee && deliveryFee.deliveryFee}֏</span>
            </div>
						}
						<div className='G-flex-space-between'>
							<span className='P-info-text'>{t('earned_bonus')}</span>
							<span className='P-info-text'>+{deliveryFee.bonuses}</span>
						</div>
					</div>
					<hr className='G-color-gray-2'/>
					<div className='P-summary G-flex-space-between'>
						<span>{t('total_price')}</span>
						<span>{SelfToLocalString(total)}֏</span>
					</div>
					<div>
						<ButtonBase loading={nextLoader} classes='P-btn-bg-ping P-btn-primary'
												onClick={() => nextStep()}>{stepNumber === 3 ? t('checkout') : t('continue_text')}</ButtonBase>
					</div>
				</div>
			</div>
		</div>
	);
}

// Choose Order type