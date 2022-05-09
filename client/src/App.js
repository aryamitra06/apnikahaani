import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Viewpost from "./components/Post/Viewpost";
import Home from './components/Home/Home'
import Addpost from "./components/Post/Addpost";
import Auth from "./components/Authentication/Auth";
import '../src/Additional Styles/style.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

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
            <Home/>
          </Route>
          <Route exact path="/add">
            <Addpost/>
          </Route>
          <Route exact path="/view/:id">
            <Viewpost/>
          </Route>
          <Route exact path="/auth">
            <Auth/>
          </Route>
        </Switch>
        <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
      </Router>
      </ThemeProvider>
  );
}

export default App;
