import config from '../config.json'

import axios from 'axios'

import { Letter } from './Letter';
import { Address } from './Address';

export class DataHandler{
	constructor(){
		
	}

	createLetter(){
		let letter = new Letter(this.model.Package, this.price.LetterPackage, this.enum.EnvelopSize);
		letter.packageType = this.enum.PackageType.LETTER;
		letter.senderAddress = new Address('sender', this.model.Address);
		letter.receiverAddress = new Address('receiver', this.model.Address);
		return letter;
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