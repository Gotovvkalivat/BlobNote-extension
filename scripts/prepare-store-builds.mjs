import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const chromeStore = join(root, 'dist-chrome')
const firefoxStore = join(root, 'dist-firefox')

if (!existsSync(dist)) {
  throw new Error('Run npm run build before preparing store builds.')
}

for (const target of [chromeStore, firefoxStore]) {
  if (existsSync(target)) rmSync(target, { recursive: true, force: true })
  cpSync(dist, target, { recursive: true })
}

const firefoxManifestPath = join(firefoxStore, 'manifest.json')
const firefoxManifest = JSON.parse(readFileSync(firefoxManifestPath, 'utf8'))
firefoxManifest.background = {
  scripts: ['src/background/index.js'],
}
firefoxManifest.browser_specific_settings = {
  gecko: {
    id: 'blobnote-v2@goti.local',
    strict_min_version: '109.0',
  },
}
firefoxManifest.data_collection_permissions = {
  required: ['none'],
}
writeFileSync(firefoxManifestPath, `${JSON.stringify(firefoxManifest, null, 2)}\n`, 'utf8')

mkdirSync(join(root, 'release'), { recursive: true })
