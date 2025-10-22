
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(){


    // aktualizacja cookisow i wyslanie rzeczy, usuniecie tokena

    const cookieStore=await cookies();

    console.log(`COOKIES`, cookieStore)

    cookieStore.set('token','',{
        path:'/', // available everywhere
        maxAge:0
    })

    return NextResponse.json({success:true});

}