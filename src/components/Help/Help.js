import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import chipAll from '../../assets/chip-all.PNG'
import chipYes from '../../assets/chip-yes.PNG'
import chipNo from '../../assets/chip-no.PNG'
import loginPNG from '../../assets/login.PNG'
import savePNG from '../../assets/save.PNG'

function Help(props){

    return (
        <div className='dashboard-help-cont'>
                    <h1>Help</h1>
                    <div className='dashboard-help-underline'/>
                    <div className='dashboard-help-subcont'>
                        <h4 className='dashboard-help-h4'>Login</h4>
                        <div className='dashboard-help-indent'>
                            <img src={loginPNG} style={{height: '40px'}}/>   
                            <p className='dashboard-help-p'>Clicking on the avatar button will redirect you to a login page where you can use your Google or Facebook account to create an account or log in.</p>
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
                        <h4 className='dashboard-help-h4'>Technique Video</h4>
                        <div className='dashboard-help-indent'>
                            <p className='dashboard-help-p'>{`Clicking on the name of a technique will open a new tab to YouTube with a search field of "BJJ <technique name>".`}</p>
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

export default Help;