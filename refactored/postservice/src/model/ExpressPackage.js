import {CommonPackage} from './CommonPackage'

export class ExpressPackage extends CommonPackage{
	constructor(column, price, weight){
		super(column);
		this.required = ['senderName', 'receiverName'];
		this.price = price;
		this.weight = weight;
	}

	getForm(form){
		let extracted = super.getForm(form);
		extracted.weight = parseFloat(extracted.weight);
		extracted.distance = parseFloat(extracted.distance);
		return extracted;
	}

	calculatePrice(distance, weight){
		let category = this.getWeightCategory(weight);
		let normalized = Math.ceil(distance/100.0);
		let price = this.price[category];
		return price*weight*normalized;
	}

	renderPriceOption(){
		let option = [];
		let current = 0.0;
		for(let i in this.weight){
			let category = this.weight[i][0];
			option.push(<option value={category}>{this.price[category]}THB/kg/100kg ({current}kg - {this.weight[i][1]}kg)</option>)
			current = this.weight[i][1];
		}
		return option;
	}
}