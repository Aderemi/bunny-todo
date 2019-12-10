import React from 'react';
import Item from './Item';
import {MSG_NO_ITEMS} from '../../assets/text/en_US';

export default function FilteredList(props) {
    const {items, getCurrentUserId, updateCurrentUserId, changeStatus, editModelField, deleteModel} = props;

    if (items.length === 0) {
        return (
            <p className="alert alert-info">{MSG_NO_ITEMS}</p>
        );
    }

    return (
        <ul className="list-unstyled">
            {items.map(item => (
                <Item
                    key={item.id}
                    getCurrentUserId={getCurrentUserId}
                    deleteModel={deleteModel}
                    editModelField={editModelField}
                    type={props.type}
                    data={item}
                    updateCurrentUserId={updateCurrentUserId}
                    changeStatus={changeStatus}
                />
            ))}
        </ul>
    );
}
