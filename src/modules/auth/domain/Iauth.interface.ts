//***************** types **************//
import {AuthType} from '../types/auth.type';
import {ResponseAuthType} from '../types/responseAuth.type';


export interface IAuth {
    login(auth: AuthType): Promise<ResponseAuthType>;
};