import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const publicRoutes = ["/login", "/register"];
const isPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => pathname.startsWith(route));
};

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('auth-token')?.value;
    const isAuthenticated = token ? await verifyToken(token) : false;

    console.log("isAuthenticated", isAuthenticated);
    console.log("token", token);

    if (isAuthenticated && isPublicRoute(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isAuthenticated && !isPublicRoute(pathname)) {
      console.log("Redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)"],
};
