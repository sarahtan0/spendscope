import { useEffect, useState } from "react";
import { Button, Spinner, Stack } from "react-bootstrap";
import { LogObject } from "../models/Log";
import * as LogsApi from "../networks/logs_api";
import styles from "../styles/util.module.css";
import AddLogModal from "./AddEditLogModal";
import Log from "./Log";

const LogsPageLoggedInView = () => {
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
    
    return(
        <div className={`h-full`}>
        {loadingLogs && <Spinner animation="border" role="status"/>}
        {errorLoadingLogs && <h2>Could not load your logs. Please try again</h2>}

        {!errorLoadingLogs && !loadingLogs && 
            (logs.length > 0 ? (
            <Stack className = {styles.flexCenter} gap={3}>
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
            )
            : <h4>You have no logs yet</h4>
            )
        }
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
        </div>
    );
}

export default LogsPageLoggedInView;