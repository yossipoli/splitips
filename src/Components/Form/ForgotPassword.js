import "./Form.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { API } from "../../DAL/API";
import FormInput from "./InnerComponents/FormInput";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
    const nav = useNavigate()
    const [values, setValues] = useState({
        email: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "כתובת המייל של החשבון איתה נרשמת",
            errorMessage: "כתובת אימייל לא תקינה",
            label: "כתובת המייל של החשבון",
            required: true,
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    const onSubmit = async(e) => {
        e.preventDefault()
        const res = await API.forgot(values)
        switch (res) {
            case "wrong":
                toast.warning("כתובת המייל הזו אינה נמצאת במערכת עדיין")
                break
            case "success":
                toast.info("נשלחה לכתובת המייל שלך בקשה לאיפוס סיסמה")
                setTimeout(()=> nav("/all"), 2000)//TODO change to login
                break
            default:
                toast.error("אירעה שגיאה")
        }
    };
    
    return (
        <div>
            <div className="alert">
                <ToastContainer/>
            </div>
            <div className="form forgot">
                <form onSubmit={onSubmit}>
                    <h1>שכחתי סיסמה</h1>
                        בקשה לשחזור סיסמה לבעל חשבון:
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button>שלח</button>
                </form>
            </div>
        </div>
    );
};


export default Forgot;
