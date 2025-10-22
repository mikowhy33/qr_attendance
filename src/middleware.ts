
// WE HAVE TO DO THIS IF NOT BIG ISSUES WHEN RECEVING A JWT BCS IT WILL BE CUT AND NOTHING WILL WORK
export const runtime = "nodejs";

// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";



export function middleware(request: NextRequest) {
	console.log("🔥 MIDDLEWARE CALLED for:", request.nextUrl.pathname);
	
	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	console.log("🍪 Token:", token ? "EXISTS" : "MISSING");
	console.log(token)
	console.log("📍 Pathname:", pathname);

	// jeśli ścieżka to students, omijamy middleware
	if (pathname.startsWith('/app/students')) {
		console.log("✅ Skipping middleware for /app/students");
		return NextResponse.next();
	}

	// jeśli brak tokena, redirect do loginu
	if (!token) {
		console.log("❌ No token, redirecting to /login");
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// weryfikujemy token
	try {
		const decoded = jwt.verify(token, 'secret');
		console.log("✅ Token valid:", decoded);
		return NextResponse.next();
		
	} catch (err) {
		console.log("❌ Token invalid:", err);
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/", "/attendance_reports/:path*"],
};