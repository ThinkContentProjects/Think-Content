import { query, where, getDoc, getDocs, addDoc, collection, updateDoc, doc, deleteField, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

const WORKSPACE_COLLECTION = 'workspace';

export function useCreateWorkspace() 
{
    const [isLoading, setLoading] = useState(false);
    
    async function createWorkspace(wid: string, name: string, uid: string)
    {
        setLoading(true);
        await addDoc(collection(db, WORKSPACE_COLLECTION), {
            name: name,
            wid: wid,
            members: {
                [uid]: "owner"
            }
        });
        setLoading(false);
    }

    return { createWorkspace, isLoading };
}

export function useDeleteWorkspace() 
{
    const [isLoading, setLoading] = useState(false);

    async function deleteWorkspace(docId: string) {
        setLoading(true);
        await deleteDoc(doc(db, WORKSPACE_COLLECTION, docId))
        setLoading(false);
    }

    return { deleteWorkspace, isLoading }
}

// TO DO: MAKE ALL QUERIES BELOW HERE INCLUDE LOADING STATE

export function addMember(docId: string, memberID: string) 
{
    return updateDoc(doc(db, WORKSPACE_COLLECTION, docId), {
        [`members.${memberID}`]: "editor"
    });
}

export function kickMember(docId: string, memberID: string) 
{
    return updateDoc(doc(db, WORKSPACE_COLLECTION, docId), {
        [`members.${memberID}`]: deleteField()
    });
}

export function getMembers(docId: string) {
    const q = query(collection(db, WORKSPACE_COLLECTION), where(`members.${docId}`, '==', 'editor'))
}