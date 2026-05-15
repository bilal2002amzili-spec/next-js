import AddProjectForm from './AddProjectForm';
import { deleteProject, renameProject } from '../actions/projects';
import { getBaseUrl } from '@/lib/api';
import type { Project } from '@/lib/db';

export default async function DashboardPage() {
  const res = await fetch(`${getBaseUrl()}/api/projects`, { cache: 'no-store' });
  const projects: Project[] = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>{projects.length} projets</p>
      <AddProjectForm />
      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />
            <a href={`/projects/${p.id}`}>{p.name}</a>
            <form action={renameProject} style={{ display: 'flex', gap: 4 }}>
              <input type="hidden" name="id" value={p.id} />
              <input type="hidden" name="color" value={p.color} />
              <input
                name="newName"
                defaultValue={p.name}
                required
                style={{
                  padding: 4,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  fontSize: 14,
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  cursor: 'pointer',
                  padding: '2px 8px',
                }}
              >
                Renommer
              </button>
            </form>
            <form action={deleteProject} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={p.id} />
              <button
                type="submit"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                🗑
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
