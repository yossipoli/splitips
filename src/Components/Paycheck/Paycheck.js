/* eslint-disable react-hooks/exhaustive-deps */
import './Paycheck.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { API } from '../../DAL/API'
import Employee from './PaycheckComponents/Employee'
import { useNavigate } from 'react-router-dom'

function Paycheck() {
    const nav = useNavigate()
    useEffect(()=>{
        (async function checkPermission() {
            !await API.checkCookie() && nav('/login')
        })()
    },[])
    
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

    const handleChangeTookTip = (tipChange)=> {
        setSum({...sum, tip: +sum.tip + tipChange})
    }

    useEffect(()=> {
        dates.first !== '' && dates.last !== '' &&
        (async function getData(){
            const res = await API.getPayDays(dates)
            setData(res)
        })()
    },[dates])

    useEffect(()=> {
        setShow(data.filter(emp=> emp.name.includes(name)))
    },[name, data])

    useEffect(()=> {
        const salary = show.reduce((sum, emp)=> sum + emp.salary, 0)
        const tip = show.reduce((sum, emp)=> sum + (!emp.took_tip ? emp.tips : 0), 0)
        const expense = show.reduce((sum, emp)=> sum + emp.expense, 0)
        setSum({salary, tip, expense})
    }, [show])

  return (
    <div className='paycheck'>
        <h1>שכר תקופתי</h1>

        <form>
            <div className="dates row">
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
                <div>
                    שם העובד
                </div>
                <input name='name' type="text" value={name} onChange={handleChangeName}/>
            </div>
        </form>

        {!show || !show.length ? <h4>אין מידע לגבי התאריכים המבוקשים</h4> : 
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>תאריך</th>
                            <th>שם</th>
                            <th>התחלה</th>
                            <th>סיום</th>
                            <th>סה"כ שעות</th>
                            <th>מינימום</th>
                            <th>שכר שעתי</th>
                            <th>שכר</th>
                            <th>טיפ</th>
                            <th>הוצאות</th>
                            <th>לקח טיפ</th>
                        </tr>
                    </thead>
                    <tbody>
                        { show[0] && show.map((emp, idx)=> <Employee key={idx} props={emp} onChange={handleChangeTookTip}/>) }
                    </tbody>
                </table>
            </div>
        }
        <div className='summery row'>
            <div>סה"כ משכורת: {Math.round(sum.salary*100)/100}₪</div>
            <div>סה"כ טיפים שלא שולמו: {Math.round(sum.tip*100)/100}₪</div>
            <div>סה"כ השלמות שבוצעו: {Math.round(sum.expense*100)/100}₪</div>
        </div>
        <div>
            <h4>נותר לתשלום {Math.round((sum.salary + sum.tip)*100)/100}</h4>
        </div>
    </div>
  )
}

export default Paycheck