class ApiResponse<T>{
    success:boolean;
    statusCode: number;
    data?:T;
    message:string;

    constructor(success:boolean,statusCode:number,data:T,message:string){
        this.success = success
        this.statusCode = statusCode
        this.data = data
        this.message = message
        
    }
}
export { ApiResponse };
