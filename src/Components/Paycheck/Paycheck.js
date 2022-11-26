/* eslint-disable react-hooks/exhaustive-deps */
import './Paycheck.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { API } from '../../DAL/API'
import Employee from './PaycheckComponents/Employee'

function Paycheck() {
    const [name, setName] = useState("")
    const [dates, setDates] = useState({
        first: "",
        last: ""
    })
    const [data, setData] = useState([])
    const [show, setShow] = useState([])
    
    const [sum, setSum] = useState({
        tip: 0,
        expense: 0,
        salary: 0
    })

    const handleChangeDate = (e)=> {
        setDates({...dates, [e.target.name]: e.target.value})
    }

    const handleChangeName = (e)=> {
        setName(e.target.value)
    }

    const handleChangeTookTip = ()=> {
        // setShow([...show])
    }

    useEffect(()=> {
        (async function getData(){
            const res = await API.getPayDays(dates)
            setData(res)
        })()
    },[dates])

    useEffect(()=> {
        setShow(data.filter(emp=> emp["שם"].includes(name)))
    },[name, data])

    useEffect(()=> {
        const salary = show.reduce((sum, emp)=> sum + emp["שכר"], 0)
        const tip = show.reduce((sum, emp)=> sum + (!emp["לקח טיפ"] ? emp["טיפ"] : 0), 0)
        const expense = show.reduce((sum, emp)=> sum + emp["הוצאות"], 0)
        setSum({salary, tip, expense})
    }, [show])

  return (
    <div className='paycheck'>
        <h1>שכר תקופתי</h1>

        <form>
            <div className="row">
                <div>
                    <div>
                        תאריך התחלתי
                    </div>
                    <input name='first' type="date" value={dates.first} onChange={handleChangeDate}/>
                </div>    
                <div>
                    <div>
                        תאריך אחרון
                    </div>
                    <input name='last' type="date" value={dates.last} onChange={handleChangeDate}/>
                </div>
            </div>
            <div>
                שם העובד
                {" "}<input name='name' type="text" value={name} onChange={handleChangeName}/>
            </div>
        </form>

        {!show || !show.length ? <h4>אין מידע לגבי התאריכים המבוקשים</h4> : 
            <table>
                <thead>
                    <tr>
                        { show[0] && Object.keys(show[0]).map((title, idx)=> <th key={idx}>{title}</th>) }
                    </tr>
                </thead>
                <tbody>
                    { show[0] && show.map((emp, idx)=> <Employee key={idx} props={emp} onChange={()=> handleChangeTookTip()}/>) }
                </tbody>
            </table>
        }
        <div className='summery row'>
            <div>סה"כ משכורת: {sum.salary}₪</div>
            <div>סה"כ טיפים שלא שולמו: {sum.tip}₪</div>
            <div>סה"כ השלמות שבוצעו: {sum.expense}₪</div>
        </div>
        <div>
            <h4>נותר לתשלום {sum.salary + sum.tip}</h4>
        </div>
    </div>
  )
}

export default Paycheck