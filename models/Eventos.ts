export class Evento{

    idEvento:number;
    evento:string;
    created_at:Date

    constructor(idEvento:number,evento:string,created_at:Date){
        this.idEvento=idEvento,
        this.evento=evento,
        this.created_at=created_at
    }
}