import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

const POST = async (request: NextRequest) => {
    const body = (await request.json()) as { title: string };
    const { title } = body;
    await prisma.todo.create({ data: { title } });
    return NextResponse.json({ success: true }, { status: 201 });
};

export { POST };
