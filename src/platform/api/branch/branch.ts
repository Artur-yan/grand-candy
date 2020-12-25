import { ApiClient } from "../../services/apiClient";
import {IBranchModel} from "./res/branch-model";
import { OrderEnum } from "../../enums/order";

class Branch extends ApiClient {

	controller = 'branch';

	branches = () => {
		return this.get<IBranchModel[]>(`getAllBranchesForMobile?orderTypeValue=${OrderEnum.pickups}`)
	}

	setFavoriteBranch = (id:number) => {
		return this.put(`setFavoriteBranchToUser`, {}, {branchId:id})
	}
}

export default new Branch();
