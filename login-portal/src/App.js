import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import {Portal} from './WebApps/portal'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={<Portal />}
					/>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
