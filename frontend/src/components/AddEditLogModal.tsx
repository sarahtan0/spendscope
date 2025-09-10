import { Button, Form, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { LogObject } from "../models/Log";
import { Controller, useForm } from "react-hook-form";
import { LogInput } from "../networks/logs_api";
import * as LogsApi from "../networks/logs_api"
import TextInputField from "./form/TextInput";

interface LogModalProps {
    onDismiss: () => void,
    onLogSaved: (log: LogObject) => void,
    logToEdit: LogObject|null,
}

function AddLogModal({onDismiss, onLogSaved, logToEdit}: LogModalProps) {

    const {register, handleSubmit, control, formState : {errors, isSubmitting}} = useForm<LogInput>({
        defaultValues: {
            title: logToEdit?.title || "",
            cost: logToEdit?.cost || 0,
            section: logToEdit?.section || "",
        }
    });

    async function onSubmit(input: LogInput){
        try{
            let logResponse: LogObject;
            if(logToEdit){
                logResponse = await LogsApi.updateLog(logToEdit._id, input);
            } else {
                logResponse = await LogsApi.createLog(input);
            }
            onLogSaved(logResponse);
        } catch (error){
            console.error(error);
            alert(error);
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{logToEdit ? "Edit Log" : "Add Log"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addLogForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        label="Title"
                        name="title"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.title}
                        type="text"
                    />
                    <Form.Group className="mb-3">
                        <Form.Label>Cost</Form.Label>
                        <div>
                            <Controller
                                name="cost"
                                control={control}
                                rules={{required: "Required"}}
                                render={({field}) => (
                                    <NumericFormat
                                        className={`form-control ${errors.cost ? "is-invalid" : ""}`}
                                        thousandSeparator
                                        prefix="$"
                                        decimalScale={2}
                                        allowNegative={false}
                                        placeholder="$0.00"
                                        value={field.value ?? ""}
                                        onValueChange={(values) => {
                                            field.onChange(values.floatValue ?? "");
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select 
                            isInvalid={!!errors.section}
                            {...register("section", { required: "Required" })}>
                            <option value="">Select a category</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Food">Food</option>
                            <option value="Essentials">Essentials</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.section?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addLogForm"
                    disabled={isSubmitting}
                > Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddLogModal;