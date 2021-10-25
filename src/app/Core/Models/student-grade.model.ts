export interface StudentGrade {
    materie?: string;
    medie?:number;
    note:Nota[];
    semestru?:string;
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
    CreateDate?:string;
    TipNota?:string;
}