import "./Header.css";

function Header({ moneyDetails, onChange }) {
    function handleChanges(e) {
        onChange({[e.target.name]: e.target.value});
    }

    return (
        <div className="header">
            <div className="row">
                <div>
                    סה"כ טיפים: ₪{" "}
                    <input
                        type="number"
                        name="allTips"
                        min={0}
                        value={moneyDetails.allTips}
                        onChange={handleChanges}
                    />
                </div>
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
            </div>

            <div>
                שכר שעתי: ₪ <label>{moneyDetails.perHour}</label>
            </div>
        </div>
    );
}

export default Header;
