import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../DAL/API'
import './Employee.css'

function Employee({props, onChange, dontShow}) {
  const nav = useNavigate()
    const [tookTip, setTookTip] = useState(props.took_tip? true : false)

    const handleClick = ()=> {
        onChange(+props.tips* ( tookTip ? 1 : (-1) ))
        setTookTip(!tookTip)
        !API.changeTookTip({
            name: props.name,
            date: props.date,
            tookTip: tookTip ? 0 : 1 //its revers because its before the render
        })
        && alert("אירעה שגיאה")
    }

    const dateClick = ()=> {
      nav(`/calculator/${props.date}`)
    }

  return (
    <tr className='employeeData'>
        {Object.entries(props).splice(2).map((prop, idx)=> {
          if (prop[0] === "date"){
            return <td key={idx} className='tookTip' onClick={dateClick}>{prop[1]}</td>
          }
          else if (prop[0] === "took_tip"){
            return <td key={idx} className='tookTip' onClick={handleClick}>{tookTip? "V" : "X"}</td>
          }
          else if (prop[0] === "expense" ||  prop[0] === "salary" ||  prop[0] === "perHour" ||  prop[0] === "tips"){
            return <td key={idx}> {props[1] < 0 ? 0 : Math.round(+prop[1]*100)/100}</td>
          } 
        return <td key={idx}>{prop[1]}</td>
      })}    
    </tr>
  )
}

export default Employee