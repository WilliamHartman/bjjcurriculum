import { useState } from 'react';
import './About.css'
import {  } from '@mui/material'; 


function About(props){
    const [tabValue, setTabValue] = useState('select');
    const [selectionModel, setSelectionModel] = useState([]);

    return (
        <div className='About'>
            <h1>About</h1>
            <div className='about-underline'/>        
            <div className='about-section'>
                <h3>This Web App</h3>
                <p className='about-content'>
                    Professor Nick handed out a sheet of paper to all of the white belts entitled 
                    "White to Blue Belt Curriculum" with a list of techniques and two check boxes next to each. To start most 
                    classes he will pick out a white belt and ask them if there is anything from the list they want to work on,
                    then as a class we will drill that technique.
                </p>
                <p className='about-content'>
                    At first I wanted to build an app for myself so I could more easily track my own progress and knowledge.
                    And then I thought it would be great if others could use it as well as myself. After showing it to Nick
                    he thought it would be great if he could use it as an instructor to see how his students are doing.
                </p>
                <p className='about-content'>
                    If you have any feedback, feature requests, or bugs to report. Please send me an email and let me know! Thank you.    
                </p>
                <p className='about-content'>
                    I'd like to keep this web app free to use, but unfortunately servers cost money to keep running. I appreciate
                    any and all help to keep it live!
                </p>
                <form action="https://www.paypal.com/donate" method="post" target="_top" className='paypal'>
                    <input type="hidden" name="business" value="46QXRZP2N46B8" />
                    <input type="hidden" name="no_recurring" value="0" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
            </div>
            <div className='about-section'>
                <h3>Creator</h3>
                <p className='about-content'>
                    Hi, my name is William. I am a software engineer who enjoys creating useful tools for myself and others.
                </p>
                <p className='about-content'>
                    I have a 2nd degree black belt in Uechi-ryu karate and am confident in my striking
                    ability, but lacked any wrestling or ground game.  
                </p>
                <p className='about-content'>
                    In the summer of 2021 I started learning jiu-jitsu at Infinity Martial Fitness from Nicholas Bramlage 
                    in New Hampshire and have been loving it so far! 
                </p>
                <p className='about-content' style={{marginTop: '0px !important'}}>
                    If you want to get in touch with me the best way is to send me an email at hartman.william@gmail.com. 
                    You can also find me on <a href='https://www.linkedin.com/in/hartman-william/'>LinkedIn.</a>
                </p>
                
            </div>
        </div>
    )
}

export default About;