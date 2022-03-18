import { useState } from 'react';
import './Students.css'
import { Box, Tab, Tabs } from '@mui/material'; 
import { DataGrid } from '@mui/x-data-grid';
import techniques from '../../assets/techniques';
import Techniques from './Techniques';

function Students(props){
    const [tabValue, setTabValue] = useState('select');
    const [selectionModel, setSelectionModel] = useState([]);

    const columns = [
        {
          field: 'name',
          headerName: 'Name',
          width: 200,
          editable: false,
        },
        {
          field: 'lastLogin',
          headerName: 'Last Login',
          width: 100,
          editable: false,
        }        
      ];
    if(window.innerWidth > 650){
        columns.push({
            field: 'email',
            headerName: 'Email',
            width: 250,
            editable: false,
        })
    }

    const rows = props.students.map((student) => {
        return {
            id: student.user_id,
            name: student.username,
            lastLogin: student.last_login.split(' ')[0],
            email: student.email
        }
    })

    let checkedStudents = props.students.filter((student) => {
        for(let i=0; i<selectionModel.length; i++){
            if(student.user_id == selectionModel[i]){
                return student
            }
        } 
    })

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

      
    const selectStudentsTab = () => {
        return (
            <div className='students-select-datagrid-cont'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                      }}
                    selectionModel={selectionModel}
                />
            </div>
        )
    }

    return (
        <div className='Students'>
            <Box sx={{ width: '100%', marginTop: '25px' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab value="select" label="Select Students" />
                    <Tab value="techniques" label="Techniques" />
                </Tabs>
            </Box>
            {tabValue === 'select' ? selectStudentsTab() : <Techniques students={checkedStudents}/>}
        </div>
    )
}

export default Students;