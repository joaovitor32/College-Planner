import { Evento } from '../../models/Eventos'

import { INSERT_EVENTO, LOAD_EVENTOS } from '../actions/Eventos'

interface evento {
    idEvento: number,
    evento: string,
    created_at: Date,
}

interface action {
    evento: evento,
    type: string,
    eventos: []
}

const eventos = {
    items: <Evento[]>[]
}

export default (state = eventos, action: action) => {
    switch (action.type) {
        case INSERT_EVENTO:
        
            const newEvento=new Evento(action.evento.idEvento,action.evento.evento,action.evento.created_at);

            return {
                items:state.items.concat(newEvento)
            }
    
        case LOAD_EVENTOS:

            return {
                items:action.eventos.map((evento:evento)=>{new Evento(action.evento.idEvento,action.evento.evento,action.evento.created_at)})
            }

        default:
            return eventos;
    }
}