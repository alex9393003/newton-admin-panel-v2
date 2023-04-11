import { getUserByFirebaseUid } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    console.log('hitting the server route');
    const body = await readBody(event);
    const res : any = await getUserByFirebaseUid(body.firebaseUid);
    if (res instanceof Error) { 
        console.log('in server route and the error is ');
        return {
          error: res // return the error message
        }
      } else {
        console.log('in server route and NO ERROR and the res is ')
        return {
            data: res.firebaseUid
          }
      }
      
})