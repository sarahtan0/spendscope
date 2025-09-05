import { useForm } from "react-hook-form";
import { User } from "../models/User";
import { Button, Form, Modal } from "react-bootstrap";
import * as LogsApi from "../networks/logs_api";
import TextInputField from "./form/TextInput";

interface SignUpProps {
    onSignUpSuccessful: (user: User) => void,
    onLoginClicked: () => void
}

function SignUpModal({onSignUpSuccessful, onLoginClicked}: SignUpProps) {
    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<User>();

    async function onSubmit(input: User){
        try{
            const response = await LogsApi.signUp(input);
            onSignUpSuccessful(response);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return(
        <div >
            <Modal.Title className={`text-center`}>SpendScope</Modal.Title>
            <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    label="Username"
                    name="username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                    type="text"
                />
                <TextInputField
                    label="Email"
                    name="email"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.email}
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
                form="signUpForm"
                disabled={isSubmitting}
            > Submit
            </Button>
            <p className={`text-center mt-3`}>
                Already have an account?{' '}
                <button className={`bg-transparent text-blue-500`}onClick={onLoginClicked}>Log in here</button>
            </p>
        </div>
    );
}

export default SignUpModal;