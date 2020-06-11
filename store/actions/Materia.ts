export const ADD_MATERIA="ADD_MATERIA"
export const LOAD_MATERIA="LOAD_MATERIA";

import {insertMateria, listMaterias} from '../../helpers/db'
import { Dispatch } from 'redux';

export const addMateria=(title:string,periodo:string,description:string)=>{
    return async (dispatch:Dispatch)=>{
        try{

            const dbResult=await insertMateria(title,periodo,description);
            dispatch({type:ADD_MATERIA,materia:{idMateria:dbResult.insertId,title:title,periodo:periodo,description:description}});

        }catch(err){
            throw err;
        }
    }
}

export const loadMaterias=()=>{
    return async (dispatch:Dispatch)=>{
        try{

            const dbResult=await listMaterias();
            dispatch({type:LOAD_MATERIA,materias:dbResult.rows._array})

        }catch(err){
            throw err;
        }
    }
}