type TAttendance = {
    deputado: string,
    presencas: number, 
    ausencias_justificadas: number, 
    ausencias_nao_justificadas: number
}

type TAttendanceContext = {
    attendance: TAttendance[],
    searchText: string,
    setSearchText: React.Dispatch<React.SetStateAction<string>>
} 

type TFilterAttr = {
    party: string | null,
    state: string | null,
    [key: string]: string | null
}