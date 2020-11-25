import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const List = React.lazy(() => import('./pages/List/List'));
const Header = React.lazy(() => import('./shared/components/Header/Header'));

function App() {
	return (
		<React.Fragment>
			<Suspense
				fallback={
					<div className="center" style={{ height: '100vh' }}>
						<LoadingSpinner />
					</div>
				}
			>
				<Header />
				<Switch>
					<Route exact path="/" component={List} />
					<Redirect to="/" />
				</Switch>
			</Suspense>
		</React.Fragment>
	);
}
export default App;
