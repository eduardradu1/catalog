export interface User {
    uid?: string;
    email?: string | null ;
    nume?: string | null;
    prenume?:string | null;
    photoURL?: string | null;
    emailVerified?: boolean | null;
    isStudent?:boolean;
    materie?:string;
    nota1?:string;
    nota2?:string;
 }