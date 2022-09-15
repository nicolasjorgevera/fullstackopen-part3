import React from "react"


const AddNew = ({onSubmit , name , onChangeName , number, onChangeNumber}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={name} onChange={onChangeName}/>
            </div>
            <div>
                Number: <input value={number} onChange={onChangeNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNew