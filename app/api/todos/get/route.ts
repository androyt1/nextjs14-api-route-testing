import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/db";

const GET = async (req: NextRequest) => {
    const items = await prisma.todo.findMany();
    if (items.length < 0) {
        return NextResponse.json(
            {
                message: "You have no items yet",
                items,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            {
                message: `You have ${items.length} items`,
            },
            { status: 200 }
        );
    }
};

export { GET };
