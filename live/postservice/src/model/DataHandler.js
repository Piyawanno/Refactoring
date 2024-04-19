import config from '../config.json'
import axios from 'axios'

export class DataHandler{
	constructor(){
		
	}

	async initialize(){
		console.log('called');
		let response = await axios.get(`${config.rootAPI}api/enum/get`);
		this.enum = response.data;
	}
}