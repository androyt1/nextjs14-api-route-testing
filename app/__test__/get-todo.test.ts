import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock } from "../lib/singleton";
import { GET } from "../api/todos/get/route"; // Adjust the import to your actual endpoint
import { NextRequest } from "next/server";

vi.mock("../lib/db", () => ({
    default: prismaMock,
}));

describe("GET /api/todos", () => {
    beforeEach(() => {
        // Reset mocks before each test
        vi.resetAllMocks();
    });

    it('should return "You have no items yet" when todos is empty', async () => {
        // Mock the findMany method to return an empty array
        const todos = [] as {
            id: string;
            title: string;
            completed: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        prismaMock.todo.findMany.mockResolvedValue(todos);

        const request = new NextRequest("http://localhost:3000/api/todos", {
            method: "GET",
        });

        const response = await GET(request);
        const responseJson = await response.json();

        expect(response.status).toBe(200);
        expect(responseJson.message).toBe(`You have ${todos.length} items`);
    });
});
