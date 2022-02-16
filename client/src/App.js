import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/About";
import './Style.css'
import Home from "./components/Home";
import Viewpost from "./components/Viewpost";
import Editpost from "./components/Editpost";
import Addpost from "./components/Addpost";
import Auth from "./components/Auth";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/add">
            <Addpost/>
          </Route>
          <Route exact path="/view/:id">
            <Viewpost/>
          </Route>
          <Route exact path="/edit/:id">
            <Editpost/>
          </Route>
          <Route exact path="/auth">
            <Auth/>
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;
