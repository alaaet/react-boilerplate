import React from 'react'
import { SendAnEmail } from './SendAnEmail'

function Email({ history }) {
    console.log("Email: ",history)
    return (
        <div>
            <SendAnEmail history={history}/>
        </div>
    )
}

export  {Email}
