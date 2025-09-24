import { User } from "../models/User";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import MonthTotalWidget from "./widgets/MonthTotalWidget";
import styles from "../styles/util.module.css";
import { Card, Navbar, Stack } from "react-bootstrap";
import SpendingCategoryWidget from "./widgets/SpendingCategoryWidget";
import Log from "./Log";
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement,
    LineController,Tooltip,Legend,Filler, Title} from 'chart.js';
import { LogObject } from "../models/Log";
import NavBar from "./NavBar";

ChartJS.register(LineElement,CategoryScale,LinearScale,PointElement,
    LineController,Tooltip,Legend,Filler,Title);

interface LoginProps {
    onLoginSuccessful: (user: User) => void,
    onSignupSuccessful: (user: User) => void,
}

const LogsPageLoggedOutView = ({onLoginSuccessful, onSignupSuccessful}: LoginProps) => {
    const [loginShow, setLoginShow] = useState(true);
    const [signupShow, setSignupShow] = useState(false);
    
    //     const dummyLogs: LogObject[] = [
    // {
    //     _id: "1",              // fake ID
    //     userId: "6875cd64f52bff4cc3aba6d1",   // fake user
    //     createdAt: "",         // empty string is fine if it's typed as string
    //     updatedAt: "",         // same here
    //     title: "Shirt",
    //     cost: 12.99,
    //     section: "Clothes",
    // },
    // {
    //     _id: "2",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // },
    // {
    //     _id: "3",
    //     userId: "6875cd64f52bff4cc3aba6d1",
    //     createdAt: "",
    //     updatedAt: "",
    //     title: "Album",
    //     cost: 12.99,
    //     section: "Essentials",
    // }
    // ];

    // const dummy_user: User = {
    //     _id: "6875cd64f52bff4cc3aba6d1",
    //     username: "user3",
    //     email: "user3@gmail.com",
    //     password: "$2b$10$r9zpsdyU7mu5q5jL.GIlOOtp6YUNbhyEnrijipR225KAzG0CDRJpa",
    //     monthBudget: 0,
    //     monthTotals: [
    //         0,
    //         0,
    //         0,
    //         0,
    //         0,
    //         0,
    //         12.99,
    //         62.96,
    //         24.67,
    //         0,
    //         0,
    //         0
    //     ]
    // }

    
    return(
        // <>
        //     <NavBar
        //         user={dummy_user}
        //         onLogoutSuccessful={() => {}}
        //         onAddClicked={() => {}}
        //     />
        //     <div className="flex flex-col pt-4 sm:pb-4 sm:pt-0 sm:p-4 w-full h-screen">
        //         <h1 className="ml-2 sm:ml-8 text-5xl font-bold mb-2 ">Dashboard</h1>
        //         <div className="w-full h-full sm:max-h-[calc(100vh-100px)] flex flex-col sm:flex-row justify-around">
        //             <div className={"w-full sm:w-5/12 h-full flex flex-col gap-4 p-2 sm:!p-4"}>
        //                 <MonthTotalWidget
        //                     logs={dummyLogs}
        //                 />

        //                 <Card className={`h-full sm:h-3/4 ${styles.widgetCard}`}>
        //                     <div className={styles.widgetHead}>
        //                         <h1 className="text-xl">Top Spending Categories</h1>
        //                     </div>
        //                     <Card.Body className="py-4 p-2 grid w-full sm:grid-cols-3 gap-3 sm:gap-1">
        //                             <SpendingCategoryWidget
        //                                 color="red"
        //                                 section="Clothes"
        //                                 percentage={50}
        //                                 cost={10}
        //                             />
        //                             <SpendingCategoryWidget
        //                                 color="orange"
        //                                 section="Essentials"
        //                                 percentage={50}
        //                                 cost={10}
        //                             />
        //                             <SpendingCategoryWidget
        //                                 color="green"
        //                                 section="Misc"
        //                                 percentage={0}
        //                                 cost={0}
        //                             />
        //                     </Card.Body>
        //                 </Card>
        //                 <Card className={`${styles.widgetCard} h-3/4`}>
        //                     <Card.Body>
        //                         <Line
        //                             data={{
        //                                 labels: ["January", "February", "March", "April", "May", "June", "July"],
        //                                 datasets: [
        //                                     {
        //                                         label: "Total",
        //                                         data: [0,0,0,0,0,0,0]
        //                                     },
        //                                 ]
        //                             }}
        //                         />
        //                     </Card.Body>
        //                 </Card>
        //             </div>
        //             <div className="p-2 sm:!p-4 w-full sm:max-w-[800px] max-h-[400px] sm:max-h-[calc(100vh-100px)]">
        //                 <Card className={`${styles.widgetCard} h-full overflow-y-auto`}>
        //                     <div className={`${styles.widgetHead} `}>
        //                         <h1 className="ml-4 text-xl">Logs</h1>
        //                     </div>
        //                     <Card.Body className={`max-w-[80vw]`}>
        //                         <div className={styles.gridLine}>
        //                             <p>Name</p>
        //                             <p>Section</p>
        //                             <p>Cost</p>
        //                             <p>Created At</p>
        //                         </div>
        //                         <hr className={styles.line}/>
        //                                 <Stack>
        //                                 {dummyLogs.map(log => (
        //                                     <>
        //                                         <Log
        //                                         onLogClicked={(log) => {}}
        //                                         log={log}
        //                                         deleteClicked={(deletedLog) => {}}
        //                                         />
        //                                         <hr className={styles.line}/>
        //                                     </>
        //                                 ))}
        //                             </Stack>
        //                     </Card.Body>
        //                 </Card>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <>
            <div className={`h-3/4 w-full md:w-1/2 bg-transparent flex justify-center items-center`}>
                <div className={`flex-col sm:w-1/2 w-10/12 `}>
                    {loginShow && 
                        <LoginModal
                            onLoginSuccessful={(user)=>{
                                onLoginSuccessful(user)
                            }}
                            onSignUpClick={() => {
                                setLoginShow(false);
                                setSignupShow(true);
                            }}
                        />
                    }
                    {signupShow && 
                        <SignUpModal
                            onSignUpSuccessful={(user)=>{
                                onSignupSuccessful(user)
                            }}
                            onLoginClicked={() => {
                                setLoginShow(true);
                                setSignupShow(false);
                            }}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default LogsPageLoggedOutView;