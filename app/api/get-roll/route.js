import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET); // Ensure this is defined

export async function POST(request) {
    // console.log(SECRET);
    // console.log(process.env.TOKEN_SECRET);
  try {
    const token = request.cookies.get("token")?.value;
    // console.log(token);
    if (!token) {
      return NextResponse.json(
        { roles: [], message: "login first..." },
        { status: 403 }
      );
    }

    const { payload } = await jwtVerify(token, SECRET);
    const roles = payload.roles || [];

    return NextResponse.json(
      { roles },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { roles: [], message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}