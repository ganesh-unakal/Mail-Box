
import './App.css';
import Login from './components/LoginPage';
import { Route, Redirect, Switch } from 'react-router-dom'
import WelcomePage from './components/WelcomePage';
import ForgetPassword from './components/ForgetPassword';
import ComposeMail from './components/ComposeMail';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { authActions } from './components/store/authentication';
import Inbox from './components/Inbox';
function App() {
  const isLoggedIn = useSelector(state => state.authentication.isAuthenticated)

  return (
    <div>
      <Header />
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login' />
        </Route>


        <Route path='/login'>
          <Login />
        </Route>

        {isLoggedIn && <Route path='/welcome' >
          <WelcomePage />
        </Route>}

        <Route path='/forget'>
          <ForgetPassword />
        </Route>

        {isLoggedIn && <Route path='/compose'>
          <ComposeMail />
        </Route>}

        {isLoggedIn && <Route path='/inbox'>
          <Inbox />
        </Route>}

      </Switch>
    </div>

  );
}

export default App;
