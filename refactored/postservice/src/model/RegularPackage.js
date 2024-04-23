import {BaseModel} from './BaseModel'
import {Letter} from './Letter'

export class RegularPackage extends Letter {
	constructor(column, price, weight){
		super(column);
		this.required = ['senderName', 'receiverName'];
		this.price = price;
		this.weight = weight;
	}

	getForm(form){
		let extracted = super.getForm(form);
		extracted.weight = parseFloat(extracted.weight);
		return extracted;
	}

	calculatePrice(weight){
		let category = this.getWeightCategory(weight);
		let price = this.price[category];
		console.log(weight, price);
		return price*weight;
	}

	renderPriceOption(){
		let option = [];
		let current = 0.0;
		for(let i in this.weight){
			let category = this.weight[i][0];
			option.push(<option value={category}>{this.price[category]}THB/kg ({current}kg - {this.weight[i][1]}kg)</option>)
			current = this.weight[i][1];
		}
		return option;
	}
}