import React, { useEffect, useState } from 'react'
import { skills } from '../../data/skills'
import { subtractArray } from '../../utils/subtract'

import "./skills.scss"

export const Skills = () => {

    const [skillsList, setSkillsList] = useState([])
    const [skillsSuggested, setSkillsSuggested] = useState([])


    const handleSkillChange = (e) => {
        if (document.getElementById('suggested-list')) {
            document.getElementById('suggested-list').className = 'suggested-list'
        }
        if (e.target.value) {
            const array1 = skills.filter(str => str.startsWith(e.target.value.toLowerCase()))
            const array2 = subtractArray(array1, skillsList)
            if (!array2[0]) {
                setSkillsSuggested(['Нет совпадений'])
            } else {
                setSkillsSuggested(array2)
            }
        } else {
            setSkillsSuggested([])
        }
    }




    const handleSelectSkill = (e) => {
        if (e.target.textContent != 'Нет совпадений') {
            setSkillsList(skillsList.concat([e.target.textContent]))
            setSkillsSuggested(skillsSuggested.filter((item) => item != e.target.textContent))
            if (skillsSuggested == []) {
                e.target.parentElement.remove()
            }
        }
    }

    
    const handleDeleteSkill = (e) => {
        const skillName = e.target.parentElement.firstChild.textContent
        setSkillsList(skillsList.filter((item) => item != skillName))
    }


    const handleHideSuggestedList = (e) => {
        e.target.className = e.target.className === "suggested-list" ? "suggested-list inactive" : "suggested-skill";
    }

    return (
        <div className="skills" id="skills">
            <div className='section-title'>Навыки:</div>

            <div className='input-container' >
                <input type="text"
                    className='skills-input'
                    id='skills-input'
                    placeholder='введите навык'
                    onChange={handleSkillChange}
                    onMouseEnter={(e) => { console.log('enter'), handleSkillChange(e) }}
                />
                {skillsSuggested[0] &&
                    <div
                        className='suggested-list'
                        id='suggested-list'
                        onMouseLeave={handleHideSuggestedList}
                    >
                        {skillsSuggested.map((skill) => (
                            <div
                                key={skill}
                                className='suggested-skill'
                                onClick={handleSelectSkill}>{skill}
                            </div>

                        ))}
                    </div>
                }
            </div>



            {skillsList[0] &&
                <div className='skills-list'>
                    {skillsList.map((skill) => (
                        <div
                            className='skill'
                            key={skill} >
                            <div className='skill-name'>{skill}</div>
                            <div className='delete-skill' onClick={handleDeleteSkill}>✖</div></div>

                    ))}

                </div>}

        </div>
    )
}
