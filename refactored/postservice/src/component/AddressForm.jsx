import '../style/Package.css'
import '../style/Form.css'

export function AddressForm({parent}){
	return <>
		<p>
			<input type="text" name={parent+"_address"} placeholder="Address" />
		</p>
		<p>
			<input type="text" name={parent+"_district"} placeholder="District" />
		</p>
		<p>
			<input type="text" name={parent+"_province"} placeholder="Province" />
		</p>
		<p>
			<input type="text" name={parent+"_postCode"} placeholder="Post Code" />
		</p>
		<p>
			<input type="text" name={parent+"_telephone"} placeholder="Telephone" />
		</p>
	</>
}