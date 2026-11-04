import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import projects from '../data/completed-projects.json' with { type: 'json' };

void test('Monte Sião is represented as one completed project with two preserved photo angles', async () => {
  const project = projects['monte-siao-mg'];
  assert.ok(project);
  assert.equal(project.status, 'Projeto concluído');
  assert.equal(project.location, 'Monte Sião, Minas Gerais');
  assert.equal(project.photos.length, 2);

  for (const photo of project.photos) {
    assert.match(photo.alt, /Monte Sião/);
    assert.ok((await stat(photo.original)).size > 1_000);
    assert.ok((await stat(photo.enhanced)).size > 1_000);

    for (const width of [360, 720, 1080]) {
      for (const format of ['avif', 'webp']) {
        const path = `dist/client/images/project-cases/monte-siao-mg/${photo.id}-${width}.${format}`;
        const metadata = await sharp(path).metadata();
        assert.equal(metadata.width, width);
        assert.equal(metadata.height, Math.round(width * 3 / 4));
        assert.ok((await stat(path)).size < 250_000, path);
      }
    }
  }
});

void test('home and São Paulo show the completed project with accurate facts and no prices', async () => {
  for (const path of ['index.html', 'pages/estados/sao-paulo.html.html']) {
    const html = await readFile(`dist/client/${path}`, 'utf8');
    assert.match(html, /Projeto concluído/);
    assert.match(html, /Monte Sião, Minas Gerais/);
    assert.match(html, /quadras-reais-monte-siao/);
    assert.match(html, /Quadra de areia concluída em Monte Sião/);
    assert.doesNotMatch(html, /R\$\s*\d/);
  }
});
