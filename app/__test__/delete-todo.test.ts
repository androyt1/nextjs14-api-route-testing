import { prismaMock } from "../lib/singleton";
import { DELETE } from "../api/todos/delete/route";
import { vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("../lib/db", () => ({
    default: prismaMock,
}));

describe("DELETE", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("Should return true and status 200", async () => {
        await prismaMock.todo.delete.mockResolvedValue({
            id: "1",
            title: "First",
            completed: false,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        });
        const request = new NextRequest("http://localhost:3000/api/todos/delete", {
            method: "DELETE",
            body: JSON.stringify({ id: "1" }),
        });
        const response = await DELETE(request);
        const responseJson = await response.json();
        expect(response.status).toBe(200);
        expect(responseJson.success).toBe(true);
    });

    it("Should return an error and status 400 when delete fails", async () => {
        const errorMessage = "Todo item not found";
        prismaMock.todo.delete.mockRejectedValue(new Error(errorMessage));

        const request = new NextRequest("http://localhost:3000/api/todos/delete", {
            method: "DELETE",
            body: JSON.stringify({ id: "2" }),
        });

        const response = await DELETE(request);
        const responseJson = await response.json();

        expect(response.status).toBe(400);
        expect(responseJson.message).toBe(errorMessage);
    });
});
