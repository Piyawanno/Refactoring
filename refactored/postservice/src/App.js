import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import { DataHandler } from './model/DataHandler';

import { PackageList } from './component/PackageList';
import { ExpressPackageForm } from './component/ExpressPackageForm';
import { PackageForm } from './component/PackageForm';
import { LetterForm } from './component/LetterForm';
import { useEffect, useState } from 'react';

function App() {
	let [handler, setHandler] = useState({});

	useEffect(() => {
		let dataHandler = new DataHandler();
		dataHandler.initialize().then(() => {
			setHandler(dataHandler)
		});
	}, []);

	return (
		<>
			<Router>
				<Routes>
						<Route
								exact
								path="/"
								element={<PackageList handler={handler}/>}
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
								element={<LetterForm handler={handler}/>}
						/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
