import {CommonPackage} from './CommonPackage'

export class Letter extends CommonPackage{
	constructor(column, price, envelopSize){
		super(column);
		this.required = ['senderName', 'receiverName'];
		this.price = price;
		this.envelopSize = envelopSize;
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