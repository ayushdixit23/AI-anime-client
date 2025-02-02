import { auth } from "@/auth";
import { RESTRICTED_PATHS } from "./app/utils/constants";

export default auth((req) => {

  if (!req.auth && !RESTRICTED_PATHS.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && RESTRICTED_PATHS.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/profile", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
