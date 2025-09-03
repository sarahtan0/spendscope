import { useForm } from "react-hook-form";
import { User } from "../models/User";
import { LoginCredentials } from "../networks/logs_api";
import * as LogsApi from "../networks/logs_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInput";

interface LoginProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void
}

function LoginModal({onDismiss, onLoginSuccessful}: LoginProps){
    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<User>();
    
    async function onSubmit(credentials: LoginCredentials){
        try {
            const response = await LogsApi.login(credentials);
            onLoginSuccessful(response);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>SpendScope</Modal.Title>
                <h2>Log In</h2>
            </Modal.Header>
            <Modal.Body>
                <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        label="Username"
                        name="username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        label="Password"
                        name="password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="loginForm"
                    disabled={isSubmitting}
                > Submit
                </Button>
            </Modal.Footer>
            
        </Modal>
    );
}

export default LoginModal;