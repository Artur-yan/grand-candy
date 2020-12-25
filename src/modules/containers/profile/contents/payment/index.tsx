import React, {useEffect, useState} from "react";
import './style.scss';
import {IAddressModel} from "../../../../../platform/api/address/res/address-model";
import CardApi from "../../../../../platform/api/card/card";
import Location from "../../../../../assets/svg/emptyViews/ic_location2.svg";
import LocationBub from "../../../../../assets/svg/emptyViews/ic_locationbubbles.svg";
import mapPin from "../../../../../assets/svg/mapPin.svg";
import {ButtonBase, ButtonMui} from "../../../../../components/formElements";
import {AddAddress} from "../../../../../components/modals/addAddress";
import {EmptyView} from "../../../../../components/emptyView";
import {WarningModal} from "../../../../../components/modals/warning";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import t from "../../../../../i18n/translate";
import messages from "../../../../../i18n/messages";
import LanguageStorage from "../../../../../platform/services/storages/languageStorage";
import {AddCard} from "../../../../../components/modals/addCard";
import VisaLogo from "../../../../../assets/svg/visa-white.svg";
import MasterLogo from "../../../../../assets/svg/mastercard-white.svg";
import AmexLogo from "../../../../../assets/svg/amex.svg";
import {PaymentCard} from "./components/PaymentCard";
import {ICardModel} from "../../../../../platform/api/card/res/card-model";
import {Gradients} from "../../../../../platform/statics/gradients";
import { CardIcons } from "../../../../../platform/statics/cardIcons";
import CardIcBub from "../../../../../assets/svg/emptyViews/ic_emptypaymentcircles.svg";
import CardIc from "../../../../../assets/svg/emptyViews/ic_emptypayment.svg";

export function Payment({history}) {

	const [cards, setCards] = useState<ICardModel[]>([]);
	const [modal, setModal] = useState(false);
	const [warningModal, setWarningModal] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addLoader, setAddLoader] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [loader, setLoader] = useState(false)

	const getCards = () => {
		setLoader(true)
		CardApi.getAllCards().then((res) => {
			setCards(res.data);
			setSuccess(res.success);
			setLoader(false)
		})
	}

	const addNewCard = () => {
		setAddLoader(true)
		CardApi.addCard().then((res) => {
			if (res && res.success) {
				window.open(res.data.formUrl)
			}
			setAddLoader(false)
		})
	}

	const setDefault = (id, isDefault) => {
		CardApi.makeDefault(id).then((res) => {
			if (res.success) {
				let newBranches = [...cards];
				newBranches.map((card, index) => {
					index === isDefault ? card.default = true : card.default = false;
				})
				setCards(newBranches);
			}
		})
	}

	const deleteCard = () => {
		setLoading(true)
		CardApi.deleteCard(deleteId).then((res) => {
			setSuccess(res.success);
			setLoading(false);
			setWarningModal(false)
			getCards();
		})
	}

	useEffect(() => {
		getCards();
	}, [modal])

	return (
		<div className="P-form-card">
			<AddCard show={modal} close={() => {setModal(false)}}/>
			<WarningModal
				show={warningModal}
				actionText={messages[LanguageStorage.getLanguage()]['delete']}
				loading={loading}
				title={messages[LanguageStorage.getLanguage()]['delete_card']}
				description={messages[LanguageStorage.getLanguage()]['delete_card_description']}
				close={() => {setWarningModal(false)}}
				submit={() => {deleteCard()}}/>
			<div className="P-form-section">
				<div className='G-flex-space-between'>
					<div className="P-form-title G-mb-35">
						{t('my_cards')}
					</div>
					<div>
						<ButtonBase loading={addLoader} classes='P-btn-bg-ping P-btn-primary' onClick={() => {addNewCard()}}>
							{t('add_card')}
						</ButtonBase>
					</div>
				</div>
				<div className='P-payment-cards G-position-relative'>
					{!loader && cards.length === 0 && (
						<EmptyView
							title={messages[LanguageStorage.getLanguage()]['empty_payment_title']}
							desc={messages[LanguageStorage.getLanguage()]['empty_payment_description']}
							bubble={CardIcBub} icon={CardIc}/>
					)}
					{loader && <div>
						<CircularProgress size={70} className='G-full-center' color="secondary"/>
					</div>}
					{cards.length > 0 && (
						cards.map((card, key) => {
							return (
								<div key={key} className='G-mr-40'>
									<PaymentCard
										card={card}
										gradient={Gradients[key]}
										logo={CardIcons[card.cardTypeValue]}
										delete={(id) => {setWarningModal(true); setDeleteId(id)}}
										setDefault={(id) => {setDefault(id, key)}}
										showActions={true}/>
								</div>
							)
						})
					)}

				</div>
			</div>
		</div>
	);
}
