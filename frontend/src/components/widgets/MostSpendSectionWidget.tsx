import { Card } from "react-bootstrap";
import styles from "../../styles/util.module.css";
import { LogObject } from "../../models/Log";

interface MostSpentWidgetProps {
    logs: LogObject[]
}

const MostSpentWidget = ({logs}: MostSpentWidgetProps) => {
    return(
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
    );
}

export default MostSpentWidget;