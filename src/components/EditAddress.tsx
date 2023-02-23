import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import Pen from './edit.png';
import Popup from 'reactjs-popup';
import { Account } from '../types/types';

interface IEditAddressProps {
	account: Account,
	setAccount: Dispatch<SetStateAction<Account | null>>
}

const EditAddress = ({account, setAccount}: IEditAddressProps) => {
	const [open, setOpen] = useState(false);
	const closePop = () => setOpen(false);
	const addressRef = useRef<HTMLInputElement>(null);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
    const addr = addressRef.current? addressRef.current.value : '';
		const temp = account;
    if(temp) {
      temp.address = addr;
      setAccount(temp);
			setShowSuccess(true);
    }
	}

  return (
    <>
			<img onClick={() => setOpen(true)} className='icon' src={Pen} alt='pen icon' />
			<Popup
				modal nested
				open={open}
				closeOnDocumentClick
				onClose={closePop}
			>
				<div className='address-form'>
					<input className='input-addr' type="text" ref={addressRef}  />
					<button className='btn btn-addr' type='submit' onClick={handleSubmit}>Submit</button>
				</div>
				{showSuccess && <div className='update-msg'>The address has been updated.</div>}
			</Popup>
		</>
  )
}

export default EditAddress