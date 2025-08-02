import { useEffect, useState } from 'react';
import './App.css';
import LoginModal from './components/LoginModal';
import LogsPageLoggedInView from './components/LogsPageLoggedInView';
import NavBar from './components/NavBar';
import SignUpModal from "./components/SignUpModal";
import { User } from './models/User';
import * as LogsApi from "./networks/logs_api";
import LogsPageLoggedOutView from './components/LogsPageLoggedOutView';
import Dashboard from './components/Dashboard';
import { Card } from 'react-bootstrap';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    async function getAuthenticatedUser() {
      try{
        const user = await LogsApi.getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    getAuthenticatedUser();
  }, []);

  return (
    <>
      <NavBar
        user={user}
        onLoginClicked={() => {setShowLogin(true)}}
        onSignUpClicked={() => {setShowSignUp(true)}}
        onLogoutSuccessful={() => {setUser(null)}}
        />
      {showSignUp && 
        <SignUpModal
          onDismiss={() => {setShowSignUp(false)}}
          onSignUpSuccessful={(user) => {
            setShowSignUp(false);
            setUser(user);
          }}
        />
      }
      {showLogin && 
        <LoginModal
          onDismiss={() => {
            setShowLogin(false);
          }}
          onLoginSuccessful={(user) => {
            setShowLogin(false);
            setUser(user);
          }}
        />
      }
      {user 
      ? <Dashboard/>
      : <LogsPageLoggedOutView/>
      }
      

    </>
  );
}

export default App;
