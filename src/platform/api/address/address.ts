import { ApiClient } from "../../services/apiClient";
import {IAddressModel} from "./res/address-model";


class Address extends ApiClient {

	controller = 'address';

	address = () => {
		return this.get<IAddressModel[]>(`getAddressList`)
	};
	
	getAddress = (id: number) => {
		return this.get<IAddressModel>(`${id}`)
	};
	
	editAddress = (address: IAddressModel) => {
		return this.put<IAddressModel>(`${address.id}`, address)
	};
	
	deleteAddress = (id) => {
		return this.delete(id)
	};

	addAddress = (data: IAddressModel) => {
		return this.post('', data)
	}
}

export default new Address();
