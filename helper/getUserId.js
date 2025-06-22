import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET);

export async function getUserId(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  // jwtVerify returns { payload, protectedHeader }
  const { payload } = await jwtVerify(token, SECRET);

  // your custom claim is in payload.id
  const userId = payload.id;
  console.log("Recovered userId:", userId);
  return userId || null;
}
