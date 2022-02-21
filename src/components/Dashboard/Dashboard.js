import { useState, useEffect } from 'react';
import './Dashboard.css';
import { Chip, TextField, Switch, Button, Backdrop, CircularProgress, Box, Typography } from '@mui/material'

function grid(techniques, updateTechnique){
    let jsxTechniques = techniques.map((technique)=>{
        return (
            <div className='dashboard-row-cont' key={technique.number}>
                <div className='dashboard-row-top-cont'>
                    <h3 className='dashboard-technique-number'>{technique.number}.</h3>
                    <h3 className='dashboard-technique-title' onClick={() => {
                        let joined = technique.title.split(' ').join('+');
                        console.log(joined)
                        window.open(`https://www.youtube.com/results?search_query=BJJ+${joined}`)
                    }}>{technique.title}</h3>
                </div>
                <div className='dashboard-row-bot-cont'>
                    <div className='dashboard-switch-cont'>
                        <Switch size='small' onChange={(event)=>updateTechnique(event.target.checked, 'learned', technique)} checked={technique.progress>=1}/>
                        <h5 style={{marginRight: '10px'}}>Learned</h5>
                        <Switch color='success' size='small' onChange={(event)=>updateTechnique(event.target.checked, 'mastered', technique)} checked={technique.progress>=2}/>
                        <h5>Mastered</h5>
                    </div>
                </div>
            </div>
        )
    })
    return jsxTechniques
}

function Dashboard(props) {
    const [learned, setLearned] = useState('outlined');
    const [mastered, setMastered] = useState('outlined');
    const [techniques, setTechniques] = useState(props.techniquesArr)
    const [allTechniques, setAllTechniques] = useState(props.techniquesArr)
    const [minSkill, setMinSkill] = useState(0)
    const [maxSkill, setMaxSkill] = useState(2)
    const [searchText, setSearchText] = useState('')
    const [changeMade, setChangeMade] = useState(false)
    const [savedOpen, setSavedOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if(isRunning){
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress + 10));
                }, 100);
                return () => {
                    clearInterval(timer);
                    if(progress >= 150){
                        setIsRunning(false)
                        setSavedOpen(false)
                        setProgress(0)
                    }
                };
        }
    }, [progress, isRunning]);

    const handleClose = () => {
      setSavedOpen(false);
    };

    const handleToggle = () => {
      setSavedOpen(!savedOpen);
    };

    useEffect(()=>{
        filterTechniques()
    }, [searchText, allTechniques, minSkill, maxSkill])

    const updateTechnique = (value, switchType, technique) => {
        let progress = 0;
        if(switchType === 'learned'){
            if(value ){
                progress = 1
            }
        } else {
            if(value){
                progress = 2
            } else {
                progress = 1
            }
        }

        let newTechniquesArr = allTechniques.map(a => {return {...a}})
        newTechniquesArr[technique.number-1] = {number: technique.number, title: technique.title, progress}
        setAllTechniques(newTechniquesArr)
        setChangeMade(true)
      }

    const filterTechniques = () => {
        let filteredTechniquesArr = allTechniques.filter((technique)=>technique.progress >= minSkill && technique.progress <= maxSkill)
        if(searchText.length > 0){
            let textFilteredTechniquesArr = filteredTechniquesArr.filter((technique)=>technique.title.toLowerCase().includes(searchText.toLowerCase()))
            setTechniques(textFilteredTechniquesArr)
        } else {
            setTechniques(filteredTechniquesArr)
        }
    }
    
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

    const openSaveAnimation = () => {
        setIsRunning(true)
    }

    return (
        <div className="Dashboard">
            <div className='dashboard-chips'>
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
            <div style={{marginTop: '10px'}}/>
            <Button variant="contained" disabled={props.user === null || changeMade === false} onClick={()=>{
                props.saveChanges(allTechniques)
                setChangeMade(false)
                handleToggle()
                openSaveAnimation()
                }}>Save</Button>
            <div className='dashboard-grid-cont'>
                {grid(techniques, updateTechnique)}
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: 99 }}
                open={savedOpen}
                onClick={handleClose}
            >
                <div className='dashboard-saved-cont'>
                    <Box sx={{ position: 'relative', display: 'inline-flex'}}>
                        <CircularProgress variant="determinate" value={progress >= 100 ? 100 : progress} size={90} color='success'/>
                        <Box
                            sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}
                        >
                            <Typography variant="caption" component="div" color={progress >= 110 ? 'green' : 'lightgray'} style={{fontSize: '20px'}}>
                            {`SAVED`}
                            </Typography>
                        </Box>
                    </Box>
                </div>
            </Backdrop>
        </div>
    );
}

export default Dashboard;