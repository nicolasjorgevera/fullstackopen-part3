import React from "react"

const Notification = ({ message , success}) => {
    let colorNote
    if (success){
        colorNote = "green"
    }
    else{
        colorNote = "red"
    }
    const style = {
        color: `${colorNote}`,
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null) {
        return null
    }
    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification