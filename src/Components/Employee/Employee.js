// import { useState } from "react";
import "./Employee.css";
import {FaTrash} from 'react-icons/fa'

function Employee({ idx, employee, remove, updateEmployee }) {
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
                            <FaTrash/>
                        </button>
                    </div>
                    שם {idx + 1}:
                    <input
                        type="text"
                        name="name"
                        defaultValue={employee.name}
                        onChange={(e) =>
                            updateEmployee(
                                employee.index,
                                e.target.name,
                                e.target.value
                            )
                        }
                    />
                </div>
                <div className="row">
                    <div className="startTime">
                        כניסה:
                        <input
                            name="start"
                            type="time"
                            defaultValue={employee.start}
                            onChange={(e) =>
                                updateEmployee(
                                    employee.index,
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className="endTime">
                        יציאה:
                        <input
                            name="end"
                            type="time"
                            defaultValue={employee.end}
                            onChange={(e) =>
                                updateEmployee(
                                    employee.index,
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <label className="hoursLabel">
                        שעות:{" "}
                        <span className="hoursSpan">{employee.hours}</span>
                    </label>
                    <label className="hoursLabel">
                        שכר: {" "}
                        <span className="hoursSpan">{employee.salary}₪</span>
                    </label>
                    <label className="hoursLabel">
                        טיפ: {" "}
                        <span style={{color: (employee.tips<0)&& 'red'}} className="hoursSpan">{employee.tips}₪</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Employee;
