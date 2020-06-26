import * as FileSystem from 'expo-file-system';

export const LOAD_FOTOS = "LOAD_FOTOS";
export const ADD_FOTO = "ADD_FOTO";
export const DELETE_FOTO = "DELETE_FOTO"

import { insertFoto, listFotos, deleteFotos } from '../../helpers/db'

import { Dispatch } from 'redux';
import { Alert } from 'react-native';

export const addFoto = (imageUri: string, idMateria: number) => {
    return async (dispatch: Dispatch) => {
        try {
            const fileName = imageUri.split('/').pop();
            const newPath = fileName ? FileSystem.documentDirectory + fileName : "";

            FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            })


            let d = new Date();
            let date=[d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')
    
            const dbResult = await insertFoto(idMateria, newPath, date);

            dispatch({ type: ADD_FOTO, foto: { idFoto: dbResult.insertId, imageUri: newPath, idMateria: idMateria,created_at:date } });
        } catch (err) {
            Alert.alert(err);
        }
    }
}

export const loadFotos = (idMateria: number) => {
    return async (dispatch: Dispatch) => {
        try {

            const dbResult = await listFotos(idMateria);
            dispatch({ type: LOAD_FOTOS, fotos: dbResult.rows._array })

        } catch (err) {
            console.log(err)
        }
    }
}

export const deletefoto = (idFoto: number,imageUri:string) => {
    return async (dispatch: Dispatch) => {
        try {

            const dbResult = await deleteFotos(idFoto);
            FileSystem.deleteAsync(imageUri)
            dispatch({ type: DELETE_FOTO, foto: { idFoto: idFoto } })

        } catch (err) {
            console.log(err);
        }
    }
}