import '../style/Package.css'

import { useNavigate  } from "react-router-dom";
import { PackageButton} from './PackageButton'

export function PackageButtonContainer() {
	return <div class="PackageButtonContainer">
		<PackageButton label={"Express Package"} path={"/express"} />
		<PackageButton label={"Regular Package"} path={"/regular"} />
		<PackageButton label={"Letter"} path={"/letter"} />
	</div>
}