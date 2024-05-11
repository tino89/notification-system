import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"


export default function SendNotification(event) {

    const [options, setOptions] = useState([]);
    const [success, setSuccess] = useState(false);
    const { register, formState: { errors, isSubmitSuccessful }, handleSubmit, reset } = useForm()

    useEffect(() => {
        let opt = [{ "key": "", "value": "Select option" }, { "key": "1", "value": "Sports" }, { "key": "2", "value": "Finance" }, { "key": "3", "value": "Movies" }];
        setOptions(opt);
    }, [])



    function onSubmit(data) {

        fetch('http://localhost:3001/v1/notification', {
            method: 'POST',
            body: JSON.stringify({ "message": data.message, "category": data.category }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    setSuccess(true)
                    reset();
                } else {
                    alert("try Again!");
                }
            })
            .catch((err) => {
                alert("Cannot send the notification!");
                console.log(err.message);
            });


    }


    return (<>
        <div className="row pt-4">
            {success ?
                <div className="alert alert-success col-10 offset-1" role="alert">
                    The notification was sent successfully
                </div> : ""}

            <form onSubmit={handleSubmit(onSubmit)} className="col-10 offset-1">

                <div className="form-group row pb-3">
                    <label htmlFor="category">Category:</label>
                    <select  {...register("category", { required: true })} className={errors.category ? "form-control is-invalid" : "form-control"} id="category" name="category">
                        {options.map(x => { return <option key={x.key} value={x.key} > {x.value} </option> })}
                    </select>
                    {errors.category ?
                        <div id="category" class="invalid-feedback">
                            Please provide a category.
                        </div> : ""}
                </div>

                <div className="form-group row pb-3">
                    <label htmlFor="message">Message:</label>
                    <textarea  {...register("message", { required: true })} id="message" type="textArea" name="message" rows="3" className={errors.message ? "form-control is-invalid" : "form-control"} />
                    {errors.message ?
                        <div id="message" class="invalid-feedback">
                            Please provide a message diferent to empty.
                        </div> : ""}
                </div>

                <div className="form-group row pb-3">
                    <button className="btn btn-primary" type="submit">Send Notification</button>
                </div>

            </form>

        </div>


    </>);
}