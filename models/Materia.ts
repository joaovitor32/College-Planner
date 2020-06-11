export class Materia{

    title:string;
    periodo:string;
    id:number;
    description:string

    constructor(id:number,title:string,periodo:string,description:string){
        this.id=id;
        this.title=title,
        this.periodo=periodo,
        this.description=description
    }
}