import '../style/Package.css'
import '../style/Form.css'
import config from '../config.json'

import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios'
import parse from 'html-react-parser';

import { AddressForm } from './AddressForm';

export function LetterForm({handler}) {
	const navigate = useNavigate();

	let [price, setPrice] = useState(2.0);
	let [errorMessage, setErrorMessage] = useState("");
	let letter = handler.createLetter();

	const changePackage = (event) => {
		let packageCategory = parseInt(event.target.value);
		setPrice(letter.calculatePrice(packageCategory));
		return true;
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let errorMessageList = [];
		let data = letter.getForm(event.target);
		if(letter.validate(data, errorMessageList)){
			letter.insert(data, () => {navigate('/')})
		}else{
			let message = `<p>${errorMessageList.join("</p><p>")}</p>`
			setErrorMessage(message);
		}
	}

	return (
	<>
		<h1>Add Letter</h1>
		<div class="ErrorMessage">
			{parse(errorMessage)}
		</div>
		<form onSubmit={handleSubmit}>
			<div class="FormContainer">
				<div class="FormGroup">
					<h2>Sender</h2>
					<p>
						<input type="text" name="senderName"  placeholder="Name" />
					</p>
					<AddressForm parent={"sender"}/>
				</div>
				<div class="FormGroup">
					<h2>Receiver</h2>
					<p>
						<input type="text" name="receiverName" placeholder="Name" />
					</p>
					<AddressForm parent={"receiver"}/>
				</div>
				<div class="FormGroup">
					<h2>Letter Size</h2>
					<p>
						<select name="packageCategory" onChange={changePackage}>
							{letter.renderPriceOption()}
						</select>
					</p>
					<p>
						<input type="text" name="price" placeholder="Price" value={price + "THB"} disabled/>
					</p>
				</div>
			</div>
			<p>
				<input type="submit"></input>
			</p>
		</form>
	</>
	)
}