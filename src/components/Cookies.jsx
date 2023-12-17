import React from 'react'
import "./css/cookies.css"
import { clearUserPreferences, saveUserPreferences } from '../reducers/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
export  function Cookies() {
    const {filters}=useSelector((state)=>state.data)
    const dispatch=useDispatch()
    const handleSaveCookies=()=>{
        
        const filter={age:filters.age,gender:filters.gender}
        const dates={startDate:filters.startDate,endDate:filters.endDate}
        dispatch(saveUserPreferences(filter,dates))
    }
    const handleClearCookies=()=>{
        dispatch(clearUserPreferences())
    }
  return (
    <div className='cookies'>
        <h2>Cookies!! Can We Save Your Preferences??</h2>
        <button onClick={handleSaveCookies}>Save Preferences</button>
      <button onClick={handleClearCookies}>Clear Preferences</button>
    </div>
  )
}
