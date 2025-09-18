import { useEffect, useState } from "react";
import { LogObject } from "../models/Log";
import * as LogsApi from "../networks/logs_api";
import {Card, Stack } from "react-bootstrap";
import styles from "../styles/util.module.css";
import MonthTotalWidget from "./widgets/MonthTotalWidget";
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

            } catch(error) {
                console.error(error);
                alert(error);
                setErrorLoading(true);
            } finally {
                setLoadingLogs(false);
            }
        }
        getMonthlyLogs();
    }, [logs]);

    useEffect(() => {
        async function updateTopThree() {
            let seenSections = new Set(["Clothes", "Essentials", "Miscellaneous", "Food"]);
            let sortedSections: [string, number][] = [];
            let totals: Record<string, number> = {};

            monthLogs.forEach(log => 
                {
                    if (seenSections.has(log.section)) seenSections.delete(log.section);
                    totals[log.section] = (totals[log.section] || 0) + log.cost;
                }
            )
            sortedSections = Object.entries(totals).sort(([,a],[,b]) => b-a).slice(0,3);

            while(sortedSections.length < 3){
                console.log("need another, picking a section from ", seenSections);
                const randSection = seenSections.values().next().value;
                sortedSections.push([randSection ?? "Other", 0])
            }

            console.log(sortedSections);
            setTopThreeSections([...sortedSections]);
        }
        updateTopThree();
    }, [monthLogs])

    function costPercentage(place: number, sections:[string, number][]){
        //calculates the percentage of the total with the place-th most spent category
        let sum = 0;
        sections.forEach(section => {
            sum += section[1];
        });
        const percentage = (sections[place-1][1]/sum).toFixed(2);
        return parseFloat(percentage)*100;
    }

    return(
        <div className="flex flex-col pt-4 sm:pt-0 sm:p-4 w-full h-screen">
            <h1 className="ml-2 sm:ml-8 text-5xl font-bold mb-2 ">Dashboard</h1>
            <div className="w-full h-full flex flex-col sm:grid sm:grid-cols-12 justify-around">
                <div className={"w-full h-full flex flex-col gap-4 p-2 sm:!p-4 sm:col-span-5"}>
                    <MonthTotalWidget
                        logs={monthLogs}
                    />

                    <Card className={`h-full sm:h-3/4 ${styles.widgetCard}`}>
                        <div className={styles.widgetHead}>
                            <h1 className="text-xl">Top Spending Categories</h1>
                        </div>
                        <Card.Body className="py-4 p-2 sm:!p-3 sm:flex sm:items-center">
                            <div className={`grid w-full sm:grid-cols-3 gap-3 sm:!gap-x-1 sm:!gap-y-1 sm:h-3/4`}>
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
                            </div>
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
                <div className="p-2 sm:!p-4 w-full sm:col-span-7">
                    <Card className={`${styles.widgetCard} h-full`}>
                        <div className={styles.widgetHead}>
                            <h1 className="ml-4 text-xl">Logs</h1>
                        </div>
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
                                                <Log
                                                onLogClicked={(log) => setCurrentlyEditing(log)}
                                                log={log}
                                                deleteClicked={async(deletedLog) => {
                                                    LogsApi.deleteLog(log._id);
                                                    const logMonthIndex = new Date(deletedLog.createdAt).getMonth();

                                                    setMonthLogs(monthLogs.filter(existingLog => (
                                                        existingLog._id !== deletedLog._id && logMonthIndex === currMonthIndex)
                                                    ));

                                                    let updatedMonthTotals = [...monthTotals];
                                                    const newTotal = updatedMonthTotals[currMonthIndex] - deletedLog.cost;
                                                    updatedMonthTotals[currMonthIndex] = newTotal;
                                                    setMonthTotals(updatedMonthTotals);

                                                    try{
                                                        console.log("deleting ", log?._id);
                                                        await LogsApi.modifyMonthTotals({
                                                            userId: log?.userId,
                                                            monthIndex: currMonthIndex, 
                                                            newValue: newTotal
                                                        });
                                                    } catch(error){
                                                        console.error(error);
                                                        alert(error);
                                                    }
                                                }}
                                                />
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

                {currentlyEditing && 
                    <AddLogModal
                        onDismiss={() => setCurrentlyEditing(null)}
                        onLogSaved={async(updatedLog) => {
                            setCurrentlyEditing(null);
                            setMonthLogs(monthLogs.map(currentLog =>currentLog._id === updatedLog._id ? updatedLog : currentLog));
                            
                            const updatedMonthTotals = [...monthTotals];
                            const newTotal = updatedMonthTotals[currMonthIndex] + (updatedLog.cost - currentlyEditing?.cost || 0);

                            updatedMonthTotals[currMonthIndex] = newTotal;
                            setMonthTotals(updatedMonthTotals);

                            try{
                                await LogsApi.modifyMonthTotals({
                                    userId: updatedLog.userId,
                                    monthIndex: currMonthIndex, 
                                    newValue: newTotal
                                });
                            }catch(error){
                                console.error(error);
                                alert(error);
                            }
                        }}
                        logToEdit={currentlyEditing}
                    />
                }

            </div>
        </div>
    );
}

export default Dashboard;