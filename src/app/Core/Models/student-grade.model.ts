export interface StudentGrade {
    materie?: string;
    medie?:number;
    nota1?:number;
    nota2?:number;
    semestru?:string;
    dataNota1?:any;
    dataNota2?:any;
    profesor?:string;
}

export interface Nota{
    studentUid?: string;
    Nota?: number;
    profesor?: string;
    createDate?: string;
}

export interface Grade {
    StudentId?: string;
    Materie?:string;
    Profesor?:string;
    Nota?:number;
    CreateDate:any;
    TipNota?:string;
}