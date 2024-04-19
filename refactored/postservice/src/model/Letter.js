import {BaseModel} from './BaseModel'

export class Letter extends BaseModel {
	constructor(column, price, envelopSize){
		super(column);
		this.required = ['senderName', 'receiverName'];
		this.price = price;
		this.envelopSize = envelopSize;
	}

	getForm(form){
		console.log(form);
		let extracted = super.getForm(form);
		console.log(extracted);
		extracted.senderAddress = this.senderAddress.getForm(form);
		extracted.receiverAddress = this.receiverAddress.getForm(form);
		return extracted;
	}

	validate(data, errorMessageList){
		let result = super.validate(data, errorMessageList);
		result = result & this.senderAddress.validate(data.senderAddress, errorMessageList);
		result = result & this.receiverAddress.validate(data.receiverAddress, errorMessageList);
		return result;
	}

	calculatePrice(size){
		return this.price[size];
	}

	renderPriceOption(){
		return Object.keys(this.envelopSize).map((item, index) => (
			<option value={this.envelopSize[item]}>{item} - {this.price[this.envelopSize[item]]}THB</option>
		))
	}
}