import config from '../config.json'
import axios from 'axios'

export class DataHandler{
	constructor(){
		
	}

	async initialize(){
		await this.initializeEnum();
		await this.initializeModel();
		await this.initializePrice();
	}

	async initializeEnum(){
		let response = await axios.get(`${config.rootAPI}api/enum/get`);
		this.enum = response.data;
	}

	async initializeModel(){
		let response = await axios.get(`${config.rootAPI}api/model/get`);
		this.model = response.data;
	}

	async initializePrice(){
		let response = await axios.get(`${config.rootAPI}api/price/get`);
		this.price = response.data;
	}


}