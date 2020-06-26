import {Foto} from '../../models/Fotos'
import {ADD_FOTO, LOAD_FOTOS, DELETE_FOTO} from '../actions/Fotos'

interface foto{
    idFoto:number,
    idMateria:number,
    imageUri:string,
    created_at:Date
}

interface action{
    foto:foto,
    type:string,
    fotos:[],
}

const fotos={
    items:<Foto[]>[]
}

export default (state=fotos,action:action)=>{

    switch(action.type){
        case ADD_FOTO:
            const newFoto=new Foto(action.foto.idFoto,action.foto.idMateria,action.foto.imageUri,action.foto.created_at);
            return{
                items:state.items.concat(newFoto)
            }
        case LOAD_FOTOS:
            return {
                items: action.fotos.map((mat: foto) => new Foto(mat.idFoto,mat.idMateria,mat.imageUri,mat.created_at ))
            }
        case DELETE_FOTO:
    
            let filteredArray=state.items.filter(fot=>fot.idFoto!==action.foto.idFoto)
            
            return {
                items:filteredArray
            }
        default:
            return fotos;
    }
}