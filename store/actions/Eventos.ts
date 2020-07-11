export const INSERT_EVENTO = 'INSERT_EVENTO';
export const LOAD_EVENTOS = 'LOAD_EVENTOS';

import { insertEvento, listEventos } from '../../helpers/db';
import { Dispatch } from 'redux';

export const addEvento = (evento: string, date: Date) => {
    return async (dispatch: Dispatch) => {
        try {
            let dateFormatted=[date.getUTCDate(), date.getMonth()+1, date.getFullYear()].join('/');
            const dbResult=await insertEvento(evento,dateFormatted);
            dispatch({type:INSERT_EVENTO,evento:{idEvento:dbResult.insertId,evento:evento,created_at:dateFormatted}});
        } catch (err) {
            throw err;
        }
    }
}

export const loadEventos = () => {
    return async (dispatch: Dispatch) => {
        try {
            const dbResult = await listEventos();
            dispatch({ type: LOAD_EVENTOS, eventos: dbResult.rows._array })
        } catch (err) {
            throw err;
        }
    }
}