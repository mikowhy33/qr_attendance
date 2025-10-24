// WE HAVE TO DO THIS IF NOT BIG ISSUES WHEN RECEVING A JWT BCS IT WILL BE CUT AND NOTHING WILL WORK
export const runtime = "nodejs";

// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
	// console.log("🔥 MIDDLEWARE CALLED for:", request.nextUrl.pathname);

	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	// console.log("🍪 Token:", token ? "EXISTS" : "MISSING");
	// console.log(token)
	// console.log("📍 Pathname:", pathname);

	// if no token redirect to login
	if (!token) {
		// console.log("❌ No token, redirecting to /login");
		// console.log(" ❌LINK FROM MIDDLEWARE❌" + request.url);
		// returning a url with info which we can use later inside login page
		// we are encoding the path where we want 2 go with encodeURIComponent so the url will not break
		return NextResponse.redirect(
			new URL(
				`/login?redirectedTo=${encodeURIComponent(request.nextUrl.pathname)}`,
				request.url
			)
		);
	}

	// we verify token
	try {
		const decoded = jwt.verify(token, "secret");
		// console.log("✅ Token valid:", decoded);
		return NextResponse.next();
	} catch (err) {
		console.log("❌ Token invalid:", err);
		// if token expired we are redirecting to a login and cleaning the token
		const res = NextResponse.redirect(new URL("/login", request.url));
		res.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
			path: "/",
		});
		return res;
	}
}

export const config = {
	// idk if we should block all if yes then
	//  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
	matcher: ["/", "/attendance_reports/:path*"],
};
