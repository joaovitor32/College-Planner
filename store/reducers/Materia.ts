import { Materia } from '../../models/Materia'

import { ADD_MATERIA, LOAD_MATERIA, EDIT_MATERIA } from '../actions/Materia';


interface materia {
    periodo: string,
    title: string,
    description: string,
    idMateria: number,
}

interface action {
    materia: materia,
    type: string,
    materias: []
}

const materias = {
    items: <Materia[]>[]
}

export default (state = materias, action: action) => {
    switch (action.type) {
        case ADD_MATERIA:
            const newMateria = new Materia(action.materia.idMateria, action.materia.title, action.materia.periodo, action.materia.description);

            return {
                items: state.items.concat(newMateria)
            }
        case LOAD_MATERIA:
            return {
                items: action.materias.map((mat: materia) => new Materia(mat.idMateria, mat.title, mat.periodo, mat.description))
            }
        case EDIT_MATERIA:  
            const uptdatedMateria=new Materia(action.materia.idMateria,action.materia.title,action.materia.periodo,action.materia.description)
            const matIndex = state.items.findIndex(mat => mat.id == action.materia.idMateria);
            
            state.items[matIndex]=uptdatedMateria;

            return {
                items:[...state.items]
            }
        default:
            return materias
    }
}