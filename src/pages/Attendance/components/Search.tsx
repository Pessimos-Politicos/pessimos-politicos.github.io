import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { 
    InputAdornment, 
    Paper, 
    TextField,
    IconButton,
    Button 
} from '@mui/material';
import { useContext } from 'react';
import AttendanceContext from '../../../context/Attendance';
import styled from 'styled-components';
import FilterContainer from './FilterContainer';


const Search = () => {
    const { searchText, updateSearchText } = useContext(AttendanceContext);
    return (
        <Paper 
            elevation={1}
            sx={{ 
                padding: '.5rem',
                
            }}
        >
            <Content>
                <TextField 
                    id="outlined-basic" 
                    label="Pesquisar" 
                    variant="outlined" 
                    size="small"
                    aria-label="Pesquisar"
                    sx={{ flex: 1 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}

                    value={searchText}
                    onChange={(e) => updateSearchText(e.target.value)}
                />
                <IconButton
                    aria-label="filtrar"
                >
                    <FilterAltIcon />
                </IconButton>
            </Content>
            <Content>
                <FilterContainer />
            </Content>
        </Paper>
    )
}

export default Search

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    column-gap: 1rem;
`