import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Prisma Task Model", () => {
  it("should create a new task", async () => {
    const task = await prisma.task.create({
      data: { title: "test task" },
    });

    expect(task).toHaveProperty("id");
    expect(task.title).toBe("test task");
  });
});
