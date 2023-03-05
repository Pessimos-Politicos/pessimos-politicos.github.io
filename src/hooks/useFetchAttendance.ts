import { ApiService } from "../service/api.service"

// TODO: Make this code just trigger a request do the API once
const useFetchAttendance = () => {

    const fetch = async() => {
        if(checkIfDataInLocalStorageHasToBeUpdated()) {
            const res = await getDataFromApi();
            return res 
        }

        const res = await getDataFromLocalStorage();
        return res 
    }

    const getDataFromLocalStorage = async() => {
        const storageData = localStorage.getItem('allAttendances');

        if(storageData) {
            return JSON.parse(storageData) as TAttendance[]
        }

        const res = await getDataFromApi();
        return res 
    }

    const getDataFromApi = async() => {
        const api = new ApiService();

        const result = await api.getAttendance();

        if(result.error) return []

        const data: any = result.data;

        localStorage.setItem('allAttendances', JSON.stringify(data.data))
        return data.data as TAttendance[]
    }

    const checkIfDataInLocalStorageHasToBeUpdated = () => {
        const currentWeekDay = new Date().getDay();
        return currentWeekDay >= 3 && currentWeekDay <= 5
    }

    return { fetch }
}

export default useFetchAttendance