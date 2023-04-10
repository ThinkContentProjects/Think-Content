import { atom } from 'recoil';
/*
atoms represent a piece of state
components that read the value of an atom are implicitly subscribed to the atom, 
so any atom updates will result in a re-render of all components to that atom
*/

// types for the atom state
export interface InviteModalState {
    open: boolean;
}

// default state for the atom
const defaultModalState: InviteModalState = {
    open: false,
}

// actual state which is subscribed to by the components
export const inviteModalState = atom<InviteModalState>({
    // unique key to the application
    key: 'inviteModalState',
    default: defaultModalState,
});