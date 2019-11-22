import React from 'react';
import './ListItem.css';

const ListItem = props => {
    let buttonClassName = 'listItemButton';

    if(props.count <= 0){
        buttonClassName = 'listItemButton_hidden';
    }

    return (
        <div className='listItem'>
            <img onClick={props.add} className='listItemImage' src={props.image} alt='someimage'/>
            <span className='listItemName'>{props.name}</span>
            <span className='listItemCount'> x{props.count} </span>
            <button className={buttonClassName} onClick={props.delete}>X</button>
        </div>
    );
};

export default ListItem;