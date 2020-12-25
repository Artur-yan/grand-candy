import {ApiClient} from "../../services/apiClient";
import {TransactionsModel} from "./res/transactions-model";
import {BonusCardModel} from "./res/bonus-card-model";

class Transactions extends ApiClient {

	controller = 'transaction';

	transactions = (skip:number, size:number) => {
		return this.get<TransactionsModel>(`getTransactionsForMobile?skip=${skip}&size=${size}`)
	}

	bonusCard = () => {
		return this.get<BonusCardModel>('getUserBonusCardData')
	}
}

export default new Transactions()
