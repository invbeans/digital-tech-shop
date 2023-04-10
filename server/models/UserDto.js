module.exports = class UserDto {
    //model for payloads, not database model!
    id;
    email;

    constructor(id, email){
        this.id = id,
        this.email = email
    }
}