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
        <Navbar className={`w-full flex flex-row-reverse sm:!flex-col sm:justiy-between sm:items-center sm:flex sm:h-full
                            gap-4 sm:!gap-0`}>
            <div className={`${styles.navGrid} justify-center items-center h-full gap-4 sm:!gap-2`}>
                <div className={`flex flex-row sm:!flex-col gap-4 sm:!gap-2`}>
                    <Button variant="light" className={`${styles.navButton}`}>BUTTON</Button>
                    <Button variant="light" className={`${styles.navButton}`}>BUTTON</Button>
                </div>
                <div></div>
                <div className={`flex flex-row sm:!flex-col gap-4 sm:!gap-2`}>
                    <Button variant="light" className={`${styles.navButton}`}>{user.username}</Button>
                    <Button variant="light" className={`${styles.navButton}`} onClick={() => {logout()}}>
                        <FontAwesomeIcon className={`fa-2x`}icon={faRightToBracket}/>
                    </Button>
                </div>
            </div>
            <Button variant="light" className={` ${styles.addButton} mb-4`} onClick={onAddClicked}>
                <FontAwesomeIcon className={`text-2xl sm:text-lg`}icon={faPlus}/>
            </Button>
        </Navbar>
    );
}

export default NavBarLoggedIn;
