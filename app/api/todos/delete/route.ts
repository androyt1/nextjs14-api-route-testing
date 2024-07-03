import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/db";

const DELETE = async (request: NextRequest) => {
    const body = (await request.json()) as { id: string };
    const { id } = body;
    try {
        await prisma.todo.delete({
            where: { id: id },
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

export { DELETE };
