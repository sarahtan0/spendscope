import { useEffect, useState } from "react";
import { LogObject } from "../models/Log";
import * as LogsApi from "../networks/logs_api";
import { Card, Stack } from "react-bootstrap";
import styles from "../styles/util.module.css";
import MonthAvgWidget from "./widgets/MonthAvgWidget";

const Dashboard = () => {
    const [monthLogs, setMonthLogs] = useState<LogObject[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [errorLoading, setErrorLoading] = useState(false);

    useEffect(() => {
        async function getMonthlyLogs() {
            try{
                setLoadingLogs(true);
                setErrorLoading(false);
                const retrievedLogs = await LogsApi.getMonthLogs();
                setMonthLogs(retrievedLogs);
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
        <div className="flex flex-col p-4 h-screen">
            <h1 className="ml-8 text-5xl font-bold">Dashboard</h1>
            <div className="w-full h-full flex justify-around">
                <div className={"w-3/6 h-full flex flex-col gap-4 p-4"}>
                    <MonthAvgWidget
                        logs={monthLogs}
                    />

                    <Card className={styles.widgetCard}>
                        <Card.Header className={styles.widgetHead}>
                            <h1 className="text-xl">Most Spent Section</h1>
                        </Card.Header>
                        <Card.Body>
                            <div className={`h-full flex flex-col justify-end`}>
                                <div>
                                    <h3 className={"font-bold text-3xl"}>section</h3>
                                    <h3 className={"font-bold text-5xl"}>$ Total</h3>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className={styles.widgetCard}>
                        <Card.Body>
                            <div>
                                GRAPH???
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="p-4 w-9/12">
                    <Card className={styles.widgetCard}>
                        <Card.Header className={styles.widgetHead}>
                            <h1 className="ml-4 text-xl">Logs</h1>
                        </Card.Header>
                        <Card.Body>
                            <div className={styles.gridLine}>
                                <p>Name</p>
                                <p>Cost</p>
                                <p>Section</p>
                                <p>Created At</p>
                            </div>
                            <hr className={styles.line}/>
                            {!loadingLogs && !errorLoading && 
                                (monthLogs.length > 0 ? (
                                    <Stack>
                                        {monthLogs.map(log => (
                                            <>
                                                <div className={styles.gridLine}>
                                                    <p>{log.title}</p>
                                                    <p>{log.cost}</p>
                                                    <p>{log.section}</p>
                                                    <p>{log.createdAt}</p>
                                                </div>
                                                <hr className={styles.line}/>
                                            </>
                                        ))}
                                    </Stack>
                                    )
                                    : <h4>No logs yet</h4>
                                )
                            }
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </div>
        // <>
        //     {!loadingLogs && !errorLoading && 
        //         (logs.length > 0 ? (
        //             <Stack className = {styles.flexCenter} gap={3}>
        //                 {logs.map(log => (
        //                     <Log
        //                     onLogClicked={() => {}}
        //                     log={log}
        //                     deleteClicked={() => {
        //                         LogsApi.deleteLog(log._id);
        //                         setLogs(logs.filter(existingLog => existingLog._id !== log._id));
        //                     }}
        //                     />
        //                 )
        //                 )}
        //             </Stack>
        //             )
        //             : <h4>You have no logs yet</h4>
        //         )
        //     }
        //     {!loadingLogs && !errorLoading && 
        //         <div>
        //             <MonthAvgWidget
        //                 logs={logs}
        //             />
        //         </div>
        //     }
        // </>
    );
}

export default Dashboard;