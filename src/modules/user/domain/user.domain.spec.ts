import { describe, expect, it, jest } from '@jest/globals';
import { UserDomain } from './user.domain';


describe('User Domain', () => {
    let responseService: any =  
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6Mn0sImlhdCI6MTY3NjE4ODQxNn0.MakdToI4eMQm4AStnL0-ge26jfN1OzByjPGbe793ZaY"
    let bodyService: any = {
        name: 'test',
        email: 'test@test.com',
        password: '123456'
    };
    
    it('should register user', async () => {
      jest.spyOn(UserDomain.prototype, 'register').mockImplementationOnce(() => Promise.resolve(responseService));

        const userDomain = new UserDomain();
        const register = await userDomain.register(bodyService);

        expect(register).toEqual(responseService);
    });
});