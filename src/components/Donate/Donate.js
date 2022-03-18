import { useState } from 'react';
import './Donate.css'
import {  } from '@mui/material'; 

function Donate(props){

    return (
        <div className='Donate'>
            <div className='donate-cont'>
                <h3>Donate</h3>
                <div className='donate-underline'/>
                <p className='donate-content'>
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
        </div>
    )
}

export default Donate;