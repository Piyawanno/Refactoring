import '../style/Package.css'
import '../style/Form.css'

import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import { AddressForm } from './AddressForm';
import parse from 'html-react-parser';

export function PackageForm({handler}) {
	const navigate = useNavigate();
	let [packageCategory, setCategory] = useState(0);
	let [price, setPrice] = useState(0.0);
	let [weight, setWeight] = useState(0.0);
	let [errorMessage, setErrorMessage] = useState("");	
	let regular = handler.createRegularPackage();

	useEffect(() => {
		calculatePrice();
	}, [weight]);


	const changeWeight = (event) => {
		setWeight(parseFloat(event.target.value));
	}

	const calculatePrice = () => {
		setCategory(regular.getWeightCategory(weight));
		setPrice(regular.calculatePrice(weight));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let errorMessageList = [];
		let data = regular.getForm(event.target);
		if(regular.validate(data, errorMessageList)){
			regular.insert(data, () => {navigate('/')});
		}else{
			let message = `<p>${errorMessageList.join("</p><p>")}</p>`
			setErrorMessage(message);
		}
	}

	return (
	<>
		<h1>Add Package</h1>
		<div class="ErrorMessage">
			{parse(errorMessage)}
		</div>
		<form onSubmit={handleSubmit}>
			<div class="FormContainer">
				<div class="FormGroup">
					<h2>Sender</h2>
					<p>
						<input type="text" name="senderName"   placeholder="Name" />
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
					<h2>Package</h2>
					<p>
						<input type="text" name="weight" placeholder="Weight" onChange={changeWeight}/>
					</p>
					<p>
						<select name="packageCategory" disabled value={packageCategory}>
							{regular.renderPriceOption()}
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