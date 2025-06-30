import { Button, Form, Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { LogObject } from "../models/log";
import { Controller, useForm } from "react-hook-form";
import { LogInput } from "../networks/logs_api";
import * as LogsApi from "../networks/logs_api"

interface LogModalProps {
    onDismiss: () => void,
    onLogSaved: (log: LogObject) => void,
}

function AddLogModal({onDismiss, onLogSaved}: LogModalProps) {

    const {register, handleSubmit, control, formState : {errors, isSubmitting}} = useForm<LogInput>();

    async function onSubmit(input: LogInput){
        try{
            const logResponse = await LogsApi.createLog(input);
            onLogSaved(logResponse);
        } catch (error){
            console.error(error);
            alert(error);
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Add Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addLogForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cost</Form.Label>
                        <div>
                            <Controller
                                name="cost"
                                control={control}
                                rules={{required: "Required"}}
                                render={({field}) => (
                                    <NumericFormat
                                        thousandSeparator
                                        prefix="$"
                                        decimalScale={2}
                                        allowNegative={false}
                                        placeholder="$0.00"
                                        onValueChange={(values) => {
                                            field.onChange(values.floatValue ?? 0);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select {...register("section", { required: "Required" })}>
                            <option>Select a category</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Food">Food</option>
                            <option value="Groceries">Groceries</option>
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