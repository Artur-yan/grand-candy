import { ApiClient } from "../../services/apiClient";
import {IPagingResponse} from "../../interfaces/paging-response";
import {IHowItIsMadeModel} from "./res/howItIsMade-model";

class HowItIsMade extends ApiClient {

	controller = 'howItIsMade';

	getAllHowItIsMade = (page: number, size: number, statusFilter = 0) => {
		return this.get<IPagingResponse<IHowItIsMadeModel>>(`getAllActiveHowItIsMadeForMobile/${page}/${size}`, {})
	}
}

export default new HowItIsMade();
