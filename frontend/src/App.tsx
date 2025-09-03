import { useEffect, useState } from 'react';
import './App.css';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from "./components/SignUpModal";
import { User } from './models/User';
import * as LogsApi from "./networks/logs_api";
import LogsPageLoggedOutView from './components/LogsPageLoggedOutView';
import Dashboard from './components/Dashboard';
import AddLogModal from './components/AddEditLogModal';
import { LogObject } from './models/Log';
import moment from "moment";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User|null>(null);
  const [showAddLog, setShowAddLog] = useState(false);
  const [logs, setLogs] = useState<LogObject[]>([]);


  useEffect(() => {
    async function getAuthenticatedUser() {
      try{
        const user = await LogsApi.getLoggedInUser();
        setUser(user);
        const logs = await LogsApi.getLogs();
        setLogs(logs);
      } catch (error) {
        console.error(error);
      }
    }
    getAuthenticatedUser();
  }, []);

  return (
    <div className={`flex flex-row h-screen p-4`}>
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
      <div className={`w-full h-full flex justify-center items-center`}>
        {user 
        ? 
        <>
          <NavBar
            user={user}
            onLoginClicked={() => {setShowLogin(true)}}
            onSignUpClicked={() => {setShowSignUp(true)}}
            onLogoutSuccessful={() => {setUser(null)}}
            onAddClicked={() => {setShowAddLog(true)}}
          />
          <Dashboard
              logs = {logs}
            />
        </>
        : 
            <LogsPageLoggedOutView
            onLoginSuccessful={(user) => {
              setShowLogin(false);
              setUser(user);
            }}
            
            />
        }
      </div>
      {showAddLog &&
            <AddLogModal
            onDismiss={() => setShowAddLog(false)}
            onLogSaved={(newLogs) => {
                setLogs([...logs, newLogs]);
                setShowAddLog(false);
            }}
            logToEdit={null}
            />
        }
    </div>
  );
}

export default App;
