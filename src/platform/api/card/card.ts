import { ApiClient } from "../../services/apiClient";
import { ICardModel} from "./res/card-model";


class Card extends ApiClient {

	controller = 'userCard';

	getAllCards = () => {
		return this.get<ICardModel[]>(`getAllCards`)
	}

	deleteCard = (id) => {
		return this.delete('', {userCardId: id})
	};

	addCard = () => {
		return this.post<{formUrl:string, orderId: string}>('addCard', {})
	}

	makeDefault = (id) => {
		return this.put('makeDefault', {}, {userCardId: id})
	}
}

export default new Card();
