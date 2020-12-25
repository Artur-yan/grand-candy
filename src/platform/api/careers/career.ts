import { ApiClient } from "../../services/apiClient";
import { ICareerModel } from "./res/career-model";
import { IPagingResponse } from "../../interfaces/paging-response";

class Career extends ApiClient {

	controller = 'career';

	careers = (page: number, size: number) => {
		return this.get<IPagingResponse<ICareerModel>>(`getAllCareersForWeb/${page}/${size}`)
	}
}

export default new Career();
