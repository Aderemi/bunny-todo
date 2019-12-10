import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search} from '../../services/filter';

export default function Main(props) {
    const {users, todos, filter, mode, todoquery, userquery} = props.data;
    const {
        isBusy,
        addNewTodo,
        addNewUser,
        updateCurrentUserId,
        changeFilter,
        changeStatus,
        changeMode,
        setSearchQuery,
        editModelField,
        deleteModel,
        getCurrentUserId
    } = props.actions;
    const userCount = users.length;
    const todCount = todos.length;
    const userItems = search(applyFilter(users, filter), "name", userquery);
    const todoItems = search(applyFilter(todos, filter), "description", todoquery);

    return (
        <div className="container">
            <div className="row main">
                <div className="col-lg-4 mr-1 userlist">
                    <Header {...{addNew: addNewUser, mode, userquery, setSearchQuery, isBusy, "title": "Users List", model: "user"}}/>
                    <FilteredList {...{editModelField, getCurrentUserId, updateCurrentUserId, deleteModel, items: userItems, "type": "user"}}/>
                    <Footer {...{count: userCount, filter, changeFilter, mode, changeMode, model: "user"}}/>
                    <Info {...{mode}}/>
                </div>
                <div className="col-lg-6 todolist">
                    <Header {...{addNew: addNewTodo, mode, todoquery, setSearchQuery, isBusy, "title": "To do List", model: "todo"}}/>
                    <FilteredList {...{editModelField, deleteModel, items: todoItems, changeStatus, "type": "todo"}}/>
                    <Footer {...{count: todCount, filter, changeFilter, mode, changeMode, model: "todo"}}/>
                    <Info {...{mode}}/>
                </div>
            </div>
        </div>
    );
}
