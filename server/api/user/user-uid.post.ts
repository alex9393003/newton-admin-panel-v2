import { getUserByFirebaseUid } from "~/server/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    console.log('IN USER-UID POST ROUTE AND THIS IS BODY --> ', body);
    const res = await getUserByFirebaseUid(body.uid);
    return {
        data: res
    }
})