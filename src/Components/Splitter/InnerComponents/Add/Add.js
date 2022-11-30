import './Add.css'

function Add({add, reset}) {
  return (
    <div className='add'>
        <button className='addBtn' onClick={add}>
            הוסף מלצר
        </button>

        <button className='addBtn reset' onClick={reset}>
            אפס הכל
        </button>
    </div>
  )
}

export default Add