import { createContext, useContext, useState, useEffect} from 'react'
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FireBaseUser,
signInWithPopup, GoogleAuthProvider, UserCredential, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';

type authContextModel = {
    currentUser: FireBaseUser | null
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>
    loginWithGoogle: () => Promise<UserCredential>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    updateUserEmail: (email: string) => Promise<void>
    updateUserPassword: (password: string) => Promise<void>
  }

type UserContextProviderType = {
    children?: React.ReactNode;
}

const AuthContext = createContext<authContextModel>({} as authContextModel,);

export function useAuth(): authContextModel
{
    return useContext(AuthContext);
}

export function AuthProvider({ children }: UserContextProviderType) 
{
    const [currentUser, setCurrentUser] = useState<FireBaseUser | null>(null);

    // since firebase sets local storage for us, there is an initial loading state that we have to worry about
    const [loading, setLoading] = useState(true);

    const googleAuth = new GoogleAuthProvider();

    function signup(email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(auth, email, password);
        
    }

    function login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function loginWithGoogle(): Promise<UserCredential> {
        return signInWithPopup(auth, googleAuth);
    }

    function updateUserEmail(email: string): Promise<void> {
        return updateEmail(currentUser, email);
    }

    function updateUserPassword(password: string): Promise<void>
    {
        return updatePassword(currentUser, password);
    }

    function logout(): Promise<void> {
        return signOut(auth);
    }

    function resetPassword(email: string): Promise<void> {
        return sendPasswordResetEmail(auth, email)
    }

    // onAuthStateChanged lives inside a useEffect because we only want to run it once when the component is mounted
    // whenever the component is unmounted, we are unsubscribed from the listener
    useEffect(() => {
        /*
        allows you to subscribe to the users current authentication state, and receive an event whenever that state changes. 
        onAuthStateChanged listener is asynchronous and will trigger an initial state once a connection with Firebase has been established.
        */ 
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
        
    }, [])

    const value = {
        currentUser,
        login,
        loginWithGoogle,
        logout,
        signup,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
    }

    // we only render the components once firebase is done loading the email
    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
}