import axios from 'axios';
import { Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { initializeFilters } from '../../reducers/dataSlice';
import { Dashboard } from '../dashboard/dashboard';
import Charts from '../dashboard/Charts';

export  function ChartView() {
    const {chartId}=useParams();
    console.log(chartId);
    const [chart,setChart]=useState([]);
    const dispatch=useDispatch();
    const {filters}=useSelector((state)=>state.data)
    const fetchChart=async()=>{
        try{
            const res=await axios.get(`https://data-vizz.abdulkadir19.repl.co/api/data/getChart/${chartId}`,{headers:{authorization:localStorage.getItem("token")}});
            setChart(res.data.chart)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchChart();
    },[])

    useEffect(()=>{
        const startDate=chart.filters?.startDate?chart.filters.startDate:""
        const endDate=chart.filters?.endDate?chart.filters.endDate:""
        const age=chart.filters?.age?chart.filters.age:""
        const gender=chart.filters?.gender?chart.filters.gender:""
        dispatch(initializeFilters({startDate,endDate,age,gender}))
    },[dispatch,chart])

    

  return (
    <div>
      <h2>View Chart</h2>
      
                <Dashboard/>
            

    </div>
  )
}
