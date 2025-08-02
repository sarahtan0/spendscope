import { useEffect, useState } from "react";
import { LogObject } from "../models/Log";
import * as LogsApi from "../networks/logs_api";
import { Stack } from "react-bootstrap";
import Log from "./Log";
import styles from "../styles/util.module.css";

const Dashboard = () => {
    const [logs, setLogs] = useState<LogObject[]>([]);
    const [avg, setAvg] = useState<number>(0);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() => {
        async function getMonthlyLogs() {
            try{
                setLoadingLogs(true);
                setErrorLoading(false);
                const retrievedLogs = await LogsApi.getMonthLogs();
                setLogs(retrievedLogs);
                setLoadingLogs(false);
            } catch(error) {
                console.error(error);
                alert(error);
                setErrorLoading(true);
            } finally {
                setLoadingLogs(false);
            }
        }
        getMonthlyLogs();
        }, [])
    return(
        <>
            {!loadingLogs && !errorLoading && 
                (logs.length > 0 ? (
                    <Stack className = {styles.flexCenter} gap={3}>
                        {logs.map(log => (
                            <Log
                            onLogClicked={() => {}}
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
        </>
    );
}

export default Dashboard;