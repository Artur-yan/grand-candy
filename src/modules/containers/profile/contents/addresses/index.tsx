import React, {useEffect, useState} from "react";
import './style.scss';
import {IAddressModel} from "../../../../../platform/api/address/res/address-model";
import Address from "../../../../../platform/api/address/address";
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

export function Addresses({history}) {

	const [address, setAddress] = useState<IAddressModel[]>([]);
	const [addressDetails, setAddressDetails] = useState<IAddressModel>(null);
	const [modal, setModal] = useState(false);
	const [warningModal, setWarningModal] = useState(false);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [loader, setLoader] = useState(false)

	const getAddresses = () => {
		setLoader(true)
		Address.address().then((res) => {
			setAddress(res.data);
			setSuccess(res.success);
			setLoader(false)
		})
	};
	
	const getAddressForEdit = (id: number) => {
		if (address.length > 0) {
			const item = address.filter(elem => elem.id === id);
			setAddressDetails(item[0])
			setModal(true)
		}
	};

	const deleteAddresses = () => {
		setLoading(true)
		Address.deleteAddress(deleteId).then((res) => {
			setSuccess(res.success);
			setLoading(false);
			setWarningModal(false)
			getAddresses();
		})
	};

	useEffect(() => {
		getAddresses();
	}, [modal])

	return (
		<div className="P-form-card">
			<AddAddress addressDetails={addressDetails} show={modal} close={() => {setModal(false)}}/>
			<WarningModal
				show={warningModal}
				actionText={messages[LanguageStorage.getLanguage()]['delete']}
				loading={loading}
				title={messages[LanguageStorage.getLanguage()]['delete_address']}
				description={messages[LanguageStorage.getLanguage()]['delete_address_description']}
				close={() => {setWarningModal(false)}}
				submit={() => {deleteAddresses()}}/>
			<div className="P-form-section">
				<div className='G-flex-space-between'>
					<div className="P-form-title G-mb-35 ">
						{t('more_my_addresses')}
					</div>
					<div className='G-width-45-mob'>
						<ButtonBase loading={false} classes='P-btn-bg-ping P-btn-primary' onClick={() => {
							setModal(true);
							setAddressDetails(null)
						}}>
							{t('add_new_address')}
						</ButtonBase>
					</div>
				</div>
				<div className="P-card-history G-flex-space-between G-flex-start">
					{loader && <div>
						<CircularProgress size={70} className='G-full-center' color="secondary"/>
					</div>}
					<div className='G-width-100 P-address-list'>
						{address && address.length > 0 &&
						address.map((val, index) => {
							return (
								<div key={index} className='G-p-15 P-address-info-card'>
									<div className='P-card-header'>
										<div>{val.title}</div>
										<div className="G-delete-md-icon" onClick={() => {setDeleteId(val.id);setWarningModal(true)}}><i className="icon-delete_bin"></i></div>
									</div>
									<div className='P-address-location G-cursor-pointer' onClick={() => getAddressForEdit(val.id)}>
										<div className=''>
											<img src={mapPin} alt="Icon"/>
										</div>
										<div className="P-area-address G-flex-column">
											<div className='P-area-address-text'>{val.addressName}</div>
											<div>
												{val.building && `${messages[LanguageStorage.getLanguage()]['add_new_address_building']} - ${val.building}, `}
												{val.building && `${messages[LanguageStorage.getLanguage()]['add_new_address_apartment']} - ${val.apartment}, `}
												{val.building && `${messages[LanguageStorage.getLanguage()]['add_new_address_entrance']} - ${val.entrance}, `}
												{val.building && `${messages[LanguageStorage.getLanguage()]['add_new_address_floor']} - ${val.floor}, `}
											</div>
										</div>
									</div>
								</div>
							)
						})}
						{address.length == 0 && success &&
							<EmptyView title={t('empty_addresses_title')} desc={t('empty_addresses_description')} bubble={LocationBub} icon={Location}/>
						}
					</div>
				</div>
			</div>
		</div>
	);
}
