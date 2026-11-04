# Projeto concluído — Monte Sião, MG

## Fonte e fidelidade

As duas fotos originais foram fornecidas pelo usuário e estão preservadas em `assets/project-cases/monte-siao-mg/`. As versões mostradas no site receberam retoques de luz e cor com geração de imagem; por isso a galeria as identifica como tratadas digitalmente. O site conserva os originais no repositório para consulta.

## Prompts usados

**Vista 1:** “Edit target: the first of the two attached Pratika Sport project photographs (the view with the tall chain-link fence crossing diagonally from left foreground toward the far right, and a broad pale sandy court below). Produce one faithful, naturally enhanced version of this exact photograph for a real-project gallery on the company's website. Make only restrained photographic corrections: gently recover detail in the bright sand, lift deep foreground shadows, balance daylight/white balance, add subtle local contrast and mild natural sharpness. Preserve the exact framing, perspective, geometry, and every real-world detail. Keep the existing sand surface, fence, posts, lights, walls, trees, hills, sky exactly as photographed. Do not add or remove any object, court line, net, goal, person, structure, sign, branding, or text. No stylization, no illustration, no reconstruction, no dramatic color grading, no invented detail. Output a single realistic documentary photo.”

**Vista 2:** “Edit target: the second of the two attached Pratika Sport project photographs (the view with a wide sand court in the foreground, green hills behind the tall perimeter fencing, and leafy tree at upper right). Produce one faithful, naturally enhanced version of this exact photograph for a real-project gallery on the company's website. Make only restrained photographic corrections: gently recover texture in the very bright sand, balance daylight and white balance, lift shadows under trees, add subtle local contrast and mild natural sharpness. Preserve the exact framing, perspective, geometry, and every real-world detail. Keep the existing sand surface, fence, posts, lights, walls, houses, car, trees, hills and sky exactly as photographed. Do not add or remove any object, court line, net, goal, person, structure, sign, branding, or text. No stylization, no illustration, no reconstruction, no dramatic color grading, no invented detail. Output one realistic documentary photo.”

## Build

`data/completed-projects.json` is the case catalog. `scripts/prepare-project-cases.mjs` creates AVIF/WebP variants at 360, 720, and 1080 pixels for the server-rendered home and São Paulo pages.
