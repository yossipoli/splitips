import "./Header.css";

function Header({ moneyDetails, setMoneyDetails, calculateSalaries }) {
    function handleChanges(e) {
        moneyDetails[e.target.name] = e.target.value;
        setMoneyDetails({ ...moneyDetails });
        calculateSalaries();
    }

    return (
        <div className="header" onChange={calculateSalaries}>
            <div className="row">
                <div>
                    סה"כ טיפים: ₪{" "}
                    <input
                        type="number"
                        name="allTips"
                        min={0}
                        defaultValue={moneyDetails.allTips}
                        onChange={handleChanges}
                    />
                </div>
                <div>
                    שכר מינימום: ₪{" "}
                    <input
                        type="number"
                        name="minimum"
                        min={0}
                        defaultValue={moneyDetails.minimum}
                        step="0.5"
                        onChange={handleChanges}
                    />
                </div>
            </div>

            <div>
                שכר שעתי: ₪ <label>{moneyDetails.perHour}</label>
            </div>
        </div>
    );
}

export default Header;
