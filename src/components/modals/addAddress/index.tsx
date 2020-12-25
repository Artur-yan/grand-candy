import React, { useEffect, useState } from 'react';
import '../style.scss';
import './style.scss';
import { AutocompleteInput, ButtonBase, Input, ButtonLink } from '../../formElements';
import { Check } from '../../formElements/checkBox';
import { IAddressModel } from '../../../platform/api/address/res/address-model';
import Address from '../../../platform/api/address/address';
import { Error } from '../../alerts/toast';
import { ValidateEnum } from '../../../platform/enums/validate';
import { AddressValidation } from '../../../platform/statics/validations/addressValidation';
import t from '../../../i18n/translate';
import messages from '../../../i18n/messages/index';
import LanguageStorage from '../../../platform/services/storages/languageStorage';

interface IModal {
	show: boolean,
	addressDetails?: IAddressModel
	close: () => void,
}

export function AddAddress(props: IModal) {
	
	useEffect(() => {
		setApproveSubmit(true)
		setActiveAddress({...activeAddress, isDefault: false})
	}, [props.show])
	
	const [activeAddress, setActiveAddress] = useState<IAddressModel>(null);
	const [errors, setErrors] = useState(null);
	const [approveSubmit, setApproveSubmit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [validation, setValidation] = useState([...AddressValidation]);
	
	const changeListener = (name, value) => {
		setActiveAddress({...activeAddress, [name]: value})
	}
	
	const getAddresses = () => {
		
		let newErrors = {...errors}
		validation.map((val, index) => {
			if (activeAddress) {
				if (!activeAddress[val.name]) {
					newErrors[val.name] = val.message
					setErrors(newErrors)
					setApproveSubmit(false)
				} else {
					delete newErrors[val.name]
					setErrors(newErrors);
				}
			}
		})
		
		if (Object.keys(newErrors).length < 1) {
			setApproveSubmit(true);
			addAddress()
		}
	}
	
	const close = () => {
		setActiveAddress(null)
		setErrors(null)
		props.close()
	};
	
	const addAddress = () => {
		
		if (approveSubmit) {
			setLoading(true)
			Address.addAddress(activeAddress).then((res) => {
				setLoading(false)
				res.success ? close() : Error(res.message)
			})
		}
	};
	
	const edit = () => {
		if (approveSubmit) {
			setLoading(true);
			Address.editAddress(activeAddress).then((res) => {
				setLoading(false);
				res.success ? close() : Error(res.message)
			})
		}
	};
	
	useEffect(() => {
		if (props.addressDetails) {
			setActiveAddress(props.addressDetails);
		}
	}, [props.addressDetails])
	
	return (
		<div className='P-modal'>
			<div onClick={close} className='P-modal-cover' style={props.show ? {display: 'block'} : {display: 'none'}}></div>
			<div className="P-address-wrapper-md P-modal-wrapper"
					 style={{
						 transition: 'opacity .5s .4s',
						 transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
						 top: props.show ? '50%' : '-100%',
						 opacity: props.show ? '1' : '0'
					 }}>
				<div className='G-flex-column P-add-address-modal'>
					<h4 className='G-mb-35'>{t('add_new_address')}</h4>
					<div className="G-mb-25 ">
						<input
							type='text'
							value={activeAddress ? activeAddress.title : ''}
							className='P-pi-15'
							onChange={(e) => {
								changeListener(e.target.name, e.target.value)
							}}
							placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_name']}
							name='title'/>
					</div>
					<div className='G-mb-25 G-text-left'>
						<AutocompleteInput
							placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_address']}
							classes='P-pi-15'
							defaultValue={activeAddress ? activeAddress.addressName : ''}
							onSelect={(location) => {
								setActiveAddress(
									{
										...activeAddress,
										latitude: location.lat,
										longitude: location.lng,
										addressName: location.description
									})
							}}/>
						{errors && <span className="G-error-alert">{errors.addressName && errors.addressName}</span>}
					</div>
					<div className='G-flex-space-between G-mb-25'>
						<div className='G-width-45'>
							<input
								type="text"
								value={activeAddress ? activeAddress.building : ''}
								className='P-pi-15'
								onChange={(e) => {
									changeListener(e.target.name, e.target.value)
								}}
								placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_building']}
								name='building'/>
						</div>
						<div className='G-width-45 G-position-relative'>
							<input
								className='P-pi-15'
								type="text"
								value={activeAddress ? activeAddress.apartment : ''}
								onChange={(e) => {
									changeListener(e.target.name, e.target.value)
								}}
								placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_apartment']}
								name='apartment'/>
						</div>
					</div>
					<div className='G-mb-25 G-flex-space-between'>
						<div className='G-width-45'>
							<input type="text" value={activeAddress ? activeAddress.entrance : ''} className='P-pi-15'
										 onChange={(e) => {
											 changeListener(e.target.name, e.target.value)
										 }} placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_entrance']}
										 name='entrance'/>
						</div>
						<div className='G-width-45'>
							<input type="text" value={activeAddress ? activeAddress.floor : ''} className='P-pi-15'
										 onChange={(e) => {
											 changeListener(e.target.name, e.target.value)
										 }} placeholder={messages[LanguageStorage.getLanguage()]['add_new_address_floor']} name='floor'/>
						</div>
					</div>
					<div className="G-mb-25 G-move-left">
						<Check isChecked={!activeAddress ? false : activeAddress.isDefault} name='isDefault'
									 onChange={(value, name) => {
										 changeListener(name, value)
									 }}/><span className='G-text-gray-sm'>{t('add_new_address_make_this_address_default')}</span>
					</div>
					<div className='G-mb-25 G-flex-space-around G-width-90'>
						<ButtonLink classes='P-btn-link' onClick={close}>{t('cancel')}</ButtonLink>
						<ButtonBase loading={loading} classes='P-btn-bg-ping P-btn-primary' onClick={() => {
							props.addressDetails ? edit() : getAddresses()
						}}>
							{props.addressDetails ? t('change') : t('add')}
						</ButtonBase>
					</div>
				</div>
			</div>
		</div>
	)
}
