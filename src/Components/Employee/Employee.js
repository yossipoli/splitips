import "./Employee.css";
import { FaTrash } from "react-icons/fa";

function Employee({ idx, employee, remove, onChange }) {
    const updateEmployee = (e) => {
        onChange(e.target.name, e.target.value);
    };
    return (
        <div className="employee">
            <div>
                <div className="name row">
                    <div className="remove row">
                        <button
                            onClick={() =>
                                remove(employee.index, +employee.hours)
                            }
                            className="removeBtn"
                        >
                            <FaTrash />
                        </button>
                    </div>
                    שם {idx + 1}:
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={updateEmployee}
                    />
                </div>
                <div className="row">
                    <div className="startTime">
                        כניסה:
                        <input
                            name="start"
                            type="time"
                            value={employee.start}
                            onChange={updateEmployee}
                        />
                    </div>
                    <div className="endTime">
                        יציאה:
                        <input
                            name="end"
                            type="time"
                            value={employee.end}
                            onChange={updateEmployee}
                        />
                    </div>
                </div>
                <div className="row">
                    <label className="hoursLabel">
                        שעות:{" "}
                        <span className="hoursSpan">{employee.hours}</span>
                    </label>
                    <label className="hoursLabel">
                        שכר:{" "}
                        <span className="hoursSpan">{employee.salary}₪</span>
                    </label>
                    <label className="hoursLabel">
                        טיפ:{" "}
                        <span
                            style={{ color: employee.tips < 0 && "red" }}
                            className="hoursSpan"
                        >
                            {employee.tips}₪
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Employee;
