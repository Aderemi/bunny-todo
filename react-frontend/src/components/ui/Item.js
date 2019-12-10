import React from 'react';
import CheckBox from './CheckBox';

export default function Item(props) {
    const {data, changeStatus, getCurrentUserId, updateCurrentUserId, editModelField, deleteModel} = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const model = props.type === "todo" ? "todos" : "users";
    const className = 'todo-item ui-state-default ' + (data.status === "done" ? 'completed' : 'pending');
    let editClass = () => !data.editing ? "edit" : "editing";
    return (
        <li className={className}>
            <div className="checkbox">
                { props.type === "todo" ? (
                    <label>
                    { data.editing ? (
                        <input type="text" defaultValue={data.description} onChange={e => editModelField("todos", data.id, "description", e.target.value, "reporting")}/>
                    ):(
                        <label><CheckBox checked={data.status === "done"} onChange={handleChange}/> {data.description} </label>
                    )
                }
                    </label>
                    ) : (
                    <label>
                        { data.editing ? (
                            <input type="text" defaultValue={data.name} onChange={e => editModelField("users", data.id, "name", e.target.value, "reporting")}/>
                        ):(
                            <span className={getCurrentUserId() === data.id ? "text-warning" : ""} onClick={() => updateCurrentUserId(data.id)}>{data.name}</span>
                        )
                        }
                    </label>
                    )
                }
                <div className="pull-right buttons">
                    <a title="Edit" className={"button " + editClass()} onClick={() => editModelField(model, data.id, null, null, !!data.editing ? "submitting" : "editing")}></a>
                    <a title="Delete" className="button delete" onClick={() => deleteModel(model, data.id)}></a>
                </div>
            </div>
        </li>
    );
}
