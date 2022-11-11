import "./Header.css";

function Header({ moneyDetails, onChange }) {
    function handleChanges(e) {
        onChange({[e.target.name]: e.target.value});
    }

    return (
        <div className="header">
            <div className="row">
                <div>
                    שכר מינימום: ₪{" "}
                    <input
                        type="number"
                        name="minimum"
                        min={0}
                        value={moneyDetails.minimum}
                        step="0.5"
                        onChange={handleChanges}
                    />
                </div>
                <div>
                    אחוז הורדה מאשראי: %{" "}
                    <input
                        type="number"
                        name="percent"
                        min={0}
                        max= {100}
                        value={moneyDetails.percent}
                        onChange={handleChanges}
                    />
                </div>
            </div>

            <div className="row">
                <div>
                    טיפ מזומן: ₪{" "}
                    <input
                        type="number"
                        name="cash"
                        min={0}
                        value={moneyDetails.cash}
                        onChange={handleChanges}
                    />
                </div>
                <div>
                    טיפ אשראי: ₪{" "}
                    <input
                        type="number"
                        name="credit"
                        min={0}
                        value={moneyDetails.credit}
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
