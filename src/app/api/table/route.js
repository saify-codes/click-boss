import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
export async function GET(req){
    // const session = await NextAuth.getSession();

    console.log(await getServerSession(authOptions));
    return new Response('working...')
}