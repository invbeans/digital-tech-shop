import { UserDto } from "./user-dto";

export class AuthResponse {
    constructor(public refreshToken: string,
        public accessToken: string,
        public userDto: UserDto){}
}