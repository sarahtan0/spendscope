import React, { useEffect, useState } from 'react';
import './App.css';
import {LogObject} from "./models/Log";
import Log from "./components/Log";
import { Button, Spinner, Stack } from 'react-bootstrap';
import * as LogsApi from "./networks/logs_api";
import AddLogModal from "./components/AddEditLogModal";

function App() {
  const [logs, setLogs] = useState<LogObject[]>([]);
  const [showAddLog, setShowAddLog] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState<LogObject|null>(null);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [errorLoadingLogs, setErrorLoadingLogs] = useState(false);

  useEffect(() => {
    async function getLogs(){
      try{
        setErrorLoadingLogs(false);
        setLoadingLogs(true);
        const logs = await LogsApi.getLogs();
        setLoadingLogs(false);
        setLogs(logs);
      } catch (error) {
        console.error(error);
        setErrorLoadingLogs(true);
      } finally {
        setLoadingLogs(false);
      }
    }

    getLogs();
    
  }, [])


  return (
    <>
      {loadingLogs &&
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      {errorLoadingLogs && 
        <div>
          <h2>Could not load your logs. Please try again</h2>
        </div>
      }

      {!errorLoadingLogs &&
        <>
          <Stack gap={3}>
            {logs.map(log => (
                <Log 
                  onLogClicked={(log) => setCurrentlyEditing(log)}
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
              logToEdit={null}
            />
          }

          {currentlyEditing && 
            <AddLogModal
              onDismiss={() => setCurrentlyEditing(null)}
              onLogSaved={(updatedLog) => {
                setCurrentlyEditing(null);
                setLogs(logs.map(currentLog => currentLog._id === updatedLog._id ? updatedLog : currentLog));
              }}
              logToEdit={currentlyEditing}
            />
          }
        </>
      }
    </>
  );
}

export default App;
