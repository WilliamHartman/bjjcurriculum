import { useState } from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import chipAll from '../../assets/chip-all.PNG'
import chipYes from '../../assets/chip-yes.PNG'
import chipNo from '../../assets/chip-no.PNG'
import loginPNG from '../../assets/login.PNG'
import savePNG from '../../assets/save.PNG'
import switchPNG from '../../assets/switches.PNG'
import { Box, Tab, Tabs } from '@mui/material'; 
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';

function Help(props){
    const [tabValue, setTabValue] = useState('dashboard');

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const dashboardHelp = () => {
        return (
            <div className='dashboard-help-cont'>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Login</h4>
                    <div className='dashboard-help-indent'>
                        <img src={loginPNG} style={{height: '40px'}}/>   
                        <p className='dashboard-help-p'>Clicking on the avatar button will redirect you to a login page where you can use your Google or Facebook account to create an account or log in.</p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Switches</h4>
                    <div className='dashboard-help-indent'>
                        <img src={switchPNG} style={{height: '23px'}}/>   
                        <p className='dashboard-help-p'>Clicking on a switch will turn it on or off. When you first learn how to do a technique you can turn Learned on. When you are sure you know a technique and can preform it without hesitation you can turn on Mastered. If you turn on Mastered, Learned will automatically turn on as well, similarly if you turn off Learned, Mastered will automatically turn off. </p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Technique Video</h4>
                    <div className='dashboard-help-indent'>
                        <OndemandVideoIcon style={{marginLeft: '10px'}}/>
                        <p className='dashboard-help-p'>{`Clicking on the play video button under the technique name will open a new tab to YouTube with a search field of "BJJ <technique name>".`}</p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Filter buttons</h4>
                    <div className='dashboard-help-indent'>
                        <p className='dashboard-help-p'>The filter buttons allow you to filter the list by techniques by learned/not-learned and mastered/not-mastered.</p>
                        <img src={chipAll} className='dashboard-help-chips'/>
                        <p className='dashboard-help-p'>The default outlined button means that it will show all, no filtering is taking place.</p>
                        <img src={chipYes} className='dashboard-help-chips'/>
                        <p className='dashboard-help-p'>The filled color button means that it will show only techniques that you have learned/mastered.</p>
                        <img src={chipNo} className='dashboard-help-chips'/>
                        <p className='dashboard-help-p'>The filled red button means that it will show only techniques that you have NOT learned/mastered.</p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Search</h4>
                    <div className='dashboard-help-indent'>
                        <p className='dashboard-help-p'>Allows you to filter the list by technique name.</p>
                    </div>
                </div>          
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Save</h4>
                    <div className='dashboard-help-indent'>
                        <img src={savePNG} style={{height: '40px'}}/>   
                        <p className='dashboard-help-p'>Will save all changes to your user account.</p>
                    </div>
                </div>
            </div>
        )
    }

    const studentsHelp = () => {
        return (
            <div className='dashboard-help-cont'>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Select Students Tab</h4>
                    <div className='dashboard-help-indent'> 
                        <p className='dashboard-help-p'>This is a list of everyone who has set your email as their instructor in the Portfolio page.</p>
                        <p className='dashboard-help-p'>Select the students you want to view the technique progress of in the Techniques tab.</p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Techniques Tab</h4>
                    <div className='dashboard-help-indent'> 
                        <p className='dashboard-help-p'>This list has all of the techniques as rows and all of the students you selected in the previous Tab as columns.</p>
                        <p className='dashboard-help-p'>
                            The filter buttons and search filed work the same was as in the dashboard. But in this case it 
                            filters all the student's techniques at once. 
                        </p>
                        <p className='dashboard-help-p'>
                            So if you click learned once so it is blue, the 
                            list will only show techniques that every selected student has learned. Similarly if you click 
                            mastered twice so it is red, only techniques that no selected student has mastered.
                        </p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Progress Icons</h4>
                    <div className='dashboard-help-indent'> 
                        <div><CloseIcon/><MenuBookIcon/><SchoolIcon/></div>
                        <p className='dashboard-help-p'>These icons symbolize a students progress in each technique.</p>
                        <p className='dashboard-help-p'>The X means they have not yet learned the technique. The book means 
                            they have learned the technique but not yet mastered. The graduate's cap means they have mastered the technique.
                        </p>
                    </div>
                </div>
                <div className='dashboard-help-subcont'>
                    <h4 className='dashboard-help-h4'>Pagination</h4>
                    <div className='dashboard-help-indent'> 
                        <p className='dashboard-help-p'>At the bottom of the list you will see "Rows per page:" and then a dropdown menu.</p>
                        <p className='dashboard-help-p'>Because there are so many techniques, this list can be quite long and span many pages. 
                            You have the ability to set the number of rows you want to see per page, and to navigate through the pages here</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='Help'>
            <Box sx={{ width: '100%', marginTop: '25px' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    centered
                >
                    <Tab value="dashboard" label="Dashboard" />
                    <Tab value="students" label="Students" />
                </Tabs>
            </Box>
            {tabValue === 'dashboard' ? dashboardHelp() : studentsHelp()}
        </div>
    )
}

export default Help;