import { useState } from "react";
import "./App.css";
import Employee from "./Components/Employee/Employee";
import Add from "./Components/Footer/Add";
import Header from "./Components/Header/Header";
import Logo from "./Components/Logo/Logo";

let index = 0;

const employee = (index) => ({
    index,
    name: "",
    start: "",
    end: "",
    hours: 0,
    salary: 0,
    tips: 0,
});

function calculateDifferenceHours(start, end) {
    start = start.split(":");
    end = end.split(":");
    start = +start[0] + +start[1] / 60;
    end = +end[0] + +end[1] / 60;
    return +(end - start + (end - start < 0 ? 24 : 0)).toFixed(2);
}

function calculateSalaries({ moneyDetails, employees }) {
    const nextEmployees = [...employees];
    const nextMoneyDetails = { ...moneyDetails };
    if (nextMoneyDetails.totalHours) {
        nextMoneyDetails.perHour = +(
            nextMoneyDetails.allTips / nextMoneyDetails.totalHours
        ).toFixed(2);

        for (const emp of nextEmployees) {
            emp.salary = +(emp.hours * nextMoneyDetails.minimum).toFixed(2);
            emp.tips = +(
                emp.hours * nextMoneyDetails.perHour -
                emp.salary
            ).toFixed(2);
        }
    }
    return {
        calculatedMoneyDetails: nextMoneyDetails,
        updatedEmployees: nextEmployees,
    };
}

function App() {
    const [moneyDetails, setMoneyDetails] = useState({
        allTips: 0,
        minimum: 40,
        perHour: 0,
        totalHours: 0,
    });

    const [employees, setEmployees] = useState([employee(index)]);

    function add() {
        index++;
        setEmployees([...employees, employee(index)]);
    }

    function updateEmployee(index, detail, value) {
        let nextEmployees = [...employees];
        const employeeIndex = nextEmployees.findIndex(
            (emp) => emp.index === index
        );
        const nextEmployee = { ...nextEmployees[employeeIndex] };
        nextEmployee[detail] = value;
        nextEmployees[employeeIndex] = nextEmployee;

        if (detail !== "name" && nextEmployee.start && nextEmployee.end) {
            const nextMoneyDetails = { ...moneyDetails };
            nextMoneyDetails.totalHours -= nextEmployee.hours;
            nextEmployee.hours = calculateDifferenceHours(
                nextEmployee.start,
                nextEmployee.end
            );
            nextMoneyDetails.totalHours += nextEmployee.hours;
            const { calculatedMoneyDetails, updatedEmployees } =
                calculateSalaries({
                    moneyDetails: nextMoneyDetails,
                    employees: nextEmployees,
                });
            nextEmployees = updatedEmployees;
            setMoneyDetails(calculatedMoneyDetails);
        }

        setEmployees(nextEmployees);
    }

    function remove(index, hours) {
        const nextMoneyDetails = { ...moneyDetails };
        nextMoneyDetails.totalHours = nextMoneyDetails.totalHours - hours;
        const { calculatedMoneyDetails, updatedEmployees } = calculateSalaries({
            nextMoneyDetails,
            employees,
        });
        setMoneyDetails(calculatedMoneyDetails);
        setEmployees(updatedEmployees);
    }

    console.log({ moneyDetails });
    console.log({ employees });

    return (
        <div className="App">
            <Logo />

            <Header
                moneyDetails={moneyDetails}
                onChange={(nextValue) => {
                    const { calculatedMoneyDetails, updatedEmployees } =
                        calculateSalaries({
                            employees,
                            moneyDetails: { ...moneyDetails, ...nextValue },
                        });
                    setEmployees(updatedEmployees);
                    setMoneyDetails(calculatedMoneyDetails);
                }}
            />

            {employees.map((emp, idx) => (
                <Employee
                    key={emp.index}
                    employee={emp}
                    remove={remove}
                    onChange={(detail, value) =>
                        updateEmployee(emp.index, detail, value)
                    }
                    idx={idx}
                />
            ))}

            <Add add={add} />
        </div>
    );
}

export default App;
