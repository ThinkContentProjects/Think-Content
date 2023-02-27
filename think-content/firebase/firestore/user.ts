import { updateDoc, doc, deleteField, setDoc, getDocs, getDoc, query, collection, where} from 'firebase/firestore';
import { db } from '../firebase';

const USER_COLLECTION = 'user';

export function getUser(uid: string) {
    return getDoc(doc(db, USER_COLLECTION, uid))
}

export async function getUserFromEmail(email: string) {
    const q = query(collection(db, USER_COLLECTION), where("email", "==", email))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
}

export function createUser(uid: string, email: string) 
{
    return setDoc(doc(db, USER_COLLECTION, uid), {
      uid: uid,
      email: email,
      date: Date.now(),
    });
}

export function addWorkspace(docId: string, workspaceID: string, role: string) 
{
    return updateDoc(doc(db, USER_COLLECTION, docId), {
        [`workspaces.${workspaceID}`]: role
    });
}

export function leaveWorkspace(docId: string, workspaceID: string)
{
    return updateDoc(doc(db, USER_COLLECTION, docId), {
        [`members.${workspaceID}`]: deleteField()
    });
}