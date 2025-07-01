import {LogObject} from "../models/Log";
import { Button, Card } from "react-bootstrap";

interface LogProps {
    log: LogObject,
    deleteClicked: (log: LogObject) => void,
    onLogClicked: (log:LogObject) => void,
}

const Log = ({log, deleteClicked, onLogClicked} : LogProps) => {
    return(
        <Card style={{ width: '80vw' }} onClick={() => onLogClicked(log)}>
            <Card.Body>
                <Card.Title>
                    {log.title}
                    <button
                        onClick={(e) => {
                            deleteClicked(log);
                            e.stopPropagation();
                        }}
                    > DELETE </button>
                </Card.Title>
                <Card.Text> 
                    {log.section} 
                </Card.Text>
                ${log.cost}
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