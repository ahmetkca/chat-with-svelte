import { writable,derived } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';

export const username = writable(null);

// these stores for rooms
export const currentRoom = writable(null);
export const isPasswordMatch = writable(null);
// this is for room not for authenticating the entire app
export const isAuthenticated = derived([currentRoom, isPasswordMatch], (a) => a && a[0] && a[1]);

export const loggedUser = writable(null);

const createToastList = () => {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        push: options => {
            let id = uuidv4();
            console.log(id + ' toast created.');
            update(tl => [ ...tl, { id, ...options}])
        },
        pop: id => {
            update(tl => tl.filter(toast => toast.id != id));
        },
        reset: () => {
            set([]);
        }
    }
}

export const toastList = createToastList();
