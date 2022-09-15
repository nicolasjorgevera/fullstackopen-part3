import React from 'react'

const Filter = (props) => {
    return(
        <div>
        Filter shown with: <input value={props.Filter} onChange={props.onChangeFilter}/>
        </div>
    )
}

export default Filter