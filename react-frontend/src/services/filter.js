import {stringIncludes} from '../util/common';

export const FILTER_ALL = 'all';
export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';
export const FILTER_WORKING = 'working';
export const FILTER_DONE = 'finish';
export const USER_TASK_FILTER = 'user-task-filter';

export function applyFilter(list, filter) {
    switch (filter) {
        case FILTER_COMPLETED:
            return list.filter(item => item.status === "done");

        case FILTER_ACTIVE:
            return list.filter(item => item.status !== "to do");

        case FILTER_WORKING:
            return list.filter(item => item.work_status !== "working");

        case FILTER_DONE:
            return list.filter(item => item.work_status !== "finish");

        default:
            return list;
    }
}

export function search(list, field, query) {
    let q = query.trim().toLowerCase();
    return list.filter((ls) => stringIncludes(ls[field].toLowerCase(), q));
}


export function getOptions(model) {
    return model === "todo" ? {
        [FILTER_ALL]: 'All',
        [FILTER_ACTIVE]: 'Active',
        [FILTER_COMPLETED]: 'Completed'
    } : {
        [FILTER_ALL]: 'All',
        [FILTER_WORKING]: 'Working',
        [FILTER_DONE]: 'Finish'
    };
}
