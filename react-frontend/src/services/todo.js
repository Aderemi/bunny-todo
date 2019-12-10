import update from 'immutability-helper';
import {globalVariable} from "../util/common";

export function getItemById(list, itemId) {
    return list.find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            status: {$set: completed}
        }
    });
}

export function updateField(items, itemId, field, value) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            [field]: {$set: value}
        }
    });
}

export function _refreshUser(){
    return fetch(globalVariable.api + 'users')
        .then(res => res.json());
}

export function _refreshTodos(userId){
    const path = userId ? `todos/user/${userId}` : 'todos';
    return fetch(globalVariable.api + path)
        .then(res => res.json());
}

export function _addNewUser(name) {
    return fetch(globalVariable.api + 'users/', {
        method: 'POST',
        body: JSON.stringify({
            name: name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _addNewTodo(description, userId) {
    return fetch(globalVariable.api + 'todos', {
        method: 'POST',
        body: JSON.stringify({
            description: description,
            user_id: userId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _updateUser(user) {
    return fetch(globalVariable.api + 'users/' + user.id, {
        method: 'PUT',
        body: JSON.stringify({
            name: user.name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _updateTodo(todo) {
    return fetch(globalVariable.api + 'todos/' + todo.id, {
        method: 'PUT',
        body: JSON.stringify({
            description: todo.description,
            user_id: todo.user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function _changeStatus(itemId, completed) {
    return fetch(globalVariable.api + 'todos/' + itemId + "/completed", {
        method: 'PUT',
        body: JSON.stringify({
            status: completed,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export function _deleteModel(model, itemId){
    return fetch(globalVariable.api + model + '/' + itemId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
