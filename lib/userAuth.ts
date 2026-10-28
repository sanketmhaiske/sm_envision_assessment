import { verifyToken } from "@/lib/jwtAuth";
import { NextResponse } from "next/server";


export function userAuth(handler: (req: Request) => any) {
    return async (req: Request) => {
        const token = req.headers.get('authorization')?.split(' ')[1] as string;
        if (!token) {
            return NextResponse.json({ success: false, result: 'Invalid Credentials' }, { status: 401 });
        }
        const isUser = await verifyToken(token);
        if (!isUser) {
            return NextResponse.json({ success: false, result: 'Invalid Credentials' }, { status: 401 });
        }
        return handler(req);
    };
}