import {LogObject} from "../models/log";
import { Card } from "react-bootstrap";

interface LogProps {
    log: LogObject,
    deleteClicked: (log: LogObject) => void,
    onLogClicked: (log:LogObject) => void,
}

const Log = ({log, deleteClicked, onLogClicked} : LogProps) => {
    return(
        <Card style={{ width: '80rem' }} onClick={() => onLogClicked(log)}>
            <Card.Title>{log.title}</Card.Title>
            <Card.Subtitle> {log.section} </Card.Subtitle>
            <Card.Body>
                <div>
                    {log.cost}
                    <button onClick={(e) => {
                        deleteClicked(log)
                        e.stopPropagation()
                    }}> DELETE </button>
                </div>
            </Card.Body>
            <Card.Footer>
                <div>
                    Created: {log.createdAt}
                    Updated: {log.updatedAt}
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Log;