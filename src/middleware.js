import { NextResponse } from "next/server";

// export function middleware(request) {
//   return NextResponse.redirect(new URL("/blog/yayu_middleware", request.url));
// }

// 设置匹配路径
// export const config = {
//   matcher: "/blog/yayu",
// };

// 匹配多个
// export const config = {
//   matcher: ["/about/:path*", "/dashboard/:path*"],
// };

// 支持正则表达式
// export const config = {
//   matcher: [
//     /*
//      * 匹配所有的路径除了以这些作为开头的：
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

// 除了matcher 也可以使用条件语句来匹配指定路径
// export function middleware(request) {
//   if (request.nextUrl.pathname.startsWith("/about")) {
//     return NextResponse.rewrite(new URL("/about-2", request.url));
//   }
//   if (request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.rewrite(new URL("/dashboard/user", request.url));
//   }
// }

// 处理Cookie
// export function middleware(request) {
//   // 假设传入的请求 header 里 "Cookie:nextjs=fast"
//   let cookie = request.cookies.get("nextjs");
//   console.log(cookie); // { name: "nextjs", value: "fast", Path: '/' }
//   const allCookies = request.cookies.getAll();
//   console.log(allCookies); // [{ name: "nextjs", value: "fast" }];

//   request.cookies.has("nextjs"); // true
//   request.cookie.delete("nextjs");
//   request.cookie.has("nextjs"); // false

//   // 设置cookies
//   const response = NextResponse.next();
//   response.cookies.set("vercel", "fast");
//   response.cookies.set({
//     name: "vercel",
//     value: "fast",
//     path: "/",
//   });
//   cookie = response.cookies.get("vercel");
//   console.log(cookie); // { name: "vercel", value: "fast", Path: "/}

//   // 响应 header 为 `Set-Cookie:vercel=fast;path=/test`
//   return response;
// }

// 处理headers
// export function middleware(request) {
//   // 请求标头
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-hello-from-middleware1", "hello");

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });

//   response.headers.set("x-hello-from-middleware2", "hello");
//   return response;
// }

// 返回响应
// export const config = {
//   matcher: "/api/:function*",
// };
// export function middleware(request) {
//   // isAuthenticated 认证函数
//   if (!isAuthenticated(request)) {
//     return new NextResponse(
//       JSON.stringify({ success: false, message: "authentication failed" }),
//       { status: 401, headers: { "content-type": "application/json" } }
//     );
//   }
// }

// 高级中间件标记

// const legacyPrefixes = ["/docs", "/blog"];
// export default async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
//     return NextResponse.next();
//   }

//   // 应用尾部斜杠
//   if (
//     !pathname.endsWith("/") &&
//     !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
//   ) {
//     req.nextUrl.pathname += "/";
//     return NextResponse.redirect(req.nextUrl);
//   }
// }

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // GET /_next/data/build-id/hello.json

  console.log(pathname);
  // 如果有此 flag 值为 /_next/data/build-id/hello.json
  // 没有此 flag 值为 /hello
}
