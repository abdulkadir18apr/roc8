import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData, initializeUserPreferences, setAgeFilter, setDateFilters, setGenderFilter,  } from '../../reducers/dataSlice'

import { v4 as uuidv4 } from 'uuid';

import "./dashboard.css"

import { DateRangeSelector } from '../../components/DataRangeSelector'
import { CalendarDays } from 'lucide-react';
import { Cookies } from '../../components/Cookies'
import Charts from './Charts'

export  function Dashboard(){
    const [copy,setCopy]=useState(false)
    const {status,data,filters}=useSelector((state)=>state.data)
    console.log(filters)

    const handleAgeFilterChange = (item) => {
        dispatch(setAgeFilter(item))
      };
      const handleGenderFilterChange = (item) => {
        dispatch(setGenderFilter(item))
      };

      

    const [dateRange,setDateRange]=useState(false);
    const handleClose=()=>{
        setDateRange(false)
    }

    
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchData())

    },[dispatch])

    useEffect(()=>{
        dispatch(initializeUserPreferences())
    },[dispatch])


    

    const handleDateRange=({startDate,endDate})=>{
        dispatch(setDateFilters({startDate:startDate,endDate:endDate}))
    }

    

    //Line chart filters

    

    const handleShareChart=async()=>{
        const chartId=uuidv4();
        const url=`http://localhost:3000/view/${chartId}`
        try {
            const res=await axios.post("https://data-vizz.abdulkadir19.repl.co/api/data/addChart",{chartId,filters},{headers:{"authorization":localStorage.getItem("token")}})
            await navigator.clipboard.writeText(url);
            setCopy(true)
          } catch (err) {
            setCopy(false)
          } 
    }
    

  return (
    <div className='dashboard'>
        <h1>Dashboard</h1>
        <div className="filterContainer">
            <h2>Filters:- </h2>
                <div className="filters">
                    <label htmlFor="age">Age:</label>
                    <div className="checkboxes">
                        <select name="" id="" onChange={(e)=>handleAgeFilterChange(e.target.value)} value={filters.age}>
                            <option value="">None</option>
                            <option value="15-25" >15-25</option>
                            <option value=">25">{`>`}25</option>
                        </select>
                    </div>
        
                </div>
            <div className="filters">
                    <label htmlFor="age">Gender:</label>
                    <div className="checkboxes">
                        <select name="" id="" onChange={(e)=>handleGenderFilterChange(e.target.value)} value={filters.gender}>
                            <option value="">none</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                </div>
            </div>
            <div className="filters">
                <h2>DataRange</h2>
                <div className="checkboxes" >
                    <CalendarDays onClick={()=>setDateRange(true)}/>
                    {dateRange && <DateRangeSelector onSelectDateRange={handleDateRange} handleClose={handleClose}/>}
                </div>
            </div>
        </div>
        <Charts/>
        {/* <div className="dashboard-container">
            
           
          
            <div className="barchart">
                
               { status==='success' && filterData.length===0 && <h3>No Data Found</h3>}
               { status==='success' && filterData.length !==0 && <BarChart data={filterData} onBarClick={handleBarClick}/>}
               
            </div>
            <div className="barchart">
           
                { status==='success' && lineChartFilteredData.length===0 && <h3>No Data Found</h3>}
               { status==='success' && lineChartFilteredData.length !==0 && <LineChart data={lineChartFilteredData} category={filters.category}/>}
            </div>
           
        </div> */}
        <button style={{padding:"10px",backgroundColor:"black",color:"white",border:"none",borderRadius:"10px"}} onClick={handleShareChart}>{!copy?`share this Chart`:"Link Copied"}</button>

        <Cookies/>
      
    </div>
  )
}
