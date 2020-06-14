import * as FileSystem from 'expo-file-system';

export const LOAD_FOTOS="LOAD_FOTOS";
export const ADD_FOTO="ADD_FOTO";

import {insertFoto,listFotos} from '../../helpers/db'

import {Dispatch} from 'redux';
import { Alert } from 'react-native';

export const addFoto=(imageUri:string,idMateria:number)=>{
    return async (dispatch:Dispatch)=>{
        try{
            const fileName=imageUri.split('/').pop();
            const newPath=fileName?FileSystem.documentDirectory+fileName:"";
        
            FileSystem.moveAsync({
                from:imageUri,
                to:newPath
            })

            const dbResult=await insertFoto(idMateria,imageUri);
            dispatch({type:ADD_FOTO,foto:{idFoto:dbResult.insertId,imageUri:imageUri,idMateria:idMateria}});
        }catch(err){
            Alert.alert(err);
        }
    }
}

export const loadFotos=(idMateria:number)=>{
    return async (dispatch:Dispatch)=>{
        try{
            const dbresult=await listFotos(idMateria);
            dispatch({type:LOAD_FOTOS,fotos:dbresult.rows_array})

        }catch(err){
            console.log(err)
        }
    }
}