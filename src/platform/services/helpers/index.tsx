import React, {Component} from 'react';
import Moment from 'react-moment';
import {MeasurementEnum} from "../../enums/measurement";
import {IBasket} from "../../interfaces/basket";
import {IProductModel} from "../../api/products/res/product-model";

interface IMomentProps {
	milliSec: number
	isSeconds?: boolean
}

export function SelfToLocalString(number: number) {
	return number.toLocaleString(undefined, { maximumFractionDigits: 4 })
}

export function MomentDate(props: IMomentProps) {
		return (
			<Moment format="D MMM YYYY">
				{new Date(props.milliSec * 1000)}
		  </Moment>
	 );
}

export function MomentTime(props: IMomentProps) {
	return (
		<Moment format="HH:mm">
			{new Date(props.milliSec)}
		</Moment>
	);
}

export function MomentTimeMilliSec(props: IMomentProps) {
	return (
		<Moment format="HH:mm">
			{new Date(props.milliSec * 1000)}
		</Moment>
	);
}

export function MomentDateMilliSec(props: IMomentProps) {
		return (
			<Moment format="D MMM YYYY">
				{new Date(props.milliSec)}
		  </Moment>
	 );
}

export function MomentDateTimeMilliSec(props: IMomentProps) {
	return (
		<Moment format="D MMM HH:mm">
			{new Date(props.milliSec)}
		</Moment>
	);
}

interface IProps {
	children: React.ReactNode;
	className?: string;
	onClickOutside?(e: MouseEvent): void;
};

export class ClickOutside extends Component<IProps, any> {

	private container = React.createRef<HTMLDivElement>();

	public componentDidMount() { document.addEventListener('click', this.handle, true); }
	public componentWillUnmount() {
		document.removeEventListener('click', this.handle, true);
	};

	private handle = (e: MouseEvent) => {
		const { onClickOutside } = this.props;
		if (this.container.current && !this.container.current.contains(e.target as HTMLElement) && onClickOutside) {
			onClickOutside(e);
		}
	};

	public render() {
		const { children, onClickOutside, ...props } = this.props;
		return <div {...props} ref={this.container}>{children}</div>;
	}
}

export function checkBasketDuplications(basketState: IBasket, item: IProductModel) {

	let basket = [...basketState.basket];
	const index = basket.findIndex(x => x.item.id === item.id);
	const isKg = item.measurementEnumValue === MeasurementEnum.kg;

	if (index === -1) {
		basket.push({ item:item, count: isKg ? 1 : 5 });
	} else {
		basket[index].count++;
	}

	return basket;
}

export function toFixedNumber(p) {

	if (Number.isInteger(p)) {
		return p;
	}
	return parseFloat( p.toFixed(2) );
}


