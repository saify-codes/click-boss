import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { updatePassword, userExistsWithEmailPass } from "@/util/db";

export async function POST(req) {
    const { current_password, password } = await req.json()
    const { user: { email } } = await getServerSession()
    const isMatched = await userExistsWithEmailPass(email, current_password)
    let msg = ""
    if (isMatched){
        msg = "password updated"
        updatePassword(email,password)
    }else msg = "password invalid"
    return NextResponse.json({ msg })
}