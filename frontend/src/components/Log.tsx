import {LogObject} from "../models/Log";
import { Card } from "react-bootstrap";
import styles from "./styles/util.module.css";

interface LogProps {
    log: LogObject,
    deleteClicked: (log: LogObject) => void,
    onLogClicked: (log:LogObject) => void,
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-US", 
    {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric", 
        minute: "numeric",
    });
}

const Log = ({log, deleteClicked, onLogClicked} : LogProps) => {
    return(
        <Card style={{ width: '80vw' }} onClick={() => onLogClicked(log)}>
            <Card.Body>
                <Card.Text className={styles.flexCenter}>
                    <h5> {log.title} </h5>
                    <h5> {log.section} </h5>
                    <h5> ${log.cost} </h5>
                    <button
                        onClick={(e) => {
                            deleteClicked(log);
                            e.stopPropagation();
                        }}
                    > DELETE </button>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div>
                    Updated: {formatDate(log.updatedAt)}
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Log;