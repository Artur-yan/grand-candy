import React from "react";
import './styles.scss'
import MapContainer from "../../../components/map/map";
import salesSvg from "../../../assets/svg/fax.svg";
import profileSvg from "../../../assets/img/mapMarker.png";
import t from "../../../i18n/translate";

export function ContactUs () {
	return (
		<div className='P-contact-us G-mb-100'>
			<div className="P-map-content">
				<div className="P-map-info">
					<h1>{t('grand_candy_llc')}</h1>
					<div className='G-pt-5 G-fs-22'><b>{t('head_office')}</b></div>
					<div className='G-mt-32 P-marks G-flex-column'>
						<div className='G-flex  '><i className='icon-ic_location G-fs-18'/><span className='G-pl-30 G-fs-18'>{t('full_address')}</span></div>
						<div className='G-pt-3'><i className='icon-ic_mail G-fs-18'/><span className='G-pl-30 G-fs-18'>info@grandcandy.am</span></div>
					</div>
				</div>
				<div className="P-map-section">
					<MapContainer markers={[{lat:40.20225, lng: 44.545018}]} icon={profileSvg} zoom={18}/>
				</div>
			</div>
			<div className="P-contact-cards">
				<div className="P-contact-card G-flex-vertical-center G-flex-column">
					<div className='P-contact-badge G-flex-align-center'><i className='icon-ic_sales P-icon'></i></div>
					<div className='G-text-center G-padding-65-sides'>
						<div className='G-fs-22'>
							{t('sales_department')}
						</div>
						<div className='P-line'></div>
						<div className='G-pt-3'><i className='icon-ic_mail G-fs-18'/><span className='G-pl-30 G-fs-18'>info@grandcandy.am</span></div>
						<div className='G-mt-19'><i className='icon-ic_phone'/><span className='G-pl-30 G-fs-18'>(+37410) 44 56 63</span></div>
					</div>
				</div>
				<div className="P-contact-card G-flex-vertical-center G-flex-column">
					<div className='P-contact-badge G-flex-align-center'><i className='icon-ic_international P-icon'></i></div>
					<div className='G-text-center G-padding-65-sides'>
						<div className='G-fs-22'>
							{t('international_department')}
						</div>
						<div className='P-line'></div>
						<div className='G-pt-3'><i className='icon-ic_mail G-fs-18'/><span className='G-pl-30 G-fs-18'>commerce@grandcandy.am</span></div>
						<div className='G-mt-19'><i className='icon-ic_phone'/><span className='G-pl-30 G-fs-18'>(+37410) 44 56 33</span></div>
						<div className='G-mt-19'><img src={salesSvg} alt="svg"/><span className='G-pl-30 G-fs-18'>(+37410) 44 99 01</span></div>
					</div>
				</div>
				<div className="P-contact-card G-flex-vertical-center G-flex-column">
					<div className='P-contact-badge G-flex-align-center'><i className='icon-ic_hr P-icon'></i></div>
					<div className='G-text-center G-padding-65-sides'>
						<div className='G-fs-22'>
							{t('human_department')}
						</div>
						<div className='P-line'></div>
						<div className='G-pt-3'><i className='icon-ic_mail G-fs-18'/><span className='G-pl-30 G-fs-18'>staff@grandcandy.am</span></div>
						<div className='G-mt-19'><i className='icon-ic_phone'/><span className='G-pl-30 G-fs-18'>(+37410) 44 63 34</span></div>
					</div>
				</div>
				<div className="P-contact-card G-flex-vertical-center G-flex-column">
					<div className='P-contact-badge G-flex-align-center'><i className='icon-ic_quality P-icon'></i></div>
					<div className='G-fs-22'>
						{t('quality_department')}
						</div>
						<div className='P-line'></div>
						<div className='G-pt-3'><i className='icon-ic_mail G-fs-18'/><span className='G-pl-30 G-fs-18'>quality@grandcandy.am</span></div>
						<div className='G-mt-19'><i className='icon-ic_phone'/><span className='G-pl-30 G-fs-18'>(+37410) 44 44 11</span></div>
				</div>
				<div className="P-contact-card G-flex-vertical-center G-flex-column">
					<div className='P-contact-badge G-flex-align-center'><i className='icon-ic_export P-icon'></i></div>
					<div className='G-fs-22'>
						{t('export_department')}
						</div>
						<div className='P-line'></div>
						<div className='G-pt-3'><i className='icon-ic_mail G-fs-18'/><span className='G-pl-30 G-fs-18'>export@grandcandy.am</span></div>
						<div className='G-mt-19'><i className='icon-ic_phone'/><span className='G-pl-30 G-fs-18'>(+37410) 44 63 07</span></div>
				</div>
			</div>
		</div>
	);
}
