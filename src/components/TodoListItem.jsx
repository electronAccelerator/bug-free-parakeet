import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'


function TodoListItem({ className, name, tags, onDelete, onChange, onComplete, addTags}) {
    return (
        <li className={className}>
            
            <button onClick={onDelete}>Delete</button>
            <button onClick={onComplete}>Done?</button>
            <input onChange={onChange} value={name} />
            <input onChange={addTags} value={tags} />
            
        </li>
    )
}




export default styled(observer(TodoListItem))`
    color: grey;

    .button {
        color:white;
        border: none;
    }
`

