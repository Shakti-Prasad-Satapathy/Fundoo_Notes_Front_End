import React from 'react'

export default {
    handleClick(lable) {

        var lableDetails = {
            'logintoken': localStorage.getItem('token'),
            'lable': lable,
        }
        return lableDetails
    }

}
