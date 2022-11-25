/* eslint-disable react-hooks/exhaustive-deps */
import './Paycheck.css'
import React from 'react'
import { useState, useEffect } from 'react'
import { API } from '../../DAL/API'
import Employee from './PaycheckComponents/Employee'

function Paycheck({values}) {
    const [data, setData] = useState([])

    useEffect(()=> {
        (async function getData(){
            const res = await API.getPayDays(values)
            setData(res)
        })()
    },[])

  return (
    <div className='paycheck'>
        <h1>שכר תקופתי</h1>
        {!data ? <h4>אין מידע לגבי התאריכים המבוקשים</h4> : 
            <table>
                <thead>
                    <tr>
                        { data[0]&& Object.keys(data[0]).slice(2).map((title, idx)=> <th key={idx}>{title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(emp=> <Employee key={emp.id} props={emp}/>)}
                </tbody>
            </table>
        }
    </div>
  )
}

export default Paycheck