import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'

function App() {
  return (
    <Router>
      <div> 
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
      
          <Route exact path="/about">

          </Route>
          <Route exact path="/dashboard">

          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
