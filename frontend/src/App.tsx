import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { User } from './models/User';
import * as LogsApi from "./networks/logs_api";
import LogsPageLoggedOutView from './components/LogsPageLoggedOutView';
import Dashboard from './components/Dashboard';
import AddLogModal from './components/AddEditLogModal';
import { LogObject } from './models/Log';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';


function App() {
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
    // <BrowserRouter>
    //   <Link to="/">Dashboard</Link> 
    //   <Routes>
    //     <Route path="/" element={<LogsPageLoggedOutView/>}/>
    //   </Routes>
    // </BrowserRouter>
    <div className={`flex flex-row h-screen p-4`}>
      <div className={`w-full h-full flex justify-center items-center`}>
        {user 
        ? 
          <>
          <NavBar
            user={user}
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
            setUser(user);
          }}
          onSignupSuccessful={(user)=>{
            setUser(user);
            console.log("user: ", user);
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
