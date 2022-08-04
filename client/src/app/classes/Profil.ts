import { ProfilInterface } from "@app/interfaces/ProfilInterface";

export class Profil {
    private id:String;
    private useremail:String;
    private fname:String;
    private lname:String;
    private bio:String;
    private cposition:String;
    private skills:String[];
    private pic:String;
    private phonenumber:String;
    private stars:Number;
    private fullname:String;

    constructor(profilInterface:ProfilInterface) {
      this.id=profilInterface.id;
      this.useremail=profilInterface.useremail;
      this.fname=profilInterface.fname;
      this.lname=profilInterface.lname;
      this.bio=profilInterface.bio;
      this.cposition=profilInterface.cposition;
      this.skills=profilInterface.skills;
      this.pic=profilInterface.pic;
      this.phonenumber=profilInterface.phonenumber;
      this.stars=profilInterface.stars;
      this.setFullName();
    }

    getId():String {
        return this.id;
    }

    getUseremail():String {
        return this.useremail;
    }

    getFname():String {
        return this.fname;
    }

    getLname():String {
        return this.lname;
    }

    getFullName():String {
        return this.fullname;
    }

    getBio():String {
        return this.bio;
    }

    getCposition():String {
        return this.cposition;
    }

    getSkills():String[] {
        return this.skills;
    }

    getPic():String {
        return this.pic;
    }

    getPhoneNumber():String {
        return this.phonenumber;
    }

    getStars():Number {
        return this.stars;
    }

    setId(id:String):void {
        this.id=id;
    }

    setUseremail(mail:String):void {
        this.useremail=mail;
    }

    setFname(fname:String):void {
        this.fname=fname;
    }

    setLname(lname:String):void {
        this.lname=lname;
    }

    setFullName() {
        this.fullname=this.getFname()+" "+this.getLname();
    }

    setBio(bio:String):void {
        this.bio=bio;
    }

    setCposition(position:String):void {
        this.cposition=position;
    }

    setSkills(skills:String[]):void {
        this.skills=skills;
    }

    setPic(pic:String):void {
        this.pic=pic;
    }

    setPhoneNumber(number:String) {
        this.phonenumber=number;
    }

    addSkill(skill:String):void {
        this.skills.push(skill);
    }

    removeSkill(skill:String):void {
        const index = this.skills.indexOf(skill);
        if (index > -1) {
            this.skills.splice(index, 1); 
        }
    }

    setStars(stars:Number):void {
        this.stars=stars;
    }
}
