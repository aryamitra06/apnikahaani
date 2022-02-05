import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/About";
import './Style.css'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;
