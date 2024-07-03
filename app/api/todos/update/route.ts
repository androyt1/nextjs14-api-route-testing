import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

const PUT = async (request: NextRequest) => {
    const body = (await request.json()) as { id: string; title: string };
    const { id, title } = body;
    try {
        await prisma.todo.update({
            where: { id: id },
            data: { title },
        });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ message: "Unknown error" }, { status: 400 });
        }
    }
};

export { PUT };
