import { toast } from 'react-toastify';
var id;
export function Error(message) {
	id = 1;
	toast.error(message, {
		position: "bottom-right",
		autoClose: 3000,
		onClose: function (props) {id += 1},
		hideProgressBar: false,
		toastId: id,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
}

export function ErrorMultiple(message) {
	toast.error(message, {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
}

export function Success(message) {
	toast.success(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		onClose: function (props) {id += 1},
		toastId: id,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
}

export function Warning(message) {
	toast.warning(message, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		onClose: function (props) {id += 1},
		toastId: id,
		draggable: true,
		progress: undefined,
	});
}
