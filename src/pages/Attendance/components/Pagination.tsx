import styled from "styled-components"
import { default as PaginationMUI } from '@mui/material/Pagination';
import AttendanceContext from "../../../context/Attendance";
import { useContext } from 'react';

const Pagination = () => {
    const { allPages, pagination, setPagination } = useContext(AttendanceContext);

    return (
        <Container>
            <PaginationMUI 
                count={allPages} 
                page={pagination?? 1}
                onChange={(e, value) => setPagination(value)}
                size="medium"
            />
        </Container>
    )
}

export default Pagination

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 1rem;
`