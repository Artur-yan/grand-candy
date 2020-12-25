import React, {useEffect, useState} from "react";

import Transactions from "../../../../../platform/api/transactions/transactions";
import {BonusCardModal} from "../../../../../components/modals/bonusCard";
import { useBarcode } from '@createnextapp/react-barcode';
import {Error} from "../../../../../components/alerts/toast";
import {BonusCardModel} from "../../../../../platform/api/transactions/res/bonus-card-model";
import Logo from "../../../../../assets/svg/sunCover.svg";
import {ITransactions} from "../../../../../platform/interfaces/transactions";
import {MomentDateMilliSec, SelfToLocalString} from "../../../../../platform/services/helpers";
import {PaginationUi} from "../../../../../components/pagination/pagination";
import SearchIcBub from "../../../../../assets/svg/emptyViews/ic_emptybonuscircles.svg";
import ShopIc from "../../../../../assets/svg/emptyViews/ic_emptybonus.svg";
import {EmptyView} from "../../../../../components/emptyView";
import messages from "../../../../../i18n/messages";
import LanguageStorage from "../../../../../platform/services/storages/languageStorage";
import t from "../../../../../i18n/translate";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import logo from '../../../../../assets/svg/logo_md.svg';
import './style.scss';
import { BarCode } from '../../../../../components/barCode';

export function Bonus ({history}) {

	const [modal, setModal] = useState(false)
	const [success, setSuccess] = useState(null)
	const [barcode, setBarcode] = useState(null)
	const [transactions, setTransactions] = useState<ITransactions[]>()
	const [bonusCard, setBonusCard] = useState<BonusCardModel>()
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(20);
	const [count, setCount] = useState(0);
	const [loader, setLoader] = useState(false)

	const getBonusCard = () => {
		Transactions.bonusCard().then((res) => {
			if (!res.success) {
				Error(res.message)
			} else {
				setBonusCard(res.data)
			}
		})
	}

	const getTransactions = (skip = 0) => {
		setLoader(true)
		Transactions.transactions(skip, size).then((res) => {
			setLoader(false)
			if (res.success) {
				if (!res.data.transactions) {
					setModal(true);
					setSuccess(res.success);
				} else {
					setTransactions(res.data.transactions)
					setCount(res.data.totalItemsQuantity)
				}
			} else {
				setSuccess(false);
			}
		});
	}

	const setPage = (event: React.ChangeEvent<unknown>, value: number) => {
		getTransactions(size * value -1);
		setSkip(value)
	};

	const close = () => {
		setModal(!modal);
		// if (!transactions) {
		// 	history.push(`${Paths.PROFILE}/info`)
		// }
	}

	useEffect(() => {
		getTransactions()
		getBonusCard()
	}, []);

	useEffect(() => {
		if (transactions) {
			setModal(false)
		}
	}, [transactions])

	return (
		<div className="P-form-card">
			<BonusCardModal show={modal} close={() => {close()}} submit={() => {}} onChange={() => {}} addTransaction={(transaction) => setTransactions(transaction)}/>
			<div className="P-form-section P-bonus-section">
				<div className="P-form-title G-mb-35">
					{t('transactions_title')}
				</div>
				{loader &&
					<CircularProgress size={70} className='G-full-center' color="secondary"/>
				}
				{!transactions && success !== null && <EmptyView desc={messages[LanguageStorage.getLanguage()]['empty_bonus_description']} title={messages[LanguageStorage.getLanguage()]['empty_bonus_title']} bubble={SearchIcBub} icon={ShopIc}/>}
				{transactions &&
					<div className="P-card-history">
						<div className='P-bonus-list'>
							{transactions &&
							transactions.map((val, index) => {
								return (
									<div key={index} className='G-flex-space-between G-p-15 P-bonus-info-card'>
										<div className='G-flex-column'>
											<div className="P-order">
												Order #{val.orderNumber}
											</div>
											<div className="P-order-date">
												<MomentDateMilliSec milliSec={val.transactionDate}/>
											</div>
										</div>
										<div className='P-order-count'>
											<span>{val.bonusAmount > 0 ? `+${val.bonusAmount}` : `-${val.bonusAmount}`}</span>
										</div>
									</div>
								)
							})
							}
							{transactions && transactions.length > size &&
							<div className="G-flex-align-center">
								<PaginationUi page={skip} count={count} onChange={setPage}/>
							</div>
							}
						</div>
						<div className="P-card-list">
              <div className='P-bonus-card G-mb-15'>
                <div className="P-modal-sun"></div>
                <div className="P-logo G-flex-align-center G-position-absolute">
                  <div className="P-border-ping G-flex-align-center">
                    <div className="P-border-blue G-flex-align-center"><img className="P-logo-img" src={Logo} alt="logo"/></div>
                  </div>
                </div>
								{bonusCard &&
                <div className="P-bonus-card-info G-flex-space-between">
                  <div className='P-card-number'>{bonusCard.number}</div>
                  <div className='P-card-balance'>{bonusCard.bonus | 0}</div>
                </div>
								}
              </div>
              <div className='P-bonus-card-back'>
              	<div className="P-bonus-card-head">
                  <img src={logo} alt=""/>
								</div>
								<div className="P-candy-cover"/>
								{bonusCard &&
									<div className="P-bar-code">
										<div className="P-bar-code-box">
                      <BarCode value={bonusCard.barCode}/>
										</div>
									</div>
								}
              </div>
						</div>
				</div>
				}
			</div>
		</div>
	);
}
