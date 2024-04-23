import '../style/Package.css'
import config from '../config.json'

import axios from 'axios'
import { PackageButtonContainer } from './PackageButtonContainer';
import { PackageRow } from './PackageRow';
import { useEffect, useState} from 'react';

export function PackageList({handler}) {
	let [packageList, setPackageList] = useState([]);

	let callAPI = () => {handler.getPackageList(setPackageList)};
	useEffect(() => {callAPI()}, []);
	
	const renderTableRow = () => {
		return packageList.map((item) => (
			<PackageRow handler={handler} item={item} callback={callAPI}/>
		));
	}
	
	return (
		<>
			<PackageButtonContainer />
			<h1>List of Registered Package</h1>
			<table class="PackageTable">
				<thead>
					<tr>
						<th>Sender</th>
						<th>Send Date</th>
						<th>Receiver</th>
						<th>Receive Date</th>
						<th>Type</th>
						<th>Fee [THB]</th>
						<th>Status</th>
						<th>Operation</th>
					</tr>
				</thead>
				<tbody>{renderTableRow()}</tbody>
			</table>
		</>
	)
}