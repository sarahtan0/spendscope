import { Card } from "react-bootstrap";
import { LogObject } from "../../models/Log";
import styles from "../../styles/util.module.css";

interface AvgWidgetProps {
    logs: LogObject[]
}

const MonthAvgWidget = ({logs} : AvgWidgetProps) => {
    function getAvg(logs: LogObject[]) {
        let sum: number = 0
        logs.forEach(log => {
            sum += log.cost;
        });
        const average: number = sum/logs.length;
        if (!average) return 0;
        return average.toFixed(2);
    }

    return(
        <Card className={styles.widgetCard}>
            <Card.Header className={styles.widgetHead}>
                <h1 className="text-xl">Monthly Average</h1>
            </Card.Header>
            <Card.Body className="flex flex-col justify-end">
                <h3 className={"font-bold text-5xl"}>$ {getAvg(logs)}</h3>
            </Card.Body>
        </Card>
    );
}

export default MonthAvgWidget;