import React, {useContext, useState} from "react";
import '../../style.scss';
import User from "../../../../../platform/api/user/user";
import StateContext from "../../../../../contexsts/stateContext";
import {ButtonBase, DatePicker, Input} from "../../../../../components/formElements";
import {Error, Success} from "../../../../../components/alerts/toast";
import messages from "../../../../../i18n/messages";
import LanguageStorage from "../../../../../platform/services/storages/languageStorage";
import t from "../../../../../i18n/translate";

export function Info () {

	const { userState } = useContext(StateContext);
	const [infoForm, setInfoForm] = useState({
		firstName: userState.user.firsName,
		lastName: userState.user.lastName,
		dateOfBirth:userState.user.dateOfBirth});
	const [passForm, setPassForm] = useState<{password?: string, oldPassword?:string}>({});
	const [passConf, setPassConf] = useState(null);
	const [infoLoader, setInfoLoader] = useState(false);
	const [passLoader, setPassLoader] = useState(false);


	const savePassword = () => {
		if (!passForm.oldPassword) {
			Error("Passwords is required!")
			return;
		}

		if (passForm.oldPassword && !passForm.password) {
			Error("New password is required!")
		}

		if (passForm.password === passConf) {
			setPassLoader(true)
			User.changePassword(passForm).then((res) => {
				if (res.success) {
					Success(messages[LanguageStorage.getLanguage()]['personal_info_password_change_success'])
				} else {
					Error(res.message)
				}
				setPassLoader(false)
			})
		} else {
			Error((messages[LanguageStorage.getLanguage()]['error_passwords_not_match']))
		}
	}

	const saveInfo = () => {
		setInfoLoader(true)
		User.updateInfo(infoForm).then((res) => {
			if (res.success) {
				Success(messages[LanguageStorage.getLanguage()]['personal_info_change_success'])
			} else {
				Error(res.message)
			}
			setInfoLoader(false)
		})
	}

	return (
		<div className="P-form-card">
			<div className="P-form-section">
				<div className="P-form-title G-mb-35">
					{t('more_personal_information')}
				</div>
				<div className="G-flex-wrap">
					<div className='P-form-inputs'>
						<Input value={userState.user.firsName}  type='text' classes='P-pi-20' name='firstName' placeholder={messages[LanguageStorage.getLanguage()]['first_name']} onBlur={(name, value) => {setInfoForm({...infoForm, firstName: value})}}/>
					</div>
					<div className='P-form-inputs'>
						<Input value={userState.user.lastName} type='text' classes='P-pi-20' name='lastName' placeholder={messages[LanguageStorage.getLanguage()]['last_name']} onBlur={(name, value) => {setInfoForm({...infoForm, lastName: value})}}/>
					</div>
					<div className='P-form-inputs'>
						<DatePicker
							defaultValue={new Date(userState.user.dateOfBirth)}
							maxDate={new Date()}
							placeholder={messages[LanguageStorage.getLanguage()]['personal_info_date_of_birth']} onChange={(val) => {
								setInfoForm({...infoForm, dateOfBirth: new Date(val).getTime()})
						}}/>
					</div>
				</div>
				<div className='P-info-btn '>
					<ButtonBase loading={infoLoader} onClick={() => {saveInfo()}} classes='P-btn-bg-ping P-btn-primary'><span className='G-text-md-bold'>{t('save_changes')}</span></ButtonBase>
				</div>
			</div>
			<div className="P-form-section">
				<div className="P-form-title G-mb-35">
					{t('personal_info_change_password')}
				</div>
				<div className="G-flex-wrap">
					<div className='P-form-inputs'>
						<Input  type='password' classes='P-pi-20' name='oldPassword' placeholder={messages[LanguageStorage.getLanguage()]['create_password_current_password']} onBlur={(name, value) => {setPassForm({...passForm, [name]: value})}}/>
					</div>
					<div className='P-form-inputs'>
						<Input type='password' classes='P-pi-20' name='password' placeholder={messages[LanguageStorage.getLanguage()]['create_password_new_password']} onBlur={(name, value) => {setPassForm({...passForm, [name]: value})}}/>
					</div>
					<div className='P-form-inputs'>
						<Input type='password' classes='P-pi-20' name='confirmPassword' placeholder={messages[LanguageStorage.getLanguage()]['create_password_confirm_new_password']} onBlur={(name, value) => {setPassConf(value)}}/>
					</div>
				</div>
				<div className='P-info-btn '>
					<ButtonBase loading={passLoader} onClick={() => {savePassword()}} classes='P-btn-bg-ping P-btn-primary'><span className='G-text-md-bold'>{t('personal_info_change_password')}</span></ButtonBase>
				</div>
			</div>
		</div>
	);
}
