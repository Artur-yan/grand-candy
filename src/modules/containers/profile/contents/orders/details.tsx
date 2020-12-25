import React, {useEffect, useState} from "react";
import {GoBack} from "../../../../../components/formElements/buttonBase";
import {Link} from "react-router-dom";
import Paths from "../../../../../routes/paths";
import Order from "../../../../../platform/api/order/order";
import {IOrderDetailsModel} from "../../../../../platform/api/order/res/order-details-model";
import {OrderStatus} from "../../../../../platform/statics/orderStatus";
import {MomentDateMilliSec, MomentTime, SelfToLocalString} from "../../../../../platform/services/helpers";
import {OrderTypeEnum} from "../../../../../platform/enums/OrderType";
import profileSvg from "../../../../../assets/svg/profile.svg";
import mapPin from "../../../../../assets/svg/mapPin.svg";
import {Measurement} from "../../../../../platform/statics/measurement";
import {RateModal} from "../../../../../components/modals/rate";
import {OrderStatusEnum} from "../../../../../platform/enums/OrderStatus";
import {PaymentEnum} from "../../../../../platform/enums/payment";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import t from "../../../../../i18n/translate";

export function Details ({match}) {

  const [order, setOrder] = useState<IOrderDetailsModel>();
  const [rateModal, setRateModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [rateLoader, setRateLoader] = useState(false)

  const RateOrder = (data: {orderRate: number, orderFeedback: string}) => {
    setRateLoader(true)
    Order.rate(data, match.params.orderId).then((res) => {
      res.success && setRateModal(false);
      setRateLoader(false)
    })
  }

  useEffect(() => {

    if (!rateModal) {
      setLoader(true)
      Order.orderDetail(match.params.orderId).then((res) => {
        setOrder(res.data)
        if (!res.data.serviceRate && OrderStatusEnum.finished === res.data.orderStatusValue) {
          setRateModal(true)
        }
        setLoader(false)
      })
    }
  }, [rateModal]);

  return (
    <div className="P-form-card G-position-relative">
      {loader && <div>
          <CircularProgress size={70} className='G-full-center' color="secondary"/>
      </div>}
      {order && !loader && (
        <div className="P-form-section">
          {!order.serviceRate && OrderStatusEnum.finished === order.orderStatusValue &&
          <RateModal loading={rateLoader} show={rateModal} close={() => {setRateModal(false)}} submit={(data) => {
            RateOrder(data)
          }}/>
          }
          <div className='G-flex-space-between'>
            <div>
              <Link to={`${Paths.PROFILE}/orders`}>
                <GoBack onClick={() => {}} text={t('back_to_orders')}/>
              </Link>
            </div>
            <div className='G-text-gray-sm'>№{order.orderNumber}</div>
            <div className={`P-order-status ${OrderStatus[order.orderStatusValue].className}`}>{OrderStatus[order.orderStatusValue].name}</div>
          </div>
          <div className='P-details-content'>
            <div className='G-pt-5'>
              <div className='P-details-row'>
                <div className="P-info-item">
                  <div className='G-text-gray-sm G-mb-7'>{order.orderTypeValue === OrderTypeEnum.pickup ? t('order_pick_up_date') : t('order_delivery_date')}</div>
                  <div className='G-flex-start P-order-info'>
                    <i className='icon-ic_date P-details-icon'></i>
                    <div><MomentDateMilliSec milliSec={order.orderCreatedDate}/>, {t('order_at')} <MomentTime milliSec={order.orderCreatedDate}/></div>
                  </div>
                </div>
                <div className="P-info-item">
                  <div className='G-text-gray-sm G-mb-7'>{t('order_details_recipient')}</div>
                  <div className='P-order-info G-flex-start'>
                    <img className='P-details-logo' src={profileSvg} alt='icon'/>
                    <div>{order.recipientName}, {order.recipientPhoneNumber}</div>
                  </div>
                </div>
              </div>
              <div className='P-details-row'>
                <div className="P-info-item">
                  <div className='G-text-gray-sm G-mb-7'>{t('payment_methods_title')}</div>

                  {order.paymentMethodValue === PaymentEnum.card ? (
                    <div className='G-flex-vertical-center P-order-info'>
                      <i className='icon-ic_cash2 P-details-icon-md'></i>
                      <div>{t('salary_card')}</div>
                    </div>
                  ) : (
                    <div className='G-flex-vertical-center P-order-info'>
                      <i className="icon-ic_cash P-details-icon-md"></i>
                      <div>{t('payment_type_enum_cash')}</div>
                    </div>
                  )}
                </div>
                {order.comment &&
                <div className="P-info-item">
                    <div className='G-text-gray-sm G-mb-7'>{t('order_details_comment')}</div>
                    <div className='G-flex-vertical-center P-order-info'>
                        <i className='icon-ic_comment P-details-icon'></i>
                        <div>{order.comment}</div>
                    </div>
                </div>
                }
              </div>
            </div>
            <div className="P-pt-5">
              <div className='P-details-row'>
                <div className="P-info-item">
                  {order.orderTypeValue === OrderTypeEnum.pickup ? (
                    <div>
                      <div className='G-text-gray-sm G-mb-7'>{t('order_pick_up_shop')}</div>
                      <div className='G-flex-vertical-center P-order-info'>
                        <div className="P-area-img P-details-logo" style={{backgroundImage: `url(${order.branchDto.imageUrl})`}}></div>
                        <div>{order.branchDto.branchName}</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className='G-text-gray-sm G-mb-7'>{t('basket_delivery_address')}</div>
                      <div className="P-order-info G-flex">
                        <img className='P-details-logo' src={mapPin} alt="Icon"/>
                        <div className='P-area-name'>{order.addressDto ? order.addressDto.addressName : t('empty_addresses_title')}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='P-orders-item-list'>
              <h5 className='G-mb-35 G-mt-7'>{t('order')}</h5>
              <div className='G-flex-column'>
                {order.productList && order.productList.map((val, index) => {
                  return (
                    <div key={index} className='P-item'>
                      <div className='G-flex-vertical-center'>
                        <div className="P-area-img P-details-logo" style={{backgroundImage: `url(${val.imageUrl})`}}></div>
                        <h6 className='G-ml-2 P-name'>{val.productName}</h6>
                      </div>
                      <div className='P-order-info-section'>
                        <div className='G-flex-vertical-center P-order-info'>
                          <div className=''>x <span className='G-ml-1'>{val.productCount}</span></div>
                        </div>
                        <div className='G-flex-vertical-center P-order-info'>
                          <div className=''>{Measurement[val.measurementEnumValue]}</div>
                        </div>
                        <div className='G-flex-vertical-center P-order-info'>
                          <div className=''>{SelfToLocalString(val.price)}֏</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='G-move-right G-flex-space-between P-order-finish-info G-mt-10'>
              <div>
                {order.usedBonus > 0 || order.deliveryFee > 0 && <div className='G-fs-18 G-mt-10'>{t('basket_subtotal')}</div>}
                <div className='G-fs-18 G-mt-10'>{t('basket_used_bonuses')}</div>
                {order.orderTypeValue !== OrderTypeEnum.pickup && <div className='G-fs-18 G-mt-10'>{t('basket_delivery_fee')}:</div>}
                <div className='G-fs-18 G-mt-10 G-font-bold-md-2'>{t('basket_total')}:</div>
              </div>
              <div>
                {order.usedBonus > 0 || order.deliveryFee > 0 && <div className='G-fs-18 G-mt-10'>{SelfToLocalString(order.subTotal)}֏</div>}
                <div className='G-fs-18 G-mt-10'>{order.usedBonus > 0 ? order.usedBonus : 0}</div>
                {order.orderTypeValue !== OrderTypeEnum.pickup && <div className='G-fs-18 G-mt-10'>{order.deliveryFee}</div>}
                <div className='G-fs-18 G-mt-10 G-font-bold-md-2'>{SelfToLocalString(order.total)}֏</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
