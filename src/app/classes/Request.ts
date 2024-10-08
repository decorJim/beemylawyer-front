import { RequestInterface } from "../interfaces/RequestInterface";

export class Request {

    private id:String;
    private lawyerId:String;
    private lawyerName:String;
    private creationDate:String;
    private state:String;
    private clientName:String;
    private phoneNumber:String;
    private clientEmail:String;
    private description:String;

    constructor(requestInterface:RequestInterface) {
        this.id=requestInterface.id;
        this.lawyerId=requestInterface.lawyerId;
        this.lawyerName=requestInterface.lawyerName;
        this.creationDate=requestInterface.creationDate;
        this.state=requestInterface.state;
        this.clientName=requestInterface.clientName;
        this.phoneNumber=requestInterface.phoneNumber;
        this.clientEmail=requestInterface.clientEmail;
        this.description=requestInterface.description;
    }

    getId():String {
        return this.id;
    }

    getLawyerId():String {
        return this.lawyerId;
    }

    getLawyerName():String {
        return this.lawyerName;
    }

    getCreationDate():String {
        return this.creationDate;
    }

    getState():String {
        return this.state;
    }

    getClientName():String {
        return this.clientName;
    }

    getPhoneNumber():String {
        return this.phoneNumber;
    }

    getClientEmail():String {
        return this.clientEmail;
    }

    getDescription():String {
        return this.description;
    }

    setId(id:String):void{
        this.id=id;
    }

    setLawyerId(lawyerId:String):void {
        this.lawyerId=lawyerId;
    }

    setLawyerName(name:String):void {
        this.lawyerName=name;
    }

    setCreationDate(date:String):void {
        this.creationDate=date;
    }

    setState(state:String):void {
        this.state=state;
    }

    setClientName(name:String):void {
        this.clientName=name;
    }

    setPhoneNumber(number:String):void {
        this.phoneNumber=number;
    }

    setClientEmail(email:String):void {
        this.clientEmail=email;
    }

    setDescription(description:String):void {
        this.description=description;
    }


    
}
