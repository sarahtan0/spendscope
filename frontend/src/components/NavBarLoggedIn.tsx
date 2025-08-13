import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import * as LogsApi from "../networks/logs_api";
import styles from "../styles/util.module.css";

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
                <Navbar.Text className={`${styles.navButton} w-full mb-4`}>{user.username}</Navbar.Text>
                <Button className={`${styles.navButton} w-full mb-4`} onClick={() => {logout()}}>Log Out</Button>
            </div>
            <Button className={`${styles.navButton} w-full mb-4`} onClick={onAddClicked}>+</Button>
        </Navbar>
    );
}

export default NavBarLoggedIn;
