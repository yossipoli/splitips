import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../DAL/API'
import './Employee.css'

function Employee({props, onChange, handleRemove}) {
  const nav = useNavigate()
    const [tookTip, setTookTip] = useState(props["לקח טיפ"])

    const handleClick = ()=> {
        onChange(+props["טיפ"]* ( tookTip ? 1 : (-1) ))
        setTookTip(!tookTip)
        !API.changeTookTip({
            name: props["שם"],
            date: props["תאריך"],
            tookTip: tookTip ? 0 : 1 //its revers because its before the render
        })
        && alert("אירעה שגיאה")
    }

    const dateClick = ()=> {
      nav(`/calculator/${props["תאריך"]}`)
    }

  return (
    <tr className='employeeData'>
        {Object.entries(props).map((prop, idx)=> {
          // if (prop[0] === "id"){
          //   return <td key={idx} className='tookTip' onClick={(prop)=> handleRemove(prop[1])}> מחק </td>
          // }
          if (prop[0] === "תאריך"){
            return <td key={idx} className='tookTip' onClick={dateClick}>{prop[1]}</td>
          }
          else if (prop[0] === "לקח טיפ"){
            return <td key={idx} className='tookTip' onClick={handleClick}>{tookTip? "V" : "X"}</td>
          }
          else if (prop[0] === "הוצאות" ||  prop[0] === "שכר" ||  prop[0] === "שכר שעתי" ||  prop[0] === "טיפ"){
            return <td key={idx}> {Math.round(+prop[1]*100)/100}</td>
          } 
        return <td key={idx}>{prop[1]}</td>
      })}    
    </tr>
  )
}

export default Employee