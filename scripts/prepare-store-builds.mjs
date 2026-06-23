import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const chromeStore = join(root, 'dist-chrome')
const firefoxStore = join(root, 'dist-firefox')
const firefoxLocalStore = join(root, 'dist-firefox-local')
const firefoxAmoStore = join(root, 'dist-firefox-amo')

if (!existsSync(dist)) {
  throw new Error('Run npm run build before preparing store builds.')
}

for (const target of [chromeStore, firefoxStore, firefoxLocalStore, firefoxAmoStore]) {
  if (existsSync(target)) rmSync(target, { recursive: true, force: true })
  cpSync(dist, target, { recursive: true })
}

function noDataCollection() {
  return {
    required: ['none'],
    optional: [],
  }
}

function writeFirefoxManifest(targetDir, { store = false } = {}) {
  const manifestPath = join(targetDir, 'manifest.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  manifest.background = {
    scripts: ['src/background/index.js'],
  }
  manifest.browser_specific_settings = {
    gecko: {
      id: 'blobnote-v2@goti.local',
      strict_min_version: '109.0',
    },
  }
  delete manifest.data_collection_permissions
  if (store) {
    const permissions = noDataCollection()
    manifest.data_collection_permissions = permissions
    manifest.browser_specific_settings.gecko.data_collection_permissions = permissions
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

writeFirefoxManifest(firefoxStore, { store: true })
writeFirefoxManifest(firefoxLocalStore)
writeFirefoxManifest(firefoxAmoStore, { store: true })

mkdirSync(join(root, 'release'), { recursive: true })
