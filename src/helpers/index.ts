//authentication helper 

import crypto from 'crypto';

const SECRET = 'RAKESH-REST-API';

export const random =()=> crypto.randomBytes(128).toString('base64')

export const authentication = (salt:string,password:string)=>{
    const hashedPassword = crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex')
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
}