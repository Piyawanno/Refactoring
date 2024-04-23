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
	let dataHandler = new DataHandler();
	let [handler, setHandler] = useState({});
	let [isInit, setInit] = useState(false);

	useEffect(() => {
		setHandler(dataHandler);
		dataHandler.initialize().then(() => {
			setInit(true);
			setHandler(dataHandler)
		});
	}, []);

	const renderList = (isInit) => {
		if(isInit) return <PackageList handler={handler}/>
		else return <></>
	}

	const renderExpress = (isInit) => {
		if(isInit) return <ExpressPackageForm handler={handler}/>
		else return <></>
	}

	const renderRegular = (isInit) => {
		if(isInit) return <PackageForm handler={handler}/>
		else return <></>
	}

	const renderLetter = (isInit) => {
		if(isInit) return <LetterForm handler={handler}/>
		else return <></>
	}

	return (
		<>
			<Router>
				<Routes>
						<Route
								exact
								path="/"
								element={renderList(isInit)}
						/>
						<Route
								exact
								path="/express"
								element={renderExpress(isInit)}
						/>
						<Route
								exact
								path="/regular"
								element={renderRegular(isInit)}
						/>
						<Route
								exact
								path="/letter"
								element={renderLetter(isInit)}
						/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
