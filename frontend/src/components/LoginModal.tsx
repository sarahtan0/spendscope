import { useForm } from "react-hook-form";
import { User } from "../models/User";
import { LoginCredentials } from "../networks/logs_api";
import * as LogsApi from "../networks/logs_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInput";

interface LoginProps {
    onLoginSuccessful: (user: User) => void,
    onSignUpClick: () => void
}

function LoginModal({onLoginSuccessful, onSignUpClick}: LoginProps){
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
        <div>
            <Modal.Title className={`text-center`}>SpendScope</Modal.Title>
            <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    label="Username"
                    name="username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                    type="text"
                />
                <TextInputField
                    label="Password"
                    name="password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                    type="password"
                />
            </Form>
            <Button className={`w-full mt-3`}
                type="submit"
                form="loginForm"
                disabled={isSubmitting}
            > Submit
            </Button>
            <p className={`text-center mt-3`}>
                Don't have an account?{' '}
                <button className={`bg-transparent text-blue-500`}onClick={onSignUpClick}>Sign up here</button>
            </p>
        </div>
            
    );
}

export default LoginModal;