

export type Guardian = {
    fatherName:string;
    fatherOccupation:string;
    fatherContactNo:string;
    motherName:string;
    motherOccupation:string;
    motherContactNo:string;
}

export type userName = {
    firstName:string;
    middleName:string;
    lastName:string;
}

export type LocalGuardian = {
    name:string;
    occupation:string;
    contactNo:string;
    address:string;
}
 
export type Blood = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

export type Student = {
    id:string,
    name: userName;
    gender:"male" | "female";
    email:string;
    dateOfBirth:string;
    contactNo: string;
    emergencyContactNo:string;
    bloodGroup?: Blood;
    presentAddress:string;
    permanentAddress:string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?:string;
    isActive: 'active' | 'blocked';
}