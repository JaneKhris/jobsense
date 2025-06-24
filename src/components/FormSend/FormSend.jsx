import React, { useState, useEffect } from 'react'
import { salary_stats } from '../../data/salary_stats'

import "./formsend.scss"

import { formatString } from '../../utils/formatStr'
import { Skills } from '../Skills/Skills'


export const FormSend = () => {

  const [salaryFrom, setSalaryFrom] = useState('')
  const [salaryTo, setSalaryTo] = useState('')
  // const [currency, setCurrency] = useState('')

  // const [professions, setProfessions] = useState([])


  // useEffect(() => {
  //   fetch("http://localhost:8001/api/v1/professions/")
  //     .then((response) => response.json())
  //     .then(item => {
  //       setProfessions(item.professions)
  //     })
  // }, [])


  const handleGetSalary = (e) => {
    e.preventDefault()
    console.log(document.getElementById("vacancy-select").value)
    console.log(document.getElementById("exp-select").value)
    console.log(document.getElementsByClassName('skill'))

    if (!document.getElementById("vacancy-select").value) {
      alert('не выбрана профессия')
    } else {
      if (!document.getElementById("exp-select").value) {
        alert('не выбран опыт')
      } else {
        if (document.getElementsByClassName('skill').length == 0) {
          alert('не выбраны навыки')
        } else {


          const selectedPosition = document.getElementById("vacancy-select").value

          // fetch(`http://localhost:8001/api/v1/salary/${selectedPosition}/`)
          //   .then((response) => response.json())
          //   .then(item => {
          //     console.log(item.profession)
          //     setSalaryFrom(item.salary_from)
          //     setSalaryTo(item.salary_to)
          //     setCurrency(item.currency)
          //   })



          salary_stats.forEach((item) => {
            if (item.position == selectedPosition) {
              setSalaryFrom(item.salary_from)
              setSalaryTo(item.salary_to)
            }
          })
        }
      }
    }


  }

  const handleClearSalary = (e) => {
    e.preventDefault()
    setSalaryFrom('')
    setSalaryTo('')
  }

  const handleClearSalaryBtn = (e) => {
    handleClearSalary(e)

    document.getElementById("vacancy-select").value = ''
  }




  return (

    <div className='formsend'>

      <div>
        <label htmlFor="vacancy-select">Вашa профессия: </label>

        <select onChange={handleClearSalary} name="vacancy" id="vacancy-select">
          <option value="">--</option>
          {/* {professions.map((profession) => (
            <option key={profession} value={profession} id={profession}>{profession}</option>
          ))} */}
          {salary_stats.map(({ position, salary_from, salary_to }) => (
            <option key={position} value={position} id={position}>{position}</option>
          ))}

        </select>
        <label htmlFor="exp-select">Ваш опыт: </label>

        <select name="exp" id="exp-select">
          <option value="">--</option>
          <option value="0">без опыта</option>
          <option value="1-3">1-3 года</option>
          <option value="3-6">3-6 лет</option>
          <option value="6">более 6 лет</option>

        </select>

        <Skills />



        <button className='btn get-salary' onClick={handleGetSalary}>Узнать зарплату</button>

      </div>
      {salaryFrom &&
        <div>
          {/* <div className='salary'>
            {(Math.round(salaryFrom))} - {Math.round(salaryTo)} {currency}
          </div> */}
          <div className='salary'>
            {formatString((Math.round(salaryFrom / 1000) * 1000).toString())} - {formatString((Math.round(salaryTo / 1000) * 1000).toString())} руб.
          </div>


          <button className='btn clear' onClick={handleClearSalaryBtn}>Сбросить</button>

        </div>

      }
    </div>
  )
}
