import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import * as LogsApi from "../networks/logs_api";
import styles from "../styles/util.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRightToBracket, faPlus} from "@fortawesome/free-solid-svg-icons";

interface NavBarLoggedInProps {
    user: User,
    onLogoutSuccessful: () => void,
    onAddClicked: () => void,
}

const NavBarLoggedIn = ({user, onLogoutSuccessful, onAddClicked}: NavBarLoggedInProps) => {
    async function logout() {
        try{
            console.log("logging out");
            await LogsApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return(
        <Navbar className={`flex-col justiy-between items-center flex h-full`}>
            <div className={`flex flex-col h-full`}>
                <Button disabled className={`${styles.navButton} w-full mb-4`}>{user.username}</Button>
                <Button className={`${styles.navButton} w-full mb-4`} onClick={() => {logout()}}>
                    <FontAwesomeIcon className={`fa-2x`}icon={faRightToBracket}/>
                </Button>
            </div>
            <Button className={`${styles.navButton} w-full mb-4`} onClick={onAddClicked}>
                <FontAwesomeIcon icon={faPlus}/>
            </Button>
        </Navbar>
    );
}

export default NavBarLoggedIn;
