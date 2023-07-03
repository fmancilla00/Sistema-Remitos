import Material from "../Material";
import { v4 as uuidv4 } from 'uuid';

export const addMaterials = (to) => { 
    let res = []
    for (let i = 0; i < to; i++) { 
        res = [...res, uuidv4()]
    }
    return res;
}