export class Evento{

    idEvento:number;
    evento:string;
    created_at:string

    constructor(idEvento:number,evento:string,created_at:string){
        this.idEvento=idEvento,
        this.evento=evento,
        this.created_at=created_at
    }
}