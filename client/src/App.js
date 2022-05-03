import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Viewpost from "./components/Viewpost";
import Editpost from "./components/Editpost";
import Addpost from "./components/Addpost";
import Auth from "./components/Auth";
import '../src/Additional Styles/style.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar />
        <Switch>
        <Route exact path="/">
            <Home />
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
      </ThemeProvider>
  );
}

export default App;
