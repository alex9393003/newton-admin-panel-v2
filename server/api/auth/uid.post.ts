import { getUserByFirebaseUid } from "~~/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('user body', body.firebaseUid);
    const res : any = await getUserByFirebaseUid(body.firebaseUid);
    console.log('response from firebase id ', await res);
    if (res instanceof Error) { 
        console.log('error ', res.message);
        return {
          error: res // return the error message
        }
      } else {
        return {
            data: res.firebaseUid
          }
      }
      
})