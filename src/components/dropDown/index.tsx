import React from 'react';
import './styles.scss'

interface IProps {
	show: boolean
	children: JSX.Element
}

export function DropDown(props: IProps) {

	return (
		<div className="P-dropdown-content" style={{
			display: props.show ? 'block' : 'none',
		}}>
			{props.children}
		</div>
	)
}
