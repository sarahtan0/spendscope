import {LogObject} from "../models/Log";
import styles from "../styles/util.module.css";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

    function convertTime(time: string) {
            const momentObject = moment(time).local();
            const formattedDate = momentObject.calendar();
            // const formattedDate = momentObject.format('MMMM Do YYYY, h:mm:ss a');
            return formattedDate;
        }

    return(
        <div className={styles.gridLine} onClick={() => onLogClicked(log)}>
            <h5> {log.title} </h5>
            <h5> {log.section === "Miscellaneous" ? "Misc" : log.section} </h5>
            <h5> ${log.cost} </h5>
            <h5> {convertTime(log.createdAt)} </h5>
            <button
                onClick={(e) => {
                    deleteClicked(log);
                    e.stopPropagation();
                }}
            > <FontAwesomeIcon icon={faTrash}/> </button>
        </div>
    );
};

export default Log;