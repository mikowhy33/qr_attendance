import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
	// we send in json format so we take in json format
	const { mail, password } = await req.json();

	// right now generated token same 4 everyone bcs no database
	const token = jwt.sign(
		// info about user
		{
			userId: 123,
			email: "test@example.com",
		},
		// have to change to env!
		"secret",
		// time when expires
		{ expiresIn: "1h" }
	);

	console.log("🟢  TOKEN:", token);
	console.log("🟢 LENGTH OF TOKENU:", token.length);
	console.log("🟢 DOTS:", (token.match(/\./g) || []).length); // powinno być
	console.log(`LINK TO THE SITE SOMEONE WANTS TO ACCESS ${req.nextUrl}`);

	if (mail === "mail123" && password === "123") {
		const cookiesStore = await cookies();

		// setting a cookie, name, value, additional
		cookiesStore.set("token", token, {
			httpOnly: true, // client will not see
			secure: false, // tylko przez HTTPS ⚠️ Tylko dla dev — w produkcji MUSI być true
			sameSite: "lax", // protection
			path: "/", // available in whole dom
			maxAge: 60 * 60 * 24 * 7, // week
		});

		console.log("🟢 COOKIE HAS BEEN SET");

		console.log("NASTEPNA STRONA IDZIE DO " + req.nextUrl);
		return NextResponse.json({ success: true });
	}

	// alert('Bad login info')
	console.log("COOKIE HAS NOT BEEN SET, BAD LOGIN INFO");

	return NextResponse.json({ success: false });
}
