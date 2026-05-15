'use server';

import { revalidatePath } from 'next/cache';
import { getBaseUrl } from '@/lib/api';

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await fetch(`${getBaseUrl()}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = formData.get('id') as string;
  const newName = formData.get('newName') as string;
  const color = formData.get('color') as string;

  await fetch(`${getBaseUrl()}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color }),
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;

  await fetch(`${getBaseUrl()}/api/projects/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
}
