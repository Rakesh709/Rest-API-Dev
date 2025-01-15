//authentication helper 

import crypto from 'crypto';

const SECRET = 'RAKESH-AUTH';

export const random =()=> crypto.randomBytes(128).toString('base64')

export const authentication = (salt:string,password:string)=>{
    const hashedPassword = crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex')
    //console.log("Hashed Password from helpers:", hashedPassword);
    
    return hashedPassword;
}