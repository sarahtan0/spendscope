import {LogObject} from "../models/log";
import { Card } from "react-bootstrap";

interface LogProps {
    log: LogObject
}

async function deleteLog(logId: string) {
    console.log(logId);
    await fetch('http://localhost:2000/logs/' + logId, {method: 'DELETE'});
}

const Log = ({log} : LogProps) => {
    return(
        <Card style={{ width: '80rem' }}>
            <Card.Title>{log.title}</Card.Title>
            <Card.Subtitle> {log.section} </Card.Subtitle>
            <Card.Body>
                <div>
                    {log.cost}
                    <button onClick={() => deleteLog(log._id)}> DELETE </button>
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