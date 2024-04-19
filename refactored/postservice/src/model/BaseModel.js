export class BaseModel{
	constructor(column){
		this.column = column;
		this.required = [];
	}

	getForm(form){
		let extracted = {};
		for(let i of this.column){
			if(form[i]){
				extracted[i] = form[i].value;
			}
		}
		console.log(extracted);
		return extracted;
	}

	validate(data, errorMessageList){
		let result = true;
		for(let i of this.required){
			let value = data[i];
			if(!value || value.length === 0){
				result = false;
				errorMessageList.push(`${i} is not allowed to be empty.`);
			}
		}
		return result;
	}
}