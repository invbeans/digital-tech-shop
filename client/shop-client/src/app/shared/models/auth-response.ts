import { UserDto } from "./user-dto";

export class AuthResponse {
    constructor(public accessToken: string,
        public refreshToken: string,
        public userDto: UserDto){}
}