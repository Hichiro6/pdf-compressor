/**
 * Pure-JS image generators (no node-canvas dependency)
 * Creates PNG and JPEG buffers for test fixtures
 */
import zlib from 'zlib';
import { Buffer } from 'buffer';

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

/**
 * Create a PNG buffer with gradient colors
 */
export function createPngBuffer(width, height, hueShift = 0) {
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowLen = 1 + width * 3;
  const raw = Buffer.alloc(rowLen * height);
  for (let y = 0; y < height; y++) {
    const rowOff = y * rowLen;
    raw[rowOff] = 0;
    for (let x = 0; x < width; x++) {
      const px = rowOff + 1 + x * 3;
      raw[px] = (x * 255 / width + hueShift) & 0xFF;
      raw[px + 1] = (y * 255 / height + hueShift) & 0xFF;
      raw[px + 2] = ((x + y) * 127 / (width + height) + hueShift) & 0xFF;
    }
  }

  const compressed = zlib.deflateSync(raw);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));
  const ihdrChunk = makeChunk('IHDR', ihdr);

  return Buffer.concat([signature, ihdrChunk, idat, iend]);
}

/**
 * Create a minimal JPEG buffer
 * Note: creates a simple grayscale JPEG
 */
export function createJpegBuffer(width, height) {
  // Minimal JPEG: SOI + APP0 + DQT + SOF0 + DHT + SOS + image data + EOI
  const buf = Buffer.alloc(width * height + 600);
  let offset = 0;

  // SOI
  buf.writeUInt16BE(0xFFD8, offset); offset += 2;

  // APP0 (JFIF header)
  buf.writeUInt16BE(0xFFE0, offset); offset += 2;
  buf.writeUInt16BE(16, offset); offset += 2; // length
  buf.write('JFIF\0', offset, 5); offset += 5;
  buf[offset++] = 1; buf[offset++] = 1; // version
  buf[offset++] = 0; // density units
  buf.writeUInt16BE(1, offset); offset += 2;
  buf.writeUInt16BE(1, offset); offset += 2;
  buf[offset++] = 0; buf[offset++] = 0; // thumbnail

  // DQT (quantization table)
  buf.writeUInt16BE(0xFFDB, offset); offset += 2;
  buf.writeUInt16BE(67, offset); offset += 2;
  buf[offset++] = 0; // 8-bit precision, table 0
  for (let i = 0; i < 64; i++) buf[offset++] = 1;

  // SOF0 (Start of Frame)
  buf.writeUInt16BE(0xFFC0, offset); offset += 2;
  buf.writeUInt16BE(11, offset); offset += 2;
  buf[offset++] = 8; // precision
  buf.writeUInt16BE(height, offset); offset += 2;
  buf.writeUInt16BE(width, offset); offset += 2;
  buf[offset++] = 1; // 1 component (grayscale)
  buf[offset++] = 1; // component id
  buf[offset++] = 0x11; // sampling
  buf[offset++] = 0; // quant table

  // DHT (Huffman table)
  buf.writeUInt16BE(0xFFC4, offset); offset += 2;
  buf.writeUInt16BE(31, offset); offset += 2;
  buf[offset++] = 0; // DC table
  for (let i = 0; i < 16; i++) buf[offset++] = 0;
  buf[offset++] = 0;

  // SOS (Start of Scan)
  buf.writeUInt16BE(0xFFDA, offset); offset += 2;
  buf.writeUInt16BE(8, offset); offset += 2;
  buf[offset++] = 1; // components
  buf[offset++] = 1; // component selector
  buf[offset++] = 0; // DC/AC table
  buf[offset++] = 0; buf[offset++] = 63; buf[offset++] = 0;

  // Image data (all zeros = gray)
  for (let i = 0; i < width * height; i++) {
    buf[offset++] = 128;
  }

  // EOI
  buf.writeUInt16BE(0xFFD9, offset); offset += 2;

  return buf.subarray(0, offset);
}
