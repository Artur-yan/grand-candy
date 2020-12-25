import { ApiClient } from "../../services/apiClient";
import {IPagingResponse} from "../../interfaces/paging-response";
import {IOrderModel} from "./res/order-model";
import {IOrderDetailsModel} from "./res/order-details-model";

class Order extends ApiClient {

	controller = 'order';

	order = (data) => {
		return this.post('', data)
	}

	orders = (page: number, size: number, statusFilter = [0]) => {
		return this.post<IPagingResponse<IOrderModel>>(`getUserOrdersByFilter/${page}/${size}`, {statusValues:statusFilter})
	}

	pendingOrders = () => {
		return this.get<IOrderModel[]>(`getUserOngoingOrders`)
	}

	rate = (data:{orderFeedback: string, orderRate: number}, id) => {
		return this.put('rateOrder', data, {orderId: id})
	}

	orderDetail = (orderId ) => {
		return this.get<IOrderDetailsModel>(`getOrderDetail`, {orderId:orderId})
	}
}

export default new Order();
