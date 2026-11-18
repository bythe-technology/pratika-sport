import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import projects from '../data/completed-projects.json' with { type: 'json' };

for (const [projectId, project] of Object.entries(projects)) {
  void test(`${project.location} has two preserved photos and responsive variants`, async () => {
    assert.equal(project.status, 'Projeto concluído');
    assert.equal(project.photos.length, 2);

    for (const photo of project.photos) {
      assert.ok(photo.alt.includes(project.location.split(',')[0]));
      assert.ok((await stat(photo.original)).size > 1_000);
      assert.ok((await stat(photo.enhanced)).size > 1_000);

      for (const width of [360, 720, 1080]) {
        for (const format of ['avif', 'webp']) {
          const path = `dist/client/images/project-cases/${projectId}/${photo.id}-${width}.${format}`;
          const metadata = await sharp(path).metadata();
          assert.equal(metadata.width, width);
          assert.equal(metadata.height, Math.round(width * 3 / 4));
          assert.ok((await stat(path)).size < 250_000, path);
        }
      }
    }
  });
}

void test('home and São Paulo show every completed project with accurate facts and no prices', async () => {
  for (const path of ['index.html', 'pages/estados/sao-paulo.html.html']) {
    const html = await readFile(`dist/client/${path}`, 'utf8');
    for (const [projectId, project] of Object.entries(projects)) {
      assert.ok(html.includes(project.status), `${path}: ${project.status}`);
      assert.ok(html.includes(project.location), `${path}: ${project.location}`);
      assert.ok(html.includes(project.photoNote), `${path}: missing image treatment note for ${projectId}`);
      assert.ok(html.includes(`quadras-reais-${projectId}`), `${path}: ${projectId}`);
      for (const photo of project.photos) assert.ok(html.includes(photo.alt), `${path}: ${photo.alt}`);
    }
    assert.doesNotMatch(html, /R\$\s*\d/);
  }
});
