import '../style/Package.css'
import '../style/Form.css'
import config from '../config.json'

import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import parse from 'html-react-parser';

export function PackageForm() {
	const navigate = useNavigate();
	let [packageCategory, setCategory] = useState(0);
	let [price, setPrice] = useState(0.0);
	let [weight, setWeight] = useState(0.0);
	let [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	useEffect(() => {
		calculatePrice();
	}, [weight]);


	const changeWeight = (event) => {
		setWeight(parseInt(event.target.value));
	}

	const calculatePrice = () => {
		if(weight < 5){
			setCategory(1);
			setPrice(weight*0.2);
		}else if(weight >= 5 && weight < 10){
			setCategory(2);
			setPrice(weight*0.25);
		}else if(weight >= 10 && weight < 15){
			setCategory(3);
			setPrice(weight*0.30);
		}else if(weight >= 15 && weight < 20){
			setCategory(4);
			setPrice(weight*0.35);
		}else if(weight >= 20){
			setCategory(5);
			setPrice(weight*0.40);
		}
	}

	const validate = (data, errorMessageList) => {
		let result = true;
		for(let i in data){
			let value = data[i];
			if(i == 'price' || i == 'packageCategory') continue;
			if(!value || value.length === 0){
				result = false;
				errorMessageList.push(`${i} is not allowed to be empty.`);
				console.log(i, value);
			}
		}
		return result;
	}

	const callAPI = async (data) => {
		setErrorMessage("");
		let errorMessageList = [];
		if(validate(data, errorMessageList)){
			await axios.post(`${config['rootAPI']}api/regular/insert`, data);
			navigate('/');
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
		<form onSubmit={handleSubmit(callAPI)}>
			<div class="FormContainer">
				<div class="FormGroup">
					<h2>Sender</h2>
					<p>
						<input type="text" name="senderName"  {...register("senderName")}  placeholder="Name" />
					</p>
					<p>
						<input type="text" name="senderAddress" {...register("senderAddress")} placeholder="Address" />
					</p>
					<p>
						<input type="text" name="senderDistrict" {...register("senderDistrict")} placeholder="District" />
					</p>
					<p>
						<input type="text" name="senderProvince" {...register("senderProvince")} placeholder="Province" />
					</p>
					<p>
						<input type="text" name="senderPostCode" {...register("senderPostCode")} placeholder="Post Code" />
					</p>
					<p>
						<input type="text" name="senderTelephone" {...register("senderTelephone")} placeholder="Telephone" />
					</p>
				</div>
				<div class="FormGroup">
					<h2>Receiver</h2>
					<p>
						<input type="text" name="receiverName" {...register("receiverName")} placeholder="Name" />
					</p>
					<p>
						<input type="text" name="receiverAddress" {...register("receiverAddress")} placeholder="Address" />
					</p>
					<p>
						<input type="text" name="receiverDistrict" {...register("receiverDistrict")} placeholder="District" />
					</p>
					<p>
						<input type="text" name="receiverProvince" {...register("receiverProvince")} placeholder="Province" />
					</p>
					<p>
						<input type="text" name="receiverPostCode" {...register("receiverPostCode")} placeholder="Post Code" />
					</p>
					<p>
						<input type="text" name="receiverTelephone" {...register("receiverTelephone")} placeholder="Telephone" />
					</p>
				</div>
				<div class="FormGroup">
					<h2>Package</h2>
					<p>
						<input type="text" name="packageWeight" {...register("packageWeight")} placeholder="Weight" onChange={changeWeight}/>
					</p>
					<p>
						<select name="packageCategory" {...register("packageCategory")} disabled value={packageCategory}>
							<option value="1"> 0kg -  5kg (0.20THB/kg/100km)</option>
							<option value="2"> 5kg - 10kg (0.25THB/kg/100km)</option>
							<option value="3">10kg - 15kg (0.30THB/kg/100km)</option>
							<option value="4">15kg - 20kg (0.35THB/kg/100km)</option>
							<option value="5">More than 20kg (0.40THB/kg/100km)</option>
						</select>
					</p>
					<p>
						<input type="text" name="price" {...register("price")} placeholder="Price" value={price + "THB"} disabled/>
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