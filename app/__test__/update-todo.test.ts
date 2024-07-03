import { prismaMock } from "../lib/singleton";
import { PUT } from "../api/todos/update/route";
import { vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("../lib/db", () => ({
    default: prismaMock,
}));

describe("PUT", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });
    it('Should return "success: true" when todo is updated', async () => {
        await prismaMock.todo.update.mockResolvedValue({
            id: "1",
            title: "First",
            completed: false,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        });
        const request = new NextRequest("http://localhost:3000/api/todos/update", {
            method: "PUT",
            body: JSON.stringify({ id: "1", title: "Second" }),
        });
        const response = await PUT(request);
        const responseJson = await response.json();
        expect(response.status).toBe(200);
        expect(responseJson.success).toBe(true);
    });

    it("Should return error message and status when update fails", async () => {
        const errorMessage = new Error("Todo item not found");
        await prismaMock.todo.update.mockRejectedValue(errorMessage);
        const request = new NextRequest("http://localhost:3000/api/todos/update", {
            method: "PUT",
            body: JSON.stringify({ id: "2", title: "Second" }),
        });
        const response = await PUT(request);
        const responseJson = await response.json();
        expect(response.status).toBe(400);
        expect(responseJson.message).toBe("Todo item not found");
    });
});
