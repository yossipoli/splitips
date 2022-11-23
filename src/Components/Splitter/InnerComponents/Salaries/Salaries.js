import "./Salaries.css";

function MoneyDetails({ salariesIn, perHour, onChange }) {
    const handleChanges = (e)=> {
        let value = e.target.value < 0 ? 0 : e.target.value
        if (e.target.name === "percent"){
            if (value>100) value = 100
        }
        onChange(e.target.name, value);
    }

    return (
        <div>
            <div className="salaries">
                <div className="col">
                    <div>
                        שכר מינימום:
                        <div>
                            ₪{" "}
                            <input
                                type="number"
                                name="minimum"
                                min={0}
                                value={salariesIn.minimum}
                                step="0.5"
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                    <div>
                        טיפ מזומן:
                        <div>
                            ₪{" "}
                            <input
                                type="number"
                                name="cash"
                                min={0}
                                value={salariesIn.cash ? salariesIn.cash : ""}
                                placeholder="0"
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div>
                        אחוז הורדה מאשראי:
                        <div>
                            %{" "}
                            <input
                                type="number"
                                name="percent"
                                min={0}
                                max={100}
                                value={salariesIn.percent}
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                    <div>
                        טיפ אשראי:
                        <div>
                            ₪{" "}
                            <input
                                type="number"
                                name="credit"
                                min={0}
                                value={
                                    salariesIn.credit ? salariesIn.credit : ""
                                }
                                placeholder="0"
                                step="0.5"
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                שכר שעתי: ₪ <label>{Math.round(perHour * 100) / 100}</label>
            </div>
        </div>
    );
}

export default MoneyDetails;
