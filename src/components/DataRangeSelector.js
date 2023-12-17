import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

export const GoogleCalendarTheme = {
  date: {
    background: '#fff',
    color: '#333',
  },
  daySelected: {
    background: '#007BFF',
    color: '#fff',
  },
  dayActive: {
    background: '#007BFF',
    color: '#fff',
  },
  monthAndYear: {
    color: '#333',
  },
  dateHover: {
    background: '#007BFF',
    color: '#fff',
  },
};

export const DateRangeSelector = ({ onSelectDateRange,handleClose}) => {
    
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    onSelectDateRange({startDate:ranges.selection.startDate,endDate:ranges.selection.endDate});
  };

  return (
    <div style={{ margin: '20px',position:"absolute",left:"0",zIndex:999 }}  >
        <button onClick={handleClose}>X</button>
      <DateRangePicker
        ranges={dateRange}
        onChange={handleSelect}
        theme={GoogleCalendarTheme} 
      />
    </div>
  );
};


