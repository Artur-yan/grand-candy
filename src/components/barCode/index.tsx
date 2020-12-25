import React from 'react';
import { useBarcode } from '@createnextapp/react-barcode';

interface IProps {
	value: string
}

export function BarCode(props: IProps) {
	
	const {inputRef} = useBarcode({
		value: props.value,
		options: {
			displayValue: true,
			background: '#ffffff',
		}
	});
	return (
		<img ref={inputRef}/>
	)
}
