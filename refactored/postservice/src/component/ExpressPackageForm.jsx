import '../style/Package.css'
import '../style/Form.css'
import config from '../config.json'

import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AddressForm } from './AddressForm';
import axios from 'axios'
import parse from 'html-react-parser';

export function ExpressPackageForm({handler}) {
	const navigate = useNavigate();
	let [packageCategory, setCategory] = useState(0);
	let [price, setPrice] = useState(0.0);
	let [distance, setDistance] = useState(0.0);
	let [weight, setWeight] = useState(0.0);
	let [errorMessage, setErrorMessage] = useState("");

	let express = handler.createExpressPackage();

	useEffect(() => {
		calculatePrice();
	}, [distance, weight]);

	const changeDistance = (event) => {
		setDistance(parseInt(event.target.value));
	}

	const changeWeight = (event) => {
		setWeight(parseInt(event.target.value));
	}

	const calculatePrice = () => {
		setCategory(express.getWeightCategory(weight));
		setPrice(express.calculatePrice(distance, weight));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let errorMessageList = [];
		let data = express.getForm(event.target);
		if(express.validate(data, errorMessageList)){
			express.insert(data, () => {navigate('/')})
		}else{
			let message = `<p>${errorMessageList.join("</p><p>")}</p>`
			setErrorMessage(message);
		}
	}

	return (
	<>
		<h1>Add Express Package</h1>
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
					<p>
						<input type="text" name="distance" placeholder="Distance" onChange={changeDistance}/> km
					</p>
				</div>
				<div class="FormGroup">
					<h2>Package</h2>
					<p>
						<input type="text" name="weight" placeholder="Weight" onChange={changeWeight}/>
					</p>
					<p>
						<select name="packageCategory" disabled value={packageCategory}>
							{express.renderPriceOption()}
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