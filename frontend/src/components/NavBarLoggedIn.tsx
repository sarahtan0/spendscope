import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import * as LogsApi from "../networks/logs_api";

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
                <Navbar.Text>{user.username}</Navbar.Text>
                <Button onClick={() => {logout()}}>Log Out</Button>
            </div>
            <Button className={`rounded-full`} onClick={onAddClicked}>+</Button>
        </Navbar>
    );
}

export default NavBarLoggedIn;
