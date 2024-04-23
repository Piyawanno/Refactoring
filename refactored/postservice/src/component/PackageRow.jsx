import { PackageOperation } from './PackageOperation';

export function PackageRow({handler, item, callback}){
	return <tr>
		<td>{item.senderName}</td>
		<td>{item.sendDate}</td>
		<td>{item.receiverName}</td>
		<td>{item.receiveDate}</td>
		<td style={{textAlign:'center'}}>{handler.getTypeLabel(item.packageType)}</td>
		<td style={{textAlign:'right'}}>{item.price}</td>
		<td style={{textAlign:'center'}}>{handler.getStatusLabel(item.status)}</td>
		<td style={{textAlign:'center'}}>
			<PackageOperation
				handler={handler}
				pid={item.id}
				status={item.status}
				callback={callback}
			/>
		</td>
	</tr>
}