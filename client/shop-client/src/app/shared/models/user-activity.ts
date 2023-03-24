export class UserActivity {
    constructor(public user: number | null,
        public lastLogin: Date | null,
        public lastShopped: Date | null) { }
}