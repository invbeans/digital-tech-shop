class RegistrationUser {
    constructor(public firstname: string,
        public surname: string,
        public lastname: string,
        public username: string,
        public birthday_date: Date,
        public email: string,
        public password: string,
        public phone_number: string,
        public points: number){} 
}

class LoginUser {
    constructor(public email: string,
        public password: string){}
}

export {RegistrationUser, LoginUser}