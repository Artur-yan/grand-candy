import {ApiClient} from "../../services/apiClient";
import {IBasketCreating} from "../../interfaces/basketCreating";
import {IDeliveryFeeModel} from "./api/delivery-fee-model";

class DeliveryFee extends ApiClient {

  controller = 'deliverFee';

  getDeliveryFeeValueForOrder = (data: IBasketCreating) => {
    return this.post<IDeliveryFeeModel>('getDeliveryFeeValueForOrder', data)
  }
}

export default new DeliveryFee();