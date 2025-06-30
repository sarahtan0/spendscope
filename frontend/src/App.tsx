import React, { useEffect, useState } from 'react';
import './App.css';
import {LogObject} from "./models/log";
import Log from "./components/Log";
import { Stack } from 'react-bootstrap';
import * as LogsApi from "./networks/logs_api";

function App() {
  const [logs, setLogs] = useState<LogObject[]>([]);
  useEffect(() => {
    async function getLogs(){
      const logs = await LogsApi.getLogs();
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
              deleteClicked={() => LogsApi.deleteLog(log._id)}
            />
          )
        )}
      </Stack>
    </>
  );
}

export default App;
