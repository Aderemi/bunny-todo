import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import fetch from 'isomorphic-fetch';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {globalVariable, objectWithOnly, wrapChildrenWith} from '../../util/common';
import {
    _addNewTodo, _addNewUser, _changeStatus, _deleteModel, _refreshTodos, _refreshUser, _updateTodo, _updateUser,
    getItemById,
    updateField,
    updateStatus
} from '../../services/todo';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            todoquery: '',
            userquery: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            todos: [],
            users: [],
            currentuserid: null,
            busy: false
        };

    }

    setBusy(status){
        this.setState({busy: status})
    }

    isBusy(){
        return this.state.busy;
    }

    componentDidMount() {
        this.setBusy(true);
        fetch(globalVariable.api + 'users')
            .then(res => res.json())
            .then((data) => {
                this.setBusy(false);
                this.setState({ users: data.users });
            })
            .catch(console.log);
        fetch(globalVariable.api + 'todos')
            .then(res => res.json())
            .then((data) => {
                this.setBusy(false);
                this.setState({ todos: data.todos });
            })
            .catch(console.log)
    }

    refreshUser(){
        this.setBusy(true);
        _refreshUser().then((data) => {
                this.setBusy(false);
                this.setState({ users: data.users });
            })
            .catch(console.log);
    }

    refreshTodos(){
        this.setBusy(true);
        _refreshTodos(this.state.currentuserid).then((data) => {
                this.setBusy(false);
                this.setState({ todos: data.todos });
            })
            .catch(console.log);
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: objectWithOnly(this, ['isBusy', 'addNewUser', 'addNewTodo', 'getCurrentUserId', 'updateCurrentUserId', 'changeFilter', 'changeStatus', 'changeMode', 'setSearchQuery', 'componentDidMount', 'editModelField', 'deleteModel'])
        });

        return <div>{children}</div>;
    }

    getCurrentUserId(){
        return this.state.currentuserid;
    }

    updateCurrentUserId(userId){
        this.setState({currentuserid: userId}, () => this.refreshTodos());
    }

    addNewUser(name) {
        this.setBusy(true);
        _addNewUser(name).then((user) => {
            this.setBusy(false);
            this.refreshUser()
        });
    }

    addNewTodo(description) {
        if(!this.state.currentuserid){
            alert("Select the user, you want to add task for");
            return;
        }

        this.setBusy(true);
        _addNewTodo(description, this.state.currentuserid).then((todo) => {
            this.setBusy(false);
            this.refreshTodos()
        });
    }

    updateUser(user) {
        this.setBusy(true);
        _updateUser(user).then((user) => {
            this.setBusy(false);
            this.refreshUser()
        });
    }

    updateTodo(todo) {
        this.setBusy(true);
        _updateTodo(todo).then((todo) => {
            this.setBusy(false);
            this.refreshTodos()
        });
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    changeStatus(itemId, completed) {
        this.setBusy(true);
        const completedString = completed === true ? "done" : "to do";
        _changeStatus(itemId, completedString).then((todo) => {
            this.setBusy(false);
            const updatedList = updateStatus(this.state.todos, itemId, completedString);

            this.setState({todos: updatedList});

            //this.refreshTodos()
        });
    }

    getModelList(model){
        const modelStates = {
            "users": this.state.users,
            "todos": this.state.todos
        };

        return modelStates[model];
    }

    markEditing(model, itemId){
        let updatedList = updateField(this.getModelList(model), itemId, "editing", true);
        this.setState({[model]: updatedList});
    }

    editModelField(model, itemId, field, value, stage="editing") {
        if(stage === "editing") return this.markEditing(model, itemId);
        let updatedList = updateField(this.getModelList(model), itemId, field, value);

        if(stage === "submitting"){
            updatedList = updateField(this.getModelList(model), itemId, "editing", false);
            if(model === "users"){
                this.updateUser(getItemById(updatedList, itemId));
            }else{
                this.updateTodo(getItemById(updatedList, itemId));
            }
        }
        this.setState({[model]: updatedList});
    }

    deleteModel(model, itemId){
        this.setBusy(true);
        _deleteModel(model, itemId).then((todo) => {
            this.setBusy(false);
            if(model === "todos") this.refreshTodos();
            if(model === "users") this.refreshUser()
        });
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(model, text) {
        if(model === "user")
            this.setState({userquery: text || ''});
        else
            this.setState({todoquery: text || ''});
    }
}

export default StateProvider;
