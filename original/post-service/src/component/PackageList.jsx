import '../style/Package.css'
import config from '../config.json'

import axios from 'axios'
import { PackageButtonContainer } from './PackageButtonContainer';
import { useEffect, useState} from 'react';

export function PackageList() {
	let [packageList, setPackageList] = useState([]);
	let url = `${config.rootAPI}api/package/get`;
	
	const callAPI = () => {
		axios.get(url).then((response) => {
			console.log(response);
			setPackageList(response.data);
		});
	}

	useEffect(() =>{
		callAPI();
	}, []);

	const changeStatus = (pid, packageType, nextStatus) => {
		return () => {
			axios.post(`${config.rootAPI}api/status/change`, {
				pid, packageType, nextStatus
			}).then(() => {
				callAPI();
			});
		}
	}

	const renderOperation = (pid, pacageType, currentStatus) => {
		if(currentStatus == 1){
			return <>
			<button onClick={changeStatus(pid, pacageType, 2)}>
				Transportation
			</button>
			<button onClick={changeStatus(pid, pacageType, 4)}>
				Cancel
			</button>
			<button onClick={changeStatus(pid, pacageType, 5)}>
				Lost
			</button>
			</>
		}else if(currentStatus == 2){
			return <>
			<button onClick={changeStatus(pid, pacageType, 3)}>
				Receive
			</button>
			<button onClick={changeStatus(pid, pacageType, 4)}>
				Cancel
			</button>
			<button onClick={changeStatus(pid, pacageType, 5)}>
				Lost
			</button>
			</>
		}
	}
	
	const renderType = (packageType) => {
		if(packageType == 1) return 'Express Package';
		else if(packageType == 2) return 'Regular Package';
		else if(packageType == 3) return 'Letter';
	}

	const renderStatus = (pacageType, currentStatus) => {
		let label = '';
		if(currentStatus == 1) label = 'Get Package';
		else if(currentStatus == 2) label = 'On Transportation';
		else if(currentStatus == 3) label = 'To Receiver';
		else if(currentStatus == 4) label = 'Reject';
		else if(currentStatus == 5) label = 'Lost';
		return label;
	};

	const renderTableRow = () => {
		return packageList.map((item) => (
			<tr>
				<td>{item.senderName}</td>
				<td>{item.sendDate}</td>
				<td>{item.receiverName}</td>
				<td>{item.receiveDate}</td>
				<td style={{textAlign:'center'}}>{renderType(item.packageType)}</td>
				<td style={{textAlign:'right'}}>{item.price}</td>
				<td style={{textAlign:'center'}}>{renderStatus(item.packageType, item.currentStatus)}</td>
				<td style={{textAlign:'center'}}>{renderOperation(item.id, item.packageType, item.currentStatus)}</td>
			</tr>
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