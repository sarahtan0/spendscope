import { Button} from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onLoginClicked: () => void,
    onSignUpClicked: () => void,
}

const NavBarLoggedOutView = ({onLoginClicked: onLoginSuccessful, onSignUpClicked: onSignUpSuccessful} : NavBarLoggedOutViewProps) => {
    return(
        <div className={`flex-col justiy-between items-center flex h-full`}>
            <div className={`flex flex-col h-full`}>
                <Button
                    className={`mb-4 mt-4`}
                    onClick={onSignUpSuccessful}>
                    Sign Up
                </Button>
                <Button
                    className={`mb-4 mt-4`}
                    onClick={onLoginSuccessful}>
                    Login
                </Button>
            </div>
        </div>
    );
}

export default NavBarLoggedOutView;