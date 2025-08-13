import { Button} from "react-bootstrap";
import styles from "../styles/util.module.css";

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
                    Login
                </Button>
            </div>
        </div>
    );
}

export default NavBarLoggedOutView;