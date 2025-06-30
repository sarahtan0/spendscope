import React, { useEffect, useState } from 'react';
import './App.css';
import {LogObject} from "./models/log";
import Log from "./components/Log";
import { Stack } from 'react-bootstrap';
import styleUtils from "./styles/utils.module.css"

function App() {
  const [logs, setLogs] = useState<LogObject[]>([]);
  useEffect(() => {
    async function getLogs(){
      console.log(process.env.REACT_APP_BACKEND_URL!);
      const response = await fetch(process.env.REACT_APP_BACKEND_URL! + "/logs", {method: 'GET'});
      const logs = await response.json()
      setLogs(logs);
    }

    getLogs();
    
  }, [])
  return (
    <>
      <Stack gap={3}>
        {logs.map(log => (
            <Log 
              log={log}
            />
          )
        )}
      </Stack>
    </>
  );
}

export default App;
