/**
 * Test fixtures generator for PDF Compressor E2E tests
 * Generates PDFs with embedded images (compressible) using pdf-lib
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { createPngBuffer, createJpegBuffer } from './image-gen.js';

const fixturesDir = path.join(process.cwd(), 'tests/e2e/fixtures');

/**
 * Create a multi-page PDF with text and embedded images
 */
export async function createTestPdf(filename = 'test-document.pdf', pageCount = 3) {
  fs.mkdirSync(fixturesDir, { recursive: true });
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.addPage([595, 842]); // A4
    page.drawText(`Page ${i + 1}`, { x: 50, y: 800, size: 24, font });
    page.drawText(`Test content for page ${i + 1} — Lorem ipsum dolor sit amet`, {
      x: 50, y: 770, size: 12, font,
    });

    // Embed a colorful image (compressible content)
    const pngImage = createPngBuffer(200, 150, i * 60);
    await pdfDoc.embedPng(pngImage).then(img => {
      page.drawImage(img, { x: 50, y: 500, width: 200, height: 150 });
    }).catch(() => {
      // If PNG embedding fails, skip image
    });
  }

  const pdfBytes = await pdfDoc.save();
  const filepath = path.join(fixturesDir, filename);
  fs.writeFileSync(filepath, pdfBytes);
  return filepath;
}

/**
 * Create a simple PDF with only text (low compressibility for images)
 */
export async function createTextOnlyPdf(filename = 'text-only.pdf', pageCount = 2) {
  fs.mkdirSync(fixturesDir, { recursive: true });
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.addPage([595, 842]);
    page.drawText(`Text-only page ${i + 1}`, { x: 50, y: 800, size: 24, font });
    for (let j = 0; j < 20; j++) {
      page.drawText(`Line ${j + 1}: Lorem ipsum dolor sit amet consectetur adipiscing elit`, {
        x: 50, y: 750 - j * 20, size: 10, font,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  const filepath = path.join(fixturesDir, filename);
  fs.writeFileSync(filepath, pdfBytes);
  return filepath;
}

/**
 * Create a large PDF (many pages) for edge case testing
 */
export async function createLargePdf(filename = 'large-document.pdf', pageCount = 30) {
  return createTestPdf(filename, pageCount);
}

/**
 * Create a test image (PNG or JPEG)
 */
export function createTestImage(filename = 'test-image.png', width = 400, height = 300) {
  fs.mkdirSync(fixturesDir, { recursive: true });
  const ext = path.extname(filename).toLowerCase();
  let buffer;
  if (ext === '.jpg' || ext === '.jpeg') {
    buffer = createJpegBuffer(width, height);
  } else {
    buffer = createPngBuffer(width, height);
  }
  const filepath = path.join(fixturesDir, filename);
  fs.writeFileSync(filepath, buffer);
  return filepath;
}
