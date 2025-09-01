import { Button} from "react-bootstrap";
import styles from "../styles/util.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faRightToBracket } from "@fortawesome/free-solid-svg-icons";


interface NavBarLoggedOutViewProps {
    onLoginClicked: () => void,
    onSignUpClicked: () => void,
}

const NavBarLoggedOutView = ({onLoginClicked: onLoginSuccessful, onSignUpClicked: onSignUpSuccessful} : NavBarLoggedOutViewProps) => {
    return(
        <div className={`flex-col justiy-between items-center flex h-full`}>
            <div className={`flex flex-col h-full`}>
                <Button
                    className={`${styles.navButton}`}
                    onClick={onSignUpSuccessful}>
                    Sign Up
                </Button>
                <Button 
                    className={`${styles.navButton}`}
                    onClick={onLoginSuccessful}>
                    <FontAwesomeIcon className={`fa-2x`}icon={faRightToBracket}/>
                </Button>
            </div>
        </div>
    );
}

export default NavBarLoggedOutView;