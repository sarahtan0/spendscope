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
        <Card className={`w-3/12 h-60 border-0`}>
            <Card.Body>
              <div className={`h-full flex flex-col justify-between`}>
                <h1 className="text-lg">Monthly Average</h1>
                <p className={"font-bold text-4xl"}>{getAvg(logs)}</p>
              </div>
            </Card.Body>
        </Card>
    );
}

export default MonthAvgWidget;