import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const chromeStore = join(root, 'dist-chrome')
const firefoxStore = join(root, 'dist-firefox')
const firefoxAmoStore = join(root, 'dist-firefox-amo')

if (!existsSync(dist)) {
  throw new Error('Run npm run build before preparing store builds.')
}

for (const target of [chromeStore, firefoxStore, firefoxAmoStore]) {
  if (existsSync(target)) rmSync(target, { recursive: true, force: true })
  cpSync(dist, target, { recursive: true })
}

function writeFirefoxManifest(targetDir, { amo = false } = {}) {
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
  if (amo) {
    manifest.data_collection_permissions = {
      required: ['none'],
    }
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

writeFirefoxManifest(firefoxStore)
writeFirefoxManifest(firefoxAmoStore, { amo: true })

mkdirSync(join(root, 'release'), { recursive: true })
