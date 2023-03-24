export class MetaUser {
    constructor(public user: number | null,
        public role: number,
        public phoneNumber: string,
        public hashedPassword: string,
        public birthdayDate: Date | null,
        public email: string) { }
}