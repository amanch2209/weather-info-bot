import './App.css';
import Portal from './Web Apps/portal'
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={<Portal />}
					/>
				</Routes>
			</BrowserRouter>
		</>
    </div>
  );
}

export default App;
