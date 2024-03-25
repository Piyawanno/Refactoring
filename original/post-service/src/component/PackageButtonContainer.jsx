import '../style/Package.css'

import { useNavigate  } from "react-router-dom";


export function PackageButtonContainer() {
	const navigate = useNavigate();

	return <div class="PackageButtonContainer">
		<div class="PackageIcon" onClick={() => navigate("/express")}>
			Express Package
		</div>
		<div class="PackageIcon" onClick={() => navigate("/regular")}>
			Regular Package
		</div>
		<div class="PackageIcon" onClick={() => navigate("/letter")}>
			Letter
		</div>
	</div>
}