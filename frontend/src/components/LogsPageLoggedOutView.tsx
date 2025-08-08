import { Card } from "react-bootstrap";
import styles from "../styles/util.module.css";
import SpendingCategoryWidget from "./widgets/SpendingCategoryWidget";
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    Tooltip,
    Legend,
    Filler,
    Title
  } from 'chart.js';
import moment from "moment";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    Tooltip,
    Legend,
    Filler,
    Title
  );


const LogsPageLoggedOutView = () => {

      function monthsUntilNow(){
            const currMonth = moment().format('MMMM');
            let months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let end = 0;
            while (months[end] !== currMonth){
                end += 1;
            }
            return months.slice(0, end+1);
        }
    
    return(
        <div className="flex flex-col p-4 h-screen">
            <h1 className="ml-8 text-5xl font-bold">Dashboard</h1>
            <div className="w-full h-full flex justify-around">
                <div className={"w-3/6 h-full flex flex-col gap-4 p-4"}>
                    <div className={`${styles.dark} flex justify-between px-4 py-3 rounded-full`}>
                        <h1 className="text-2xl text-white">Monthly Total</h1>
                        <h3 className="text-2xl text-white"> $87.41 </h3>
                    </div>

                    <Card className={`h-3/4 ${styles.widgetCard}`}>
                        <Card.Header className={styles.widgetHead}>
                            <h1 className="text-xl">Top Spending Categories</h1>
                        </Card.Header>
                        <Card.Body className={`flex items-center justify-center`}>
                            <SpendingCategoryWidget
                                color="red"
                                section="Clothes"
                                percentage={50}
                                cost={12.99}
                            />
                            <SpendingCategoryWidget
                                color="orange"
                                section="Essentials"
                                percentage={50}
                                cost={12.99}
                            />
                            <SpendingCategoryWidget
                                color="green"
                                section="Misc"
                                percentage={0}
                                cost={0.00}
                            />
                        </Card.Body>
                    </Card>

                    <Card className={`h-full ${styles.widgetCard}`}>
                        <Card.Body>
                            <Line
                                data={{
                                    labels: monthsUntilNow(),
                                    datasets: [
                                        {
                                            label: "Total",
                                            data: [0,0,0,0,0,53.2,0],
                                        },
                                    ]
                                }}
                            />
                        </Card.Body>
                    </Card>
                </div>
                <div className="p-4 w-9/12">
                    <Card className={`h-full ${styles.widgetCard}`}>
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
                            <div className={styles.gridLine}>
                                <p>Shirt</p>
                                <p>$12.32</p>
                                <p>Clothes</p>
                                <p>Today at 12:00 pm</p>
                            </div>
                            <hr className={styles.line}/>
                        </Card.Body>
                    </Card>
                </div>

            </div>
            {/* // <div className={`h-[calc(100vh-15rem)] flex items-center justify-center`}>
            //     <h1 className={`text-4xl font-bold`}>Please log in to see your notes</h1>
            // </div> */}
        </div>
    );
}

export default LogsPageLoggedOutView;