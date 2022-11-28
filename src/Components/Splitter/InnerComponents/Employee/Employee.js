import "./Employee.css";
import { FaTrash } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";

function Employee({idx, employeeIn, employeeOut, duplicate, remove, onChange}) {
    const updateEmployee = (e) => {
        onChange(idx, e.target.name, e.target.value);
    };
    return (
        <div className="employee">
            <div>
                <div className="name row">
                    <div className="remove row">
                        <button
                            onClick={()=> duplicate(idx)}
                            className="duplicate"
                            title="שכפל"
                        >
                            <IoCopy />
                        </button>
                        <button
                            onClick={() => remove(idx)}
                            className="removeBtn"
                            title="מחק"
                        >
                            <FaTrash />
                        </button>
                    </div>
                    שם {idx + 1}:
                    <input
                        type="text"
                        name="name"
                        value={employeeIn.name}
                        onChange={updateEmployee}
                    />
                    <label className="tookTip">
                        <button
                            name="tookTip"
                            value={employeeIn.tookTip? false : true}
                            style={{ backgroundColor: employeeIn.tookTip ? "green" : "red" }}
                            className="tookTipSpan"
                            onClick={updateEmployee}
                            title={employeeIn.tookTip? "לקח טיפ" : "לא לקח טיפ"}
                        >
                            {employeeIn.tookTip? "V" : "X"}
                        </button>
                    </label>
                </div>
                <div className="row">
                    <div className="startTime">
                        כניסה:
                        <input
                            name="start"
                            type="time"
                            value={employeeIn.start}
                            onChange={updateEmployee}
                        />
                    </div>
                    <div className="endTime">
                        יציאה:
                        <input
                            name="end"
                            type="time"
                            value={employeeIn.end}
                            onChange={updateEmployee}
                        />
                    </div>
                </div>
                <div className="row">
                    <label className="hoursLabel">
                        שעות:{" "}
                        <span className="hoursSpan">
                            {Math.round(employeeOut.hours * 100) / 100}
                        </span>
                    </label>
                    <label className="hoursLabel">
                        שכר:{" "}
                        <span className="hoursSpan">
                            {Math.round(employeeOut.salary * 100) / 100}₪
                        </span>
                    </label>
                    <label className="hoursLabel">
                        טיפ:{" "}
                        <span
                            style={{ color: employeeOut.tips < 0 && "red" }}
                            className="hoursSpan"
                        >
                            {Math.round(employeeOut.tips * 100) / 100}₪
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Employee;
