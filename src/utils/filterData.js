
function convertDateFormat(inputDate) {
   
    const parts = inputDate.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    
    
    const originalDate = new Date(year, month, day);
  
    
    const newYear = originalDate.getFullYear();
    const newMonth = ('0' + (originalDate.getMonth() + 1)).slice(-2); 
    const newDay = ('0' + originalDate.getDate()).slice(-2);
  
   
    const newDateString = `${newYear}/${newMonth}/${newDay}`;
  
    return newDateString;
  }
  
  
  


export const filterDataByDate=(data,startDate,endDate)=>{
    // console.log(startDate,endDate);
    if (!startDate || !endDate) {
        return data;
      }

      
  
      return ( data.filter(entry => {
        const entryDate = convertDateFormat(entry.Day);
       
        return new Date(entryDate) >= new Date(startDate) && new Date(entryDate) <= new Date(endDate);
      }))
}

export const filterDataByAge=(data,age)=>{
    if(age===""){
        return data
    }
    if(age===null || age===undefined){
        return data
    }
    let res=[]
    if(age==='15-25'){
        res=[...res,(data.filter((item)=>item.Age==='15-25'))];
    }
    if(age==='>25'){
        res=[...res,(data.filter((item)=>item.Age==='>25'))]
    }

   


    return res[0]

}
export const  filterDataByGender=(data,gender)=>{
    if(gender===""){
        return data
    }
    if(gender===null || gender===undefined){
        return data
    }
    let res=[]
    if(gender==='male'){
        res=[...res,(data.filter((item)=>item.Gender==='Male'))];
    }
    if(gender==='female'){
        res=[...res,(data.filter((item)=>item.Gender==='Female'))];
    }

   

    return res[0]
}
