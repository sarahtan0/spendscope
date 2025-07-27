import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import * as LogsApi from "../networks/logs_api";

interface NavBarLoggedInProps {
    user: User,
    onLogoutSuccessful: () => void
}

const NavBarLoggedIn = ({user, onLogoutSuccessful}: NavBarLoggedInProps) => {
    async function logout() {
        try{
            await LogsApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return(
        <Navbar>
            <Navbar.Text>Logged in as {user.username}</Navbar.Text>
            <Button onClick={logout}>Log Out</Button>
        </Navbar>
    );
}

export default NavBarLoggedIn;
