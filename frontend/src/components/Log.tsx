import {LogObject} from "../models/log";
import { Card } from "react-bootstrap";

interface LogProps {
    log: LogObject
}

const Log = ({log} : LogProps) => {
    return(
        <Card style={{ width: '80rem' }}>
            <Card.Title>{log.title}</Card.Title>
            <Card.Subtitle> {log.section} </Card.Subtitle>
            <Card.Body> {log.cost} </Card.Body>
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