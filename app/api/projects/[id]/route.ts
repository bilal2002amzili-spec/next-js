import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const db = readDB();
  const project = db.projects.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const db = readDB();
  const index = db.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.projects[index] = {
    ...db.projects[index],
    name: body.name,
    color: body.color ?? db.projects[index].color,
  };
  writeDB(db);
  return NextResponse.json(db.projects[index]);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const db = readDB();
  const index = db.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.projects.splice(index, 1);
  writeDB(db);
  return NextResponse.json({ success: true });
}
