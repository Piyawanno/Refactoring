import config from '../config.json'
import axios from 'axios'

import { Letter } from './Letter';
import { ExpressPackage } from './ExpressPackage';
import { Address } from './Address';
import { RegularPackage } from './RegularPackage';

export class DataHandler{
	constructor(){
		this.label = {};
		this.enum = {};
	}

	createLetter(){
		let letter = new Letter(this.model.Package, this.price.LetterPackage, this.enum.EnvelopSize);
		letter.packageType = this.enum.PackageType.LETTER;
		letter.senderAddress = new Address('sender', this.model.Address);
		letter.receiverAddress = new Address('receiver', this.model.Address);
		return letter;
	}

	createExpressPackage(){
		let column = [];
		if(this.model.Package){
			column = this.model.Package.concat(this.model.ExpressPackageExtension);
		}
		let express = new ExpressPackage(column, this.price.ExpressPackage, this.weight);
		express.packageType = this.enum.PackageType.EXPRESS_PACKAGE;
		express.senderAddress = new Address('sender', this.model.Address);
		express.receiverAddress = new Address('receiver', this.model.Address);
		return express;
	}

	createRegularPackage(){
		let column = [];
		if(this.model.Package){
			column = this.model.Package.concat(this.model.RegularPackageExtension);
		}
		let regular = new RegularPackage(column, this.price.RegularPackage, this.weight);
		regular.packageType = this.enum.PackageType.PACKAGE;
		regular.senderAddress = new Address('sender', this.model.Address);
		regular.receiverAddress = new Address('receiver', this.model.Address);
		return regular;
	}

	getStatusLabel(status){
		return this.label.PackageStatus[status];
	}

	getTypeLabel(type){
		return this.label.PackageType[type];
	}

	changeStatus(pid, status, callback){
		console.log(pid, status);
		axios.post(`${config.rootAPI}api/status/change`, {
			pid, status,
		}).then(() => {
			callback();
		});
	}

	getPackageList(callback){
		axios.get(`${config.rootAPI}api/package/get`).then((response) => {
			callback(response.data);
		});
	}

	async initialize(){
		await this.initializeEnum();
		await this.initializeWeight();
		await this.initializeModel();
		await this.initializePrice();
	}

	async initializeEnum(){
		let response = await axios.get(`${config.rootAPI}api/enum/get`);
		this.enum = response.data;
		for(let name in this.enum){
			this.label[name] = {}
			let mapped = this.enum[name];
			for(let i in mapped){
				this.label[name][mapped[i]] = i;
			}
		}
	}

	async initializeModel(){
		let response = await axios.get(`${config.rootAPI}api/model/get`);
		this.model = response.data;
	}

	async initializePrice(){
		let response = await axios.get(`${config.rootAPI}api/price/get`);
		this.price = response.data;
	}

	async initializeWeight(){
		let response = await axios.get(`${config.rootAPI}api/weight/get`);
		this.weight = response.data;
	}
}