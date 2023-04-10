import { atom } from 'recoil';
/*
atoms represent a piece of state
components that read the value of an atom are implicitly subscribed to the atom, 
so any atom updates will result in a re-render of all components to that atom
*/

// three different views for the authentication form
export type ModalView = "login" | "signup" | "resetPassword";

// types for the atom state
export interface AuthModalState {
    open: boolean;
    view: ModalView;
    
}

// default state for the atom
const defaultModalState: AuthModalState = {
    open: false,
    view: 'login'
}

// actual state which is subscribed to by the components
export const authModalState = atom<AuthModalState>({
    // unique key to the application
    key: 'authModalState',
    default: defaultModalState,
});