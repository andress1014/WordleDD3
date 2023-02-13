import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { NextFunction } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

const { res } = getMockRes();

//*************** meddlewares ************************//
import { verifytoken, MessageError } from './verifyToken.middleware';

//********************** types *******************************//
import { HttpCode } from '../helpers';

describe('should validate autorization middleware', () => {
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    process.env = {
      JWT_SECRET: 'vanti',
    };
  });

  it('validate not authorization token', async () => {
    const expectedResponse = {
      message: MessageError.ERROR_TOKEN_AUTHORIZATION,
      status: HttpCode.FORBIDDEN,
    };

    verifytoken(getMockReq(), res, nextFunction);

    expect(res.json).toBeCalledWith(expectedResponse);
  });

  it('validate authorization token', async () => {
    let tokenJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6MX0sImlhdCI6MTY3NjIyOTQ4N30.YvWirlXM972aBwDMc56f_UhXKOgGcYXqkiXmTDAXi_Y";
    let token =
      'Bearer '+tokenJwt;
    let user = {
      userEmail: 'test@test.com',
      userId: 1,
      userToken: tokenJwt,
    };
 

    let req = getMockReq({
      headers: { authorization: token },
    });

    verifytoken(req, res, nextFunction);
    expect(req.body.user).toEqual(user);
  });
});
