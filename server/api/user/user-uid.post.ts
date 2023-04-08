import { getUserByFirebaseUid } from "~/typeorm/repositories/UserRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const res = await getUserByFirebaseUid(body.uid);
    return {
        data: res
    }
})