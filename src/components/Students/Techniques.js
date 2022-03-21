import { useState, useEffect } from 'react';
import './Techniques.css'
import { Box, Chip, TextField, Tooltip } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import techniques from '../../assets/techniques';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';

function Techniques(props){
    const [pageSize, setPageSize] = useState(8);
    const [tabValue, setTabValue] = useState('select');
    const [minSkill, setMinSkill] = useState(0)
    const [maxSkill, setMaxSkill] = useState(2)
    const [searchText, setSearchText] = useState('')
    const [learned, setLearned] = useState('outlined');
    const [mastered, setMastered] = useState('outlined');
    const [rows, setRows] = useState(techniques.techniques.map((technique, index) => {
        let rowObj = {
            id: technique.number,
            technique: `${technique.number} - ${technique.title}`,
        }
        props.students.forEach((student) => {
            rowObj[student.user_id] = student[`c${index+1}`]
        })
        return rowObj
    }));
    const [defaultRows, setDefaultRows] = useState(techniques.techniques.map((technique, index) => {
        let rowObj = {
            id: technique.number,
            technique: `${technique.number} - ${technique.title}`,
        }
        props.students.forEach((student) => {
            rowObj[student.user_id] = student[`c${index+1}`]
        })
        return rowObj
    }));

    useEffect(()=>{
        filterRows()
    }, [searchText, minSkill, maxSkill])

    const changeLearned = (newType) => {
        if(newType === 'outlined'){
            if(mastered === 'outlined'){
                setMinSkill(0)
                setMaxSkill(2)
            } else if(mastered === 'filled'){
                setMinSkill(2)
                setMaxSkill(2)
            } else if(mastered === 'error'){
                setMinSkill(0)
                setMaxSkill(1)
            }
        } else if(newType === 'filled' ){
            if(mastered === 'outlined'){
                setMinSkill(1)
                setMaxSkill(2)
            } else if(mastered === 'filled'){
                setMinSkill(2)
                setMaxSkill(2)
            } else if(mastered === 'error'){
                setMinSkill(1)
                setMaxSkill(1)
            }
        } else if(newType === 'error'){
            setMinSkill(0)
            setMaxSkill(0)
            if(mastered === 'filled'){
                setMastered('outlined')
            }
        }
        setLearned(newType)
    }

    const changeMastered = (newType) => {
        if(newType === 'outlined'){
            if(learned === 'outlined'){
                setMinSkill(0)
                setMaxSkill(2)
            } else if(learned === 'filled'){
                setMinSkill(1)
                setMaxSkill(2)
            } else if(learned === 'error'){
                setMinSkill(0)
                setMaxSkill(0)
            }
        } else if(newType === 'filled'){
            if(learned === 'outlined'){
                setMinSkill(2)
                setMaxSkill(2)
            } else if(learned === 'filled'){
                setMinSkill(2)
                setMaxSkill(2)
            } else if(learned === 'error'){
                setMinSkill(0)
                setMaxSkill(0)
            }
        } else if(newType === 'error'){
            if(learned === 'outlined'){
                setMinSkill(0)
                setMaxSkill(1)
            } else if(learned === 'filled'){
                setMinSkill(1)
                setMaxSkill(1)
            } else if(learned === 'error'){
                setMinSkill(0)
                setMaxSkill(0)
            }
        }
        setMastered(newType)
    }

    const handleSearch = (newSearchText) => {
        setSearchText(newSearchText)
    }

    const columns = props.students.map((student) => {
        console.log(student)
        return {
            id: student.user_id,
            field: `${student.user_id}`,
            headerName: student.username.split(' ')[0],
            width: 65,
            editable: false,
            align: 'center',
            renderCell: (cellValues) => {
                console.log(cellValues)
                if(cellValues.value === 0){
                    return (
                        <Tooltip title='Not Learned'><CloseIcon /></Tooltip>
                    )
                } else if(cellValues.value === 1){
                    return (
                        <Tooltip title='Learned'><MenuBookIcon /></Tooltip>
                    )
                } else {
                    return (
                        <Tooltip title='Mastered'><SchoolIcon /></Tooltip>
                    )
                }
                
            }
        }
    })
    columns.unshift({
        field: 'technique',
        headerName: 'Techniques',
        width: 250,
        editable: false,
    })
    console.log(columns)

    // const initialRows = () => {
    //     let resetRows = techniques.techniques.map((technique, index) => {
    //         let rowObj = {
    //             id: technique.number,
    //             technique: `${technique.number} - ${technique.title}`,
    //         }
    //         props.students.forEach((student) => {
    //             rowObj[student.username] = student[`c${index+1}`]
    //         })
    //         return rowObj
    //     })  
    //     setRows(initialRows)
    // }

    const filterRows = () => {
        let filteredRowsArr = defaultRows.filter((row)=>{
            let falseCheck = true;
            for(const key in row){
                if(key !== 'id' && key !== 'technique'){
                    if(row[key] < minSkill || row[key] > maxSkill){
                        falseCheck = false
                    }
                }
            }
            return falseCheck
        })

        if(searchText.length > 0){
            let textFilteredRowArr = filteredRowsArr.filter((row)=>row.technique.toLowerCase().includes(searchText.toLowerCase()))
            setRows(textFilteredRowArr)
        } else {
            setRows(filteredRowsArr)
        }
    }

    return (
        <div className='Techniques'>
            <div className='techniques-chips'>
                <Chip 
                    label="learned" 
                    color={learned === 'error' ? 'error' : 'primary'} 
                    variant={learned === 'error' ? 'filled' : learned} 
                    clickable 
                    onClick={()=> {
                        learned === 'outlined' ? changeLearned('filled') : learned === 'filled' ? changeLearned('error') : changeLearned('outlined')
                    }}
                    style={{marginRight: '10px'}}
                    />
                <Chip 
                    label="mastered" 
                    color={mastered === 'error' ? 'error' : 'success'}
                    variant={mastered === 'error' ? 'filled' : mastered} 
                    clickable
                    onClick={()=> {
                        mastered === 'outlined' ? changeMastered('filled') : mastered === 'filled' ? changeMastered('error') : changeMastered('outlined')
                    }}/>    
            </div>
            <TextField id="outlined-search" label="Search..." type="search" className='dashboard-search' onChange={(event)=>handleSearch(event.target.value)}/>
            <div className='techniques-select-datagrid-cont'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 6, 7, 8, 9, 10, 20, 88]}
                    pagination
                />
            </div>
        </div>
    )
}

export default Techniques;