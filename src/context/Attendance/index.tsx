import React, { createContext, useState, useEffect } from "react";
import useFetchAttendance from "../../hooks/useFetchAttendance";

const AttendanceContext = createContext<any>(null);

type props = {
    children: React.ReactNode
}
const AttendanceProvider = ({ children }: props) => {
    const { fetch } = useFetchAttendance();
    
    const [searchText, setSearchText] = useState<string>('');
    const [filteredAttributes, setFilteredAttributes] = useState<TFilterAttr>({
        party: null,
        state: null
    })
    const [allAttendance, setAllAttendances] = useState<TAttendance[]>([]);
    
    const [pagination, setPagination] = useState<number>(1);
    const pageSize = 25;
    const start = (pagination - 1) * pageSize;
    const end = pagination * pageSize - 1;

    const [allPages, setAllPages] = useState<number>(1);

    const attendancePaginated = allAttendance.filter(row => {
        const searchCriteria = searchText? 
            row.deputado.toLowerCase().includes(searchText.toLowerCase())
            : true;

        return searchCriteria;
    }).slice(start, end)

    const allParties = [
        ...new Set(allAttendance.map(row => row.deputado.split('(')[1].split(')')[0].split('-')[0]))
    ]
    const allStates = [
        ...new Set(allAttendance.map(row => row.deputado.split('(')[1].split(')')[0].split('-')[1]))
    ]

    const updateSearchText = (value: string) => {
        setSearchText(value);
        setPagination(1);
        setAllPages(() => {
            const attendanceFiltered = allAttendance.filter(row => 
                value? 
                row.deputado.toLowerCase().includes(value.toLowerCase())
                : true
            )

            return attendanceFiltered.length > pageSize ?  Math.ceil(attendanceFiltered.length / pageSize) : 1
        })
    };

    const updateFilters = (attr: string, value: string) => {
        let filteredAttr;

        setFilteredAttributes((oldAttr: TFilterAttr) => {
            const newAttr = {...oldAttr}
            newAttr[attr] = value
            filteredAttr = newAttr

            return newAttr
        })
    }

    useEffect(() => {
        fetch().then(res => {

            setAllAttendances(res)
            setAllPages(
                res.length > pageSize ?  Math.ceil(res.length / pageSize) : 1
            )
        })
    },[])

    return (
        <AttendanceContext.Provider
            value={{
                attendance: attendancePaginated,
                searchText,
                setSearchText,
                updateSearchText,
                pagination,
                setPagination,
                allPages,
                allParties,
                allStates
            } as TAttendanceContext}
        >
            {children}
        </AttendanceContext.Provider>
    )
}

export default AttendanceContext;
export { AttendanceProvider }