import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'products')
mkdirSync(outDir, { recursive: true })

const W = 1200
const H = 1500

const palettes = [
  ['#f3efe6', '#2b2620', '#c84b31'],
  ['#e7e0d2', '#1f1c18', '#b3402a'],
  ['#d9d2c2', '#26221c', '#d1612f'],
  ['#eadfcd', '#2a231b', '#a83b28'],
  ['#e2d9c8', '#201d18', '#c65a33'],
  ['#efe9dc', '#2d2821', '#b83f2b'],
  ['#e5ddc9', '#242019', '#cc5b2e'],
  ['#f1ebe0', '#2b2520', '#a7442c'],
  ['#e8dfd0', '#211e19', '#d06134'],
  ['#ede6d8', '#29241d', '#b2432b'],
  ['#e0d8c6', '#241f1a', '#c4532e'],
  ['#f2ede4', '#2c2621', '#ab3f29'],
]

function rng(seed) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

function grain(r) {
  let rects = ''
  for (let i = 0; i < 140; i++) {
    const x = r() * W
    const y = r() * H
    const o = 0.03 + r() * 0.045
    rects += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(1 + r() * 2).toFixed(1)}" height="${(1 + r() * 2).toFixed(1)}" class="grain" style="opacity:${o.toFixed(3)}"/>`
  }
  return rects
}

palettes.forEach(([bg, ink, signal], idx) => {
  const r = rng(idx + 1)
  const variant = idx % 3

  let subject = ''
  if (variant === 0) {
    // vessel — hard-edged tall form
    subject = `<rect x="${W * 0.28}" y="${H * 0.18}" width="${W * 0.24}" height="${H * 0.5}" rx="${W * 0.012}" fill="${ink}"/>
<rect x="${W * 0.3}" y="${H * 0.16}" width="${W * 0.04}" height="${H * 0.045}" fill="${ink}"/>
<rect x="${W * 0.46}" y="${H * 0.16}" width="${W * 0.04}" height="${H * 0.045}" fill="${ink}"/>
<circle cx="${W * 0.4}" cy="${H * 0.36}" r="${W * 0.06}" fill="${signal}"/>`
  } else if (variant === 1) {
    // garment — draped asymmetric shape
    subject = `<path d="M ${W * 0.26} ${H * 0.22} C ${W * 0.38} ${H * 0.2}, ${W * 0.42} ${H * 0.32}, ${W * 0.4} ${H * 0.46} L ${W * 0.3} ${H * 0.86} C ${W * 0.34} ${H * 0.82}, ${W * 0.36} ${H * 0.84}, ${W * 0.34} ${H * 0.88} L ${W * 0.24} ${H * 0.5} C ${W * 0.2} ${H * 0.34}, ${W * 0.2} ${H * 0.26}, ${W * 0.26} ${H * 0.22} Z" fill="${ink}"/>
<circle cx="${W * 0.62}" cy="${H * 0.4}" r="${W * 0.045}" fill="${signal}"/>`
  } else {
    // object — ring / torus composition
    subject = `<circle cx="${W * 0.5}" cy="${H * 0.42}" r="${W * 0.17}" fill="none" stroke="${ink}" stroke-width="${W * 0.03}"/>
<circle cx="${W * 0.5}" cy="${H * 0.42}" r="${W * 0.09}" fill="${signal}"/>
<rect x="${W * 0.42}" y="${H * 0.6}" width="${W * 0.16}" height="${W * 0.02}" fill="${ink}"/>`
  }

  const write = (name, view = `0 0 ${W} ${H}`, opacity = 1) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}">
<defs>
<style>.grain{fill:#000}</style>
<radialGradient id="g" cx="50%" cy="34%" r="80%">
<stop offset="0" stop-color="#ffffff"/>
<stop offset="0.55" stop-color="${bg}"/>
<stop offset="1" stop-color="${bg}"/>
</radialGradient>
</defs>
<g style="opacity:${opacity}">
<rect width="${W}" height="${H}" fill="url(#g)"/>
${subject}
${grain(r)}
</g>
</svg>`
    writeFileSync(join(outDir, name), svg)
  }

  const n = String(idx + 1).padStart(2, '0')
  write(`${n}.svg`)
  write(`${n}-b.svg`, `${W * 0.18} ${H * 0.06} ${W * 0.66} ${H * 0.72}`)
  write(`${n}-c.svg`, `${W * 0.4} ${H * 0.5} ${W * 0.5} ${H * 0.5}`)
})

console.log(`Generated ${palettes.length} assets in ${outDir}`)