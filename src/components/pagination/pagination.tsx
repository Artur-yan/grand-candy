import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import './styles.scss';

interface IProps {
	page: number,
	count:number
	onChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

export function PaginationUi(props:IProps) {

	return (
    <div className="P-pagination">
	    <Pagination
		    page={props.page}
		    hidePrevButton={props.page === 1}
		    showFirstButton={false}
		    count={props.count}
		    onChange={props.onChange}
		    size="large"
				className={`P-p-btn ${props.page !== 1 && 'P-prev-btn'} `}
	    />
    </div>
	);
}
