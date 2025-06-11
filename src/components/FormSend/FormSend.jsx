import React, { useState } from 'react'
import { salary_stats } from '../../data/salary_stats'

import "./formsend.scss"


export const FormSend = () => {

  const [salaryFrom, setSalaryFrom] = useState('')
  const [salaryTo, setSalaryTo] = useState('')


  const handleGetSalary = (e) => {
    e.preventDefault()

    const selectedPosition = document.getElementById("vacancy-select").value
    console.log(selectedPosition)

    salary_stats.forEach((item) => {
      if (item.position == selectedPosition) {
        setSalaryFrom(item.salary_from)
        setSalaryTo(item.salary_to)
      }
    })
  }

  const handleClearSalary = (e) => {
    e.preventDefault()
    setSalaryFrom('')
    setSalaryTo('')
    // document.getElementById("vacancy-select").value = ''
  }

  const handleClearSalaryBtn = (e) => {
    handleClearSalary(e)
  
    document.getElementById("vacancy-select").value = ''
  }




  return (

    <div className='formsend'>

      <form>
        <label htmlFor="vacancy-select">Вашa профессия: </label>

        <select onChange={handleClearSalary} name="vacancy" id="vacancy-select">
          <option value="">-- </option>
          {salary_stats.map(({ position, salary_from, salary_to }) => (
            <option key={position} value={position} id={position}>{position}</option>
          ))}


          {/* <option value="">{data[0].salary_to}</option> */}
          {/* <option value="">-- </option>


          <option value="petersburg">Санкт-Петербург</option>
          <option value="samara">Самара</option>
          <option value="perm">Пермь</option>
          <option value="novosibirsk">Новосибирск</option> */}
        </select>

        <button onClick={handleGetSalary}>Узнать зарплату</button>

      </form>
      {salaryFrom &&
        <div>
          <div className='salary'>
            {Math.round(salaryFrom)} - {Math.round(salaryTo)}
          </div>

          <button onClick={handleClearSalaryBtn}>Сбросить</button>

        </div>

      }
    </div>
  )
}
