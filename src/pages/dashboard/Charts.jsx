import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDataByAge, filterDataByDate, filterDataByGender } from '../../utils/filterData';
import { setLineChartCategory } from '../../reducers/dataSlice';
import { BarChart } from "../../components/BarChart";
import { LineChart } from "../../components/LineChart";
import "./dashboard.css"

export default function Charts() {

    const {status,data,filters}=useSelector((state)=>state.data);
    const dispatch=useDispatch();
    let filterData=filterDataByDate(data,filters.startDate,filters.endDate);
    filterData=filterDataByAge([...filterData],filters.age)
    filterData=filterDataByGender([...filterData],filters.gender)

    const handleBarClick=(bar,event)=>{
        const xAxisValue = bar.indexValue;
        dispatch(setLineChartCategory(xAxisValue))
    }

    //Line chart filters

    let lineChartFilteredData=filterDataByDate(data,filters.startDate,filters.endDate);
    lineChartFilteredData=filterDataByAge(lineChartFilteredData,filters.age)
    lineChartFilteredData=filterDataByGender(lineChartFilteredData,filters.gender)

  return (
    <div className="dashboard-container" >

            <div className="barchart">
                
               { status==='success' && filterData.length===0 && <h3>No Data Found</h3>}
               { status==='success' && filterData.length !==0 && <BarChart data={filterData} onBarClick={handleBarClick}/>}
               
            </div>
            <div className="barchart">
           
                { status==='success' && lineChartFilteredData.length===0 && <h3>No Data Found</h3>}
               { status==='success' && lineChartFilteredData.length !==0 && <LineChart data={lineChartFilteredData} category={filters.category}/>}
            </div>
           
        </div>
  )
}
