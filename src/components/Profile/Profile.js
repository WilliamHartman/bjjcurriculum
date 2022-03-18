import { useState } from 'react';
import './Profile.css'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'; 

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

function Profile(props){
    const [open, setOpen] = useState(false);
    const [nameOpen, setNameOpen] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const [instructorEmail, setInstructorEmail] = useState(props.user.instructor ? props.user.instructor : '');
    const [username, setUsername] = useState(props.user.username ? props.user.username : '');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameClickOpen = () => {
        setNameOpen(true);
    };

    const handleNameClose = () => {
        setNameOpen(false);
    };
    
    const handleSubmit = () => {
        setDisableButtons(true);
        props.updateInstructor(instructorEmail)
        delay(1000).then(() => {
            setDisableButtons(false);
            setOpen(false);
        });
    };

    const handleNameSubmit = () => {
        setDisableButtons(true);
        props.updateUsername(username)
        delay(1000).then(() => {
            setDisableButtons(false);
            setNameOpen(false);
        });
    };

    const changeInstructorButton = (aOrC) => {
        return (
            <Button variant='outlined' onClick={handleClickOpen}>{aOrC} Instructor</Button>
        )
    }

    return (
        <div className='Profile'>
            <div className='profile-cont'>
                <img src={props.user.picture} style={{height: '100px', width: '100px', borderRadius: '50px', marginTop: '25px'}}/>
                <div className="profile-underline"/> 
                <div className='profile-row' style={{justifyContent: 'space-between'}}>
                    <h5 className='profile-date'>Last login: {props.user.lastLoginDate.split(' ')[0]}</h5>
                    <h5 className='profile-date'>Date joined: {props.user.createdDate.split(' ')[0]}</h5>
                </div>
                <div className='profile-row'>
                    <h3 className='profile-row-title'>Name: </h3>
                    <h3 className='profile-row-contents'>{username}</h3>
                </div>
                <div className='profile-row'>
                    <h3 className='profile-row-title'></h3>
                    <h3 className='profile-row-contents'>
                        <Button variant='outlined' onClick={handleNameClickOpen}>Change Name</Button>    
                    </h3>
                </div>
                <div className='profile-row'>
                    <h3 className='profile-row-title'>Email: </h3>
                    <h3 className='profile-row-contents'>{props.user.email}</h3>
                </div>
                <div className='profile-row'>
                    <h3 className='profile-row-title'>Instructor: </h3>
                    <h3 className='profile-row-contents'>{props.user.instructor ? props.user.instructor : changeInstructorButton('Add')}</h3>
                </div>
                {props.user.instructor ? <div className='profile-row'>
                    <h3 className='profile-row-title'></h3>
                    <h3 className='profile-row-contents'>{changeInstructorButton('Change')}</h3>
                </div> : null}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{props.user.instructor ? 'Change' : 'Add'} Instructor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the email address of your instructor to allow them to view your progress.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        placeholder="Email Address"
                        type="email"
                        fullWidth
                        value={instructorEmail}
                        onChange={(e)=>setInstructorEmail(e.target.value)}
                        onKeyPress={(e)=>e.key === 'Enter' ? handleSubmit() : null}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={disableButtons}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={disableButtons}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={nameOpen} onClose={handleNameClose}>
                <DialogTitle>Change Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the name you would like to be displayed
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="Name"
                        type="username"
                        fullWidth
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        onKeyPress={(e)=>e.key === 'Enter' ? handleNameSubmit() : null}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNameClose} disabled={disableButtons}>Cancel</Button>
                    <Button onClick={handleNameSubmit} disabled={disableButtons}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Profile;