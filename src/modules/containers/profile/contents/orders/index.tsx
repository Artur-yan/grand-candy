import React, {useEffect, useState} from "react";
import './style.scss';
import Order from "../../../../../platform/api/order/order";
import {PaginationUi} from "../../../../../components/pagination/pagination";
import {Select} from "../../../../../components/formElements";
import {IOrderModel} from "../../../../../platform/api/order/res/order-model";
import {OrderStatus} from "../../../../../platform/statics/orderStatus";
import {OrderTypeEnum} from "../../../../../platform/enums/OrderType";
import {MomentDate, MomentDateMilliSec, MomentTime, SelfToLocalString} from "../../../../../platform/services/helpers";
import {Error} from "../../../../../components/alerts/toast";
import mapPin from "../../../../../assets/svg/mapPin.svg";
import {Link} from "react-router-dom";
import Paths from "../../../../../routes/paths";
import {OrderFilter} from "../../../../../platform/statics/ordersFilter";
import {OrderStatusEnum} from "../../../../../platform/enums/OrderStatus";
import OrderIcBub from "../../../../../assets/svg/emptyViews/ic_locationbubbles.svg";
import OrderIc from "../../../../../assets/svg/emptyViews/ic_order.svg";
import {EmptyView} from "../../../../../components/emptyView";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import t from "../../../../../i18n/translate";
import messages from "../../../../../i18n/messages";
import LanguageStorage from "../../../../../platform/services/storages/languageStorage";

export function Orders({history}) {

	const [orders, setOrders] = useState<IOrderModel[]>([])
	const [success, setSuccess] = useState(false)
	const [loader, setLoader] = useState(false)
	const [ignoreFilters] = useState([OrderStatusEnum.accepted, OrderStatusEnum.branch_attached])
	const [skip, setSkip] = useState(0);
	const [size] = useState(10);
	const [count] = useState(0);
	const [filter, setFilter] = useState<OrderStatusEnum[]>([0]);

	const getOrders = (page = 0) => {

		setLoader(true)
		Order.orders(page, size, filter).then((res) => {
			setLoader(false)
			if (res) {
				setSuccess(res.success)
				if (!res.data.content) {
					Error(res.message)
				} else {
					setOrders(res.data.content)
				}
			}
		});
	}

	const setPage = (event: React.ChangeEvent<unknown>, value: number): void => {
		getOrders( value -1);
		setSkip(value)
	};

	useEffect((): void => {
		getOrders()
	}, [filter]);

	return (
		<div className="P-form-card">
			<div className="P-form-section">
				<div className='G-flex-space-between'>
					<div className="P-form-title G-mb-35">
						{t('more_my_orders')}
					</div>
					<div className='G-position-relative'>
						<Select placeholder={messages[LanguageStorage.getLanguage()]['filter_by']} data={OrderFilter} classes='G-p-5 G-bg-light-gray G-border-none' onChange={(selectedData) => { setFilter(selectedData) }} />
					</div>
				</div>
				<div className="P-card-history G-flex-space-between G-flex-start G-position-relative">
					{loader && <div>
						<CircularProgress size={70} className='G-full-center' color="secondary"/>
					</div>}
					<div className='G-width-100 P-order-list'>
						{orders.length > 0 ? (
							orders.map((val, index) => {
								return (
									<Link key={index} to={`${Paths.PROFILE}/order/${val.orderId}`}>
										<div className='G-p-15 P-order-info-card'>
											<div className='P-card-header'>
												<div className='G-text-gray-sm'>№{val.orderNumber}</div>
												<div className={`P-order-status ${OrderStatus[val.orderStatus].className}`}>{OrderStatus[val.orderStatus].name}</div>
											</div>
											<div className='P-order-location'>
												{val.orderType === OrderTypeEnum.pickup ? (
													<>
														<div className="P-area-img" style={{backgroundImage: `url(${val.branch.imageUrl})`}}></div>
														<div className='P-area-name'>
															{val.branch.branchName}
														</div>
													</>
												) : (
													<div className="P-area-address G-flex">
														<img src={mapPin} alt="Icon"/>
														{val.address.addressName && <div className='P-area-name'>{val.address.addressName}</div>}
													</div>
												)}
											</div>

											<div className='P-order-details G-flex-space-between'>
												<div className='G-flex-column G-width-30 G-width-60-mob'>
													<div className='G-text-gray-sm G-mb-7'>{val.orderType === OrderTypeEnum.pickup ? t('order_pick_up_date') : t('order_delivery_date')}</div>
													<div className='P-order-info'><MomentDate milliSec={val.orderDate}/>, {t('order_at')} <MomentTime milliSec={val.orderDate}/></div>
												</div>
												<div className='G-flex-column G-width-30'>
													<div className='G-text-gray-sm G-mb-7'>{t('basket_total')}</div>
													<div className='P-order-info'>{SelfToLocalString(val.total)}֏</div>
												</div>
												<div className='P-area-galera G-d-mob-none'>
													{
														val.productImages.map((image, index) => {
															if (index > 2) return false;
															return <div key={index} className={`
														 P-area-img 
														${val.productImages.length > 3
															&& index === 2 && 'G-black-blur'}`}
																					style={{backgroundImage: `url(${image}/100/100)`}}>
																{val.productImages.length > 3  && index === 2 && <span className='G-position-absolute-full-center '>+3</span>}
															</div>
														})
													}
												</div>
											</div>
											<div className='P-area-galera G-d-desc-none'>
												{
													val.productImages.map((image, index) => {
														if (index > 2) return false;
														return <div key={index} className={`
														 P-area-img 
														${val.productImages.length > 3
														&& index === 2 && 'G-black-blur'}`}
																				style={{backgroundImage: `url(${image}/100/100)`}}>
															{val.productImages.length > 3  && index === 2 && <span className='G-position-absolute-full-center '>+3</span>}
														</div>
													})
												}
											</div>
										</div>
									</Link>
								)
							})
						) : (
							success && <EmptyView title={messages[LanguageStorage.getLanguage()]['empty_order_title']} desc={messages[LanguageStorage.getLanguage()]['empty_order_description']} bubble={OrderIcBub} icon={OrderIc}/>
						)}
						{ orders && orders.length > size &&
							<div className="G-flex-align-center">
								<PaginationUi page={skip} count={count} onChange={setPage}/>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	);
}
