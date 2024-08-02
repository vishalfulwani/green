export interface Usertype  {
    userName:string,
    email:string,
    password:string,
    refreshToken?:string,
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean,
    role:string,
}


  