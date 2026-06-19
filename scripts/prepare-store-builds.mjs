import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const chromeNoDrive = join(root, 'dist-no-drive')
const firefoxNoDrive = join(root, 'dist-firefox')

if (!existsSync(dist)) {
  throw new Error('Run npm run build before preparing store builds.')
}

for (const target of [chromeNoDrive, firefoxNoDrive]) {
  if (existsSync(target)) rmSync(target, { recursive: true, force: true })
  cpSync(dist, target, { recursive: true })
}

for (const target of [chromeNoDrive, firefoxNoDrive]) {
  const manifestPath = join(target, 'manifest.json')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (Array.isArray(manifest.host_permissions)) {
    manifest.host_permissions = manifest.host_permissions.filter((permission) => !permission.includes('googleapis.com'))
    if (manifest.host_permissions.length === 0) delete manifest.host_permissions
  }
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

const firefoxManifestPath = join(firefoxNoDrive, 'manifest.json')
const firefoxManifest = JSON.parse(readFileSync(firefoxManifestPath, 'utf8'))
delete firefoxManifest.oauth2
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
