import '../style/Package.css'

import { useNavigate  } from "react-router-dom";

export function PackageButton({label, path}) {
	const navigate = useNavigate();
	return <div class="PackageIcon" onClick={() => navigate(path)}>
		{label}
	</div>
}