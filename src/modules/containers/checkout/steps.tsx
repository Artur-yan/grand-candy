import React, {useContext, useEffect, useState} from "react";
import './style.scss';
import t from "../../../i18n/translate";

export function Steps ({steps}) {

	const coverLength = [0, 50, 100];
	const detectorClass = ['P-step-detector-one', 'P-step-detector-two', 'P-step-detector-three'];

	return (
		<div className='P-checkout'>
			<div className='P-steps-header'>
				<div className={`P-content ${detectorClass[steps - 1]}`}>
					<div className='P-steps-line'></div>
					<div className='P-steps-line-cover' style={{width: `${coverLength[steps - 1]}%`}}></div>
					<div className="P-step-point P-step-one"><span>1</span> <div className='P-step-text'>{t('basket_title')}</div></div>
					<div className="P-step-point P-step-two"><span>2</span> <div className='P-step-text'>{t('delivery_option')}</div></div>
					<div className="P-step-point P-step-three"><span>3</span> <div className='P-step-text'>{t('payment_option')}</div></div>
				</div>
			</div>
		</div>
	);
}
