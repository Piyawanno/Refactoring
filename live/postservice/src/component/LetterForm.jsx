import '../style/Package.css'
import '../style/Form.css'
import config from '../config.json'

import { useState, useEffect } from 'react';
import { useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'
import parse from 'html-react-parser';

export function LetterForm({handler}) {
	const navigate = useNavigate();
	let [price, setPrice] = useState(2.0);
	let [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const changePackage = (event) => {
		let packageCategory = parseInt(event.target.value);
		calculatePrice(packageCategory);
		return true;
	}

	const calculatePrice = (packageCategory) => {
		if(packageCategory == 6){
			setPrice(2.0);
		}else if(packageCategory == 7){
			setPrice(4.0);
		}else if(packageCategory == 8){
			setPrice(10.0);
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
			await axios.post(`${config['rootAPI']}api/letter/insert`, data);
			navigate('/');
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
					<h2>Letter Size</h2>
					<p>
						<select name="packageCategory" {...register("packageCategory")} onChange={changePackage}>
							<option value="6">US Letter (2THB)</option>
							<option value="7">A5 (4THB)</option>
							<option value="8">A4 (10THB)</option>
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