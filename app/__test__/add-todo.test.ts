import { prismaMock } from "../lib/singleton";
import { NextRequest } from "next/server";
import { POST } from "../api/todos/add/route";
import { vi, beforeEach } from "vitest";

vi.mock("../lib/db", () => ({
    default: prismaMock,
}));

describe("POST", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("Should return initial json", async () => {
        await prismaMock.todo.create.mockResolvedValue({
            id: "1",
            title: "First",
            completed: false,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        });
        const request = new NextRequest("http://localhost:3000/api/todos/add", {
            method: "POST",
            body: JSON.stringify({ title: "First" }),
        });
        const response = await POST(request);
        const responseJson = await response.json();
        expect(response.status).toBe(201);
        expect(responseJson.success).toBe(true);
    });
});
