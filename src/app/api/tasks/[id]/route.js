import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const { id } = params;

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(task);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  const taskUpdated = await prisma.task.update({
    where:{
      id:Number(id)
    },
    data
  })
  return NextResponse.json(taskUpdated);
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const taskRemoved = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(taskRemoved);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
