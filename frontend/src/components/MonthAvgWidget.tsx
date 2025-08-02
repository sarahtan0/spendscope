import { Card } from "react-bootstrap";
import { LogObject } from "../models/Log";

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
        return average.toFixed(2);
    }

    return(
        <Card className={`w-4/12 h-60`}>
            <Card.Body>
                <h1>Monthly Average</h1>
                <p>average</p>
            </Card.Body>
        </Card>
    );
}

export default MonthAvgWidget;