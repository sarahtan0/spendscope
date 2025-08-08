import { LogObject } from "../../models/Log";
import styles from "../../styles/util.module.css";

interface AvgWidgetProps {
    logs: LogObject[]
}

const MonthTotalWidget = ({logs} : AvgWidgetProps) => {
    function getTotal(logs: LogObject[]) {
        let sum: number = 0
        logs.forEach(log => {
            sum += log.cost;
        });
        if (!sum) return 0;
        return sum.toFixed(2);
    }

    return(
        <div className={`${styles.dark} flex justify-between px-4 py-3 rounded-full`}>
            <h1 className="text-2xl text-white">Monthly Total</h1>
            <h3 className="text-2xl text-white"> ${getTotal(logs)} </h3>
        </div>
    );
}

export default MonthTotalWidget;