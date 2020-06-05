import { ApiResponse } from '../ApiResponse';

export class AuthentificationResponse implements ApiResponse {
    message: string = '';
    code: number = 0;

    token: string = '';
}