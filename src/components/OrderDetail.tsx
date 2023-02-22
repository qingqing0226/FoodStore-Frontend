import React, { useState } from "react";
import { Order } from "../types/types";
import Popup from 'reactjs-popup';
import './OrderDetail.css';

interface IOrderDetailProps {
  order: Order;
}

const OrderDetail = ({ order }: IOrderDetailProps) => {
	const [open, setOpen] = useState(false);
	const closePop = () => setOpen(false);

  return <div className="popup-container">
		<div onClick={() => setOpen(true)} className='orderid'>{order.id}</div>
		<Popup
			arrow={false}
			modal nested
			open={open}
			closeOnDocumentClick
			onClose={closePop}
		>
			<div className='order-container'>
				<div className='order-header'>
					<div className='popup-heading'>Order Details</div>
					<button className='close-btn' onClick={closePop}>X</button>
				</div>
				<table className="orderdetail-table">
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>
					{order.items.map(item => <tr key={item.id}>
						<td>{item.product.name}</td>
						<td>{item.product.price}</td>
						<td>{item.amount}</td>
					</tr>)}
				</table>
			</div>
		</Popup>
	</div>;
};

export default OrderDetail;
