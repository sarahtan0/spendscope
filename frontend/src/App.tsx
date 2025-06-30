import React, { useEffect, useState } from 'react';
import './App.css';
import {LogObject} from "./models/log";
import Log from "./components/Log";
import { Button, Stack } from 'react-bootstrap';
import * as LogsApi from "./networks/logs_api";
import AddLogModal from "./components/AddEditLogModal";

function App() {
  const [logs, setLogs] = useState<LogObject[]>([]);
  const [showAddLog, setShowAddLog] = useState(false);

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
              deleteClicked={() => {
                LogsApi.deleteLog(log._id);
                setLogs(logs.filter(existingLog => existingLog._id !== log._id));
              }}
            />
          )
        )}
      </Stack>
      <Button onClick={() => setShowAddLog(true)}>ADD</Button>

      {showAddLog &&
        <AddLogModal
          onDismiss={() => setShowAddLog(false)}
          onLogSaved={(newLogs) => {
            setLogs([...logs, newLogs])
            setShowAddLog(false);
          }}
        />
      }
    </>
  );
}

export default App;
