import React, {useState} from "react";
import './styles.scss';

interface IProps {
	images: Array<string>,
}

export function Slider(props:IProps) {

	const [sliderIndex, setSliderIndex] = useState<number>(0);

	const next = () => {
		setSliderIndex(sliderIndex < props.images.length -1 ? sliderIndex+1 : 0)
	}

	const preview = () => {
		setSliderIndex(sliderIndex !== 0 ? sliderIndex-1 : props.images.length - 1)
	}

	return (
    <div className="P-slider-content">
	    {sliderIndex !== 0 && <div className='P-slider-btn P-preview' onClick={() => {preview()}}><i className='icon-ic_back'></i></div>}
	    {sliderIndex !< props.images.length -1 && <div className='P-slider-btn P-next' onClick={() => {next()}}><i className='icon-ic_back'></i></div>}
	    <div className="P-slider" style={{transform: `translateX(-${sliderIndex * 100}%)`}}>
				{
					props.images.map((value, index) => {
						return (
							<div key={index} className="P-slider-item" style={{backgroundImage: `url(${value})`}}></div>
						)
					})
				}
      </div>
    </div>
	);
}
