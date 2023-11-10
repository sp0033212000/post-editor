import { NextAuthInstance } from "@src/app/api/auth/[...nextauth]/utils";

export const GET = NextAuthInstance.handlers.GET;
export const POST = NextAuthInstance.handlers.POST;
