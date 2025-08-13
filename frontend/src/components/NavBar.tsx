import { Nav, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOutView from "./NavBarLoggedOut";

interface NavbarProps {
    user: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
    onAddClicked: () => void,
}

const NavBar = ({user,onLoginClicked: onLoginSuccessful, onLogoutSuccessful, onSignUpClicked: onSignUpSuccessful, onAddClicked}: NavbarProps) => {
    return(
        <Navbar className={`flex flex-col bg-slate-500 w-40 rounded-3xl h-9/12`}>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar" className={`h-full`}>
                <Nav className = "ms-auto h-full">
                    {user 
                    ? <NavBarLoggedIn user={user} onLogoutSuccessful={onLogoutSuccessful} onAddClicked={onAddClicked}/>
                    : <NavBarLoggedOutView onLoginClicked={onLoginSuccessful} onSignUpClicked={onSignUpSuccessful}/>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;