import {BaseModel} from './BaseModel'

export class Address extends BaseModel{
	constructor(parent, column){
		super(column);
		this.parent = parent;
		this.required = column;
	}

	getForm(form){
		let extracted = {};
		for(let i of this.column){
			let name = this.parent + "_" + i;
			if(form[name]){
				extracted[i] = form[name].value;
			}
		}
		return extracted;
	}
}