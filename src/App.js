import { useState } from "react";
import "./App.css";
import Employee from "./Components/Employee/Employee";
import Add from "./Components/Footer/Add";
import Header from "./Components/Header/Header";
import Logo from "./Components/Logo/Logo";

function App() {
    const [index, setIndex] = useState(1);
    const [moneyDetails, setMoneyDetails] = useState({
        allTips: 0,
        minimum: 40,
        perHour: 0,
        totalHours: 0,
    });

    const employee = {
        index: 0,
        name: "",
        start: "",
        end: "",
        hours: 0,
        salary: 0,
        tips: 0,
    };

    const [employees, setEmployees] = useState([{ ...employee, index: 0 }]);

    function add() {
        setIndex(index + 1);
        const newEmployee = { ...employee };
        newEmployee.index = index;
        setEmployees([...employees, newEmployee]);
    }

    function remove(index, hours) {
        moneyDetails.totalHours -= hours;
        setMoneyDetails({ ...moneyDetails });
        setEmployees(employees.filter((emp) => emp.index !== index));
        // calculateSalaries()
    }

    function updateEmployee(index, detail, value) {
        const emp = employees.find((emp) => emp.index === index);
        emp[detail] = value;

        if (detail !== "name" && emp.start && emp.end) {
            moneyDetails.totalHours -= emp.hours;
            setMoneyDetails({ ...moneyDetails });
            emp.hours = calculateDifferenceHours(emp.start, emp.end);
            moneyDetails.totalHours += emp.hours;
            setMoneyDetails({ ...moneyDetails });
            setEmployees([...employees]);

            calculateSalaries();
        }
    }

    function calculateSalaries() {
        if (moneyDetails.totalHours) {
            moneyDetails.perHour =
                // moneyDetails.allTips / moneyDetails.totalHours <
                // moneyDetails.minimum
                //     ? moneyDetails.minimum
                //     :
                +(moneyDetails.allTips / moneyDetails.totalHours).toFixed(2);
            setMoneyDetails({ ...moneyDetails });

            for (const emp of employees) {
                emp.salary = +(emp.hours * moneyDetails.minimum).toFixed(2);
                emp.tips = +(
                    emp.hours * moneyDetails.perHour -
                    emp.salary
                ).toFixed(2);
            }

            setEmployees([...employees]);
        }
    }

    function calculateDifferenceHours(start, end) {
        start = start.split(":");
        end = end.split(":");
        start = +start[0] + +start[1] / 60;
        end = +end[0] + +end[1] / 60;
        return +(end - start + (end - start < 0 ? 24 : 0)).toFixed(2);
    }

    return (
        <div className="App">
            <Logo />

            <Header
                moneyDetails={moneyDetails}
                setMoneyDetails={setMoneyDetails}
                calculateSalaries={calculateSalaries}
            />

            {employees.map((emp, idx) => (
                <Employee
                    key={emp.index}
                    employee={emp}
                    remove={remove}
                    updateEmployee={updateEmployee}
                    idx={idx}
                />
            ))}

            <Add add={add} />
        </div>
    );
}

export default App;
