import { Card } from "react-bootstrap";
import styles from "../styles/util.module.css";

const LogsPageLoggedOutView = () => {
    return(
        // <div className="flex flex-col p-4 h-screen">
        //     <h1 className="ml-8 text-5xl font-bold">Dashboard</h1>
        //     <div className="w-full h-full flex justify-around">
        //         <div className={"w-3/6 h-full flex flex-col gap-4 p-4"}>
        //             <Card className={styles.widgetCard}>
        //                 <Card.Header className={styles.widgetHead}>
        //                     <h1 className="text-xl">Monthly Average</h1>
        //                 </Card.Header>
        //                 <Card.Body className="flex flex-col justify-end">
        //                     <h3 className={"font-bold text-5xl"}>$ Average</h3>
        //                 </Card.Body>
        //             </Card>

        //             <Card className={styles.widgetCard}>
        //                 <Card.Header className={styles.widgetHead}>
        //                     <h1 className="text-xl">Most Spent Section</h1>
        //                 </Card.Header>
        //                 <Card.Body>
        //                     <div className={`h-full flex flex-col justify-end`}>
        //                         <div>
        //                             <h3 className={"font-bold text-3xl"}>section</h3>
        //                             <h3 className={"font-bold text-5xl"}>$ Total</h3>
        //                         </div>
        //                     </div>
        //                 </Card.Body>
        //             </Card>

        //             <Card className={styles.widgetCard}>
        //                 <Card.Body>
        //                     <div>
        //                         GRAPH???
        //                     </div>
        //                 </Card.Body>
        //             </Card>
        //         </div>
        //         <div className="p-4 w-9/12">
        //             <Card className={styles.widgetCard}>
        //                 <Card.Header className={styles.widgetHead}>
        //                     <h1 className="ml-4 text-xl">Logs</h1>
        //                 </Card.Header>
        //                 <Card.Body>
        //                     <div className={styles.gridLine}>
        //                         <p>Name</p>
        //                         <p>Cost</p>
        //                         <p>Section</p>
        //                         <p>Created At</p>
        //                     </div>
        //                     <hr className={styles.line}/>
        //                     <div className={styles.gridLine}>
        //                         <p>Name</p>
        //                         <p>Cost</p>
        //                         <p>Section</p>
        //                         <p>Created At</p>
        //                     </div>
        //                     <hr className={styles.line}/>
        //                 </Card.Body>
        //             </Card>
        //         </div>

        //     </div>
        // </div>
        <div className={`h-[calc(100vh-15rem)] flex items-center justify-center`}>
            <h1 className={`text-4xl font-bold`}>Please log in to see your notes</h1>
        </div>
    )
}

export default LogsPageLoggedOutView;