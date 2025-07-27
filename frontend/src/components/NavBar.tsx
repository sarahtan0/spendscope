import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOutView from "./NavBarLoggedOut";

interface NavbarProps {
    user: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({user,onLoginClicked: onLoginSuccessful, onLogoutSuccessful, onSignUpClicked: onSignUpSuccessful}: NavbarProps) => {
    return(
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand>SpendScope</Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar">
                        <Nav className = "ms-auto">
                            {user 
                            ? <NavBarLoggedIn user={user} onLogoutSuccessful={onLogoutSuccessful}/>
                            : <NavBarLoggedOutView onLoginClicked={onLoginSuccessful} onSignUpClicked={onSignUpSuccessful}/>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;