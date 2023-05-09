export class UserAdminPage {
    constructor(public id: number,
        public username: string,
        public surname: string,
        public firstname: string,
        public lastname: string,
        public phone_number: string,
        public email: string,
        public roleId: number,
        public role: string) { }
}