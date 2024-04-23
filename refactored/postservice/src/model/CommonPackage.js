import config from '../config.json'
import axios from 'axios'
import {BaseModel} from './BaseModel'

export class CommonPackage extends BaseModel{
	getForm(form){
		let extracted = super.getForm(form);
		extracted.senderAddress = this.senderAddress.getForm(form);
		extracted.receiverAddress = this.receiverAddress.getForm(form);
		extracted.packageType = this.packageType;
		return extracted;
	}

	validate(data, errorMessageList){
		let result = super.validate(data, errorMessageList);
		result = result & this.senderAddress.validate(data.senderAddress, errorMessageList);
		result = result & this.receiverAddress.validate(data.receiverAddress, errorMessageList);
		return result;
	}

	getWeightCategory(weight){
		for(let i in this.weight){
			if(weight < this.weight[i][1]){
				return this.weight[i][0];
			}
		}
		return this.weight[this.weight.length-1][0];
	}

	insert(data, callback){
		axios.post(`${config['rootAPI']}api/package/insert`, data).then(() => {
			callback();
		})
	}
}