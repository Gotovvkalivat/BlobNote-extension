import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'

const root = process.cwd()
const releaseDir = join(root, 'release')
const targets = [
  { source: join(root, 'dist-chrome'), output: join(releaseDir, 'blobnote-chrome-v2.0.zip') },
  { source: join(root, 'dist-firefox'), output: join(releaseDir, 'blobnote-firefox-v2.0.zip') },
  { source: join(root, 'dist-firefox-amo'), output: join(releaseDir, 'blobnote-firefox-amo-v2.0.zip') },
]

const crcTable = new Uint32Array(256)
for (let i = 0; i < 256; i += 1) {
  let value = i
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  }
  crcTable[i] = value >>> 0
}

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function u16(value) {
  const buffer = Buffer.alloc(2)
  buffer.writeUInt16LE(value)
  return buffer
}

function u32(value) {
  const buffer = Buffer.alloc(4)
  buffer.writeUInt32LE(value >>> 0)
  return buffer
}

function dosTime(date) {
  return ((date.getHours() & 0x1f) << 11) | ((date.getMinutes() & 0x3f) << 5) | Math.floor(date.getSeconds() / 2)
}

function dosDate(date) {
  return (((date.getFullYear() - 1980) & 0x7f) << 9) | (((date.getMonth() + 1) & 0xf) << 5) | (date.getDate() & 0x1f)
}

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) return collectFiles(fullPath)
    if (entry.isFile()) return [fullPath]
    return []
  })
}

function createZip(sourceDir, outputPath) {
  if (!existsSync(sourceDir)) throw new Error('Missing folder: ' + sourceDir)
  mkdirSync(releaseDir, { recursive: true })

  const localParts = []
  const centralParts = []
  let offset = 0

  for (const filePath of collectFiles(sourceDir)) {
    const stat = statSync(filePath)
    const data = readFileSync(filePath)
    const name = relative(sourceDir, filePath).split('\\').join('/')
    const nameBuffer = Buffer.from(name)
    const crc = crc32(data)
    const time = dosTime(stat.mtime)
    const date = dosDate(stat.mtime)

    const localHeader = Buffer.concat([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(time),
      u16(date),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(nameBuffer.length),
      u16(0),
      nameBuffer,
    ])

    const centralHeader = Buffer.concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(time),
      u16(date),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(nameBuffer.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBuffer,
    ])

    localParts.push(localHeader, data)
    centralParts.push(centralHeader)
    offset += localHeader.length + data.length
  }

  const centralOffset = offset
  const central = Buffer.concat(centralParts)
  const end = Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(centralParts.length),
    u16(centralParts.length),
    u32(central.length),
    u32(centralOffset),
    u16(0),
  ])

  writeFileSync(outputPath, Buffer.concat([...localParts, central, end]))
  console.log('Created ' + basename(outputPath))
}

for (const target of targets) createZip(target.source, target.output)
