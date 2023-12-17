import Cookies from 'js-cookie';

const FILTER_COOKIE='user_filters'
const DATE_COOKIE='date_filters'

export const setUserPreferenceInCookies=(filters,dates)=>{
    console.log("savings..cookies")
    Cookies.set(FILTER_COOKIE,JSON.stringify(filters))
    Cookies.set(DATE_COOKIE,JSON.stringify(dates))

}
export const getUserPreferencesFromCookies = () => {
    const filters = Cookies.get(FILTER_COOKIE);
    const dates = Cookies.get(DATE_COOKIE);
  
    return {
      filters: filters ? JSON.parse(filters) : {},
      dates: dates ? JSON.parse(dates) : {},
    };
  };
  export const clearUserPreferencesCookies = () => {
    Cookies.remove(FILTER_COOKIE);
    Cookies.remove(DATE_COOKIE);
  };