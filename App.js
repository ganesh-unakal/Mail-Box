
import './App.css';
import Login from './components/LoginPage';
import { Route, Redirect } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import ForgetPassword from './components/ForgetPassword';


function App() {
  return (
   <div>  
    
    <Route path='/' exact>
      <Redirect to='/login'/>
    </Route>


    <Route path ='/login'>
      <Login />
    </Route>

    <Route path='/welcome' >
      <WelcomePage />
    </Route>

   <Route path='/forget'>
    <ForgetPassword />
   </Route>
      
    

   </div>

  );
}

export default App;
