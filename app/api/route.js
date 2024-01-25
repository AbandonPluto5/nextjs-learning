// app/api/route.js
import { NextResponse } from "next/server";

// export async function GET() {
//   const res = await fetch("https://dog-api.kinduff.com/api/facts");
//   const data = await res.json();

//   return NextResponse.json({ data });
// }

export async function GET(request, { params }) {
  // 访问 /home, pathname 的值为 /home
  const pathname = request.nextUrl.pathname;
  // 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
  const searchParams = request.nextUrl.searchParams;
  // 当访问 /dashboard/1 时，params 的值为 { team: '1' }
  const team = params.team;
}

export async function HEAD(request) {}

export async function POST(request) {}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// 如果 `OPTIONS` 没有定义, Next.js 会自动实现 `OPTIONS`
export async function OPTIONS(request) {}
