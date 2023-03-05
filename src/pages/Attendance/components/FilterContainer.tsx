import styled from "styled-components"
import { InputLabel, MenuItem, FormControl, Select, SelectChangeEvent  } from '@mui/material';
import { useContext } from 'react';
import AttendanceContext from "../../../context/Attendance";

const FilterContainer = () => {
    const { allParties, allStates } = useContext(AttendanceContext);

    return (
        <Container>
            <FormControl 
                sx={{flex: 1}}
            >
                <InputLabel id="partido-label">Partido</InputLabel>
                <Select
                    labelId="partido-label"
                    id="partido-select"
                    value={''}
                    label="partido"
                    aria-label="Partido"
                    onChange={(e: SelectChangeEvent) => console.log(e.target.value)}
                    size="small"
                >
                    {
                        allParties.map((party: string) => 
                            <MenuItem 
                                value={party}
                                key={party}
                            >
                                {party}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
            <FormControl 
                sx={{flex: 1}}
            >
                <InputLabel id="estado-label">Estado</InputLabel>
                <Select
                    labelId="estado-label"
                    id="estado-select"
                    value={''}
                    label="Estado"
                    aria-label="Estado"
                    onChange={(e: SelectChangeEvent) => console.log(e.target.value)}
                    size="small"
                >
                    {
                        allStates.map((state: string) => 
                            <MenuItem 
                                value={state}
                                key={state}
                            >
                                {state}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </Container>
    )
}

export default FilterContainer

const Container = styled.div`
    margin-top: .5rem;
    width: 100%;
    display: flex;
`