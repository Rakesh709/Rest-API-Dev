//authantication helper 

import crypto from 'crypto';

const SECRET = 'RAKESH-REST-API';

export const random =()=> crypto.randomBytes(128).toString('base64')

export const authantication = (salt:string,password:string)=>{
    return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex')
}