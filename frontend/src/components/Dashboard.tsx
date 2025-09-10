import { useEffect, useState } from "react";
import { LogObject } from "../models/Log";
import * as LogsApi from "../networks/logs_api";
import {Card, Stack } from "react-bootstrap";
import styles from "../styles/util.module.css";
import MonthTotalWidget from "./widgets/MonthTotalWidget";
import moment from "moment";
import SpendingCategoryWidget from "./widgets/SpendingCategoryWidget";
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement,
    LineController,Tooltip,Legend,Filler, Title} from 'chart.js';
import Log from "./Log";
import AddLogModal from "./AddEditLogModal";

ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,
    LineController,Tooltip,Legend,Filler,Title);

interface DashboardProps {
    logs: LogObject[],
}

const Dashboard = ({logs}: DashboardProps) => {
    type TwelveNumbers = [
        number,number,number,number,
        number,number,number,number,
        number,number,number,number,
    ];

    const [monthLogs, setMonthLogs] = useState<LogObject[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [errorLoading, setErrorLoading] = useState(false);
    const [topThreeSections, setTopThreeSections] = useState<[string,number][]>([]);
    const [monthTotals, setMonthTotals] = useState<number[]>(new Array(12).fill(0) as TwelveNumbers);
    const [currentlyEditing, setCurrentlyEditing] = useState<LogObject|null>(null);

    const currMonthIndex = new Date().getMonth();
    const months: Array<string> = ["January", "February", "March", "April", "May", 
        "June", "July", "August", "September", "October", "November", "December"];


    useEffect(() => {
        async function getMonthlyLogs() {
            try{
                setLoadingLogs(true);
                setErrorLoading(false);
                const retrievedLogs = await LogsApi.getMonthLogs();
                setMonthLogs(retrievedLogs);
                setLoadingLogs(false);
                const pastTotals: number[] = await LogsApi.getMonthTotals();
                setMonthTotals(pastTotals);

                let seenSections = new Set(["Clothes", "Essentials", "Miscellaneous", "Food"]);
                let sortedSections: [string, number][] = [];
                let totals: Record<string, number> = {};
                retrievedLogs.forEach(log => 
                    {
                        if (log.section in seenSections) seenSections.delete(log.section);
                        totals[log.section] = (totals[log.section] || 0) + log.cost;
                    }
                )
                sortedSections = Object.entries(totals).sort(([,a],[,b]) => b-a).slice(0,3);

                while(sortedSections.length < 3){
                    const randSection = seenSections.values().next().value;
                    sortedSections.push([randSection ?? "Other", 0])
                }

                setTopThreeSections(sortedSections)
            } catch(error) {
                console.error(error);
                alert(error);
                setErrorLoading(true);
            } finally {
                setLoadingLogs(false);
            }
        }
        getMonthlyLogs();
    }, [logs])

    // function convertTime(time: string) {
    //     const momentObject = moment(time).local();
    //     const formattedDate = momentObject.calendar();
    //     // const formattedDate = momentObject.format('MMMM Do YYYY, h:mm:ss a');
    //     return formattedDate;
    // }

    function costPercentage(place: number, sections:[string, number][]){
        //calculates the percentage of the total with the place-th most spent category
        let sum = 0;
        sections.forEach(section => {
            sum += section[1];
        });
        const percentage = (sections[place-1][1]/sum).toFixed(2);
        return parseFloat(percentage)*100;
    }

    // function monthsUntilNow(){
    //     const currMonth = moment().format('MMMM');
    //     let months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     let end = 0;
    //     while (months[end] !== currMonth){
    //         end += 1;
    //     }
    //     return months.slice(0, end+1);
    // }

    return(
        <div className="flex flex-col p-4 w-full h-screen">
            <h1 className="ml-8 text-5xl font-bold">Dashboard</h1>
            <div className="w-full h-full flex justify-around">
                <div className={"w-3/6 h-full flex flex-col gap-4 p-4"}>
                    <MonthTotalWidget
                        logs={monthLogs}
                    />

                    <Card className={`h-3/4 ${styles.widgetCard}`}>
                        <Card.Header className={styles.widgetHead}>
                            <h1 className="text-xl">Top Spending Categories</h1>
                        </Card.Header>
                        <Card.Body className={`flex items-center justify-center`}>
                            {topThreeSections.length >= 3 && 
                            <>
                                <SpendingCategoryWidget
                                    color="red"
                                    section={topThreeSections[0][0]}
                                    percentage={costPercentage(1, topThreeSections)}
                                    cost={topThreeSections[0][1]}
                                />
                                <SpendingCategoryWidget
                                    color="orange"
                                    section={topThreeSections[1][0]}
                                    percentage={costPercentage(2, topThreeSections)}
                                    cost={topThreeSections[1][1]}
                                />
                                <SpendingCategoryWidget
                                    color="green"
                                    section={topThreeSections[2][0]}
                                    percentage={costPercentage(3, topThreeSections)}
                                    cost={topThreeSections[2][1]}
                                />
                            </>
                            }
                        </Card.Body>
                    </Card>
                    <Card className={`${styles.widgetCard} h-3/4`}>
                        <Card.Body>
                            <Line
                                data={{
                                    labels: months.slice(0,currMonthIndex+1),
                                    datasets: [
                                        {
                                            label: "Total",
                                            data: monthTotals
                                        },
                                    ]
                                }}
                            />
                        </Card.Body>
                    </Card>
                </div>
                <div className="p-4 w-9/12">
                    <Card className={`${styles.widgetCard} h-full`}>
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
                                            <Log
                                            onLogClicked={(log) => setCurrentlyEditing(log)}
                                            log={log}
                                            deleteClicked={(deletedLog) => {
                                                LogsApi.deleteLog(log._id);
                                                setMonthLogs(logs.filter(existingLog => existingLog._id !== log._id));

                                                let updatedMonthTotals = {...monthTotals};
                                                updatedMonthTotals[currMonthIndex] -= deletedLog.cost;
                                                setMonthTotals(updatedMonthTotals);
                                            }}
                                            />
                                            // <>
                                            //     <div className={styles.gridLine}>
                                            //         <p>{log.title}</p>
                                            //         <p>${log.cost}</p>
                                            //         <p>{log.section === "Miscellaneous" ? "Misc" : log.section}</p>
                                            //         <p>{convertTime(log.createdAt)}</p>
                                            //         <Button>Delete</Button>
                                            //     </div>
                                            //     <hr className={styles.line}/>
                                            // </>
                                        ))}
                                    </Stack>
                                    )
                                    : <h4>No logs yet</h4>
                                )
                            }
                        </Card.Body>
                    </Card>
                </div>

                {currentlyEditing && 
                    <AddLogModal
                        onDismiss={() => setCurrentlyEditing(null)}
                        onLogSaved={(updatedLog) => {
                            setCurrentlyEditing(null);
                            setMonthLogs(logs.map(currentLog =>currentLog._id === updatedLog._id ? updatedLog : currentLog));
                            
                            const difference = updatedLog.cost - currentlyEditing?.cost || 0;
                            const updatedMonthTotals = {...monthTotals};
                            updatedMonthTotals[currMonthIndex] += difference;
                            console.log("Month", currMonthIndex, "value: ", updatedMonthTotals[currMonthIndex]);
                            setMonthTotals(updatedMonthTotals);
                        }}
                        logToEdit={currentlyEditing}
                    />
                }

            </div>
        </div>
    );
}

export default Dashboard;