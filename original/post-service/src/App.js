import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import { PackageList } from './component/PackageList';
import { ExpressPackageForm } from './component/ExpressPackageForm';
import { PackageForm } from './component/PackageForm';
import { LetterForm } from './component/LetterForm';

function App() {
	return (
		<>
			<Router>
				<Routes>
						<Route
								exact
								path="/"
								element={<PackageList />}
						/>
						<Route
								exact
								path="/express"
								element={<ExpressPackageForm />}
						/>
						<Route
								exact
								path="/regular"
								element={<PackageForm />}
						/>
						<Route
								exact
								path="/letter"
								element={<LetterForm />}
						/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
