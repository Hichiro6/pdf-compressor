# PDF Compressor Development Plan

## Overview
Compress PDF files client-side, reducing file size while maintaining readability. Handles both native PDFs and PDFs created from images (e.g., Apple Notes exports) by recompressing embedded images.

## Features
- **Compression levels**: Low (minimal quality loss), Medium (balanced), High (maximum reduction)
- **Smart detection**: Automatically detects image-heavy PDFs (Apple Notes, scanned docs)
- **Preview before download**: Show original vs compressed size
- **Batch support**: Compress multiple PDFs at once
- **Privacy-first**: 100% client-side, no data leaves the browser

## Technical Approach

### For Text-Based PDFs
- Remove unused objects, fonts, metadata
- Optimize PDF structure

### For Image-Heavy PDFs (Apple Notes, Scans)
1. Extract pages using pdfjs-dist
2. Render each page to canvas
3. Recompress as JPEG with configurable quality (0.3-0.9)
4. Build new PDF with compressed images using pdf-lib
5. Result: Much smaller files for image-based PDFs

## UI Flow
1. Drop zone → Upload PDF(s)
2. Select compression level (Low/Medium/High)
3. Preview original size vs estimated compressed size
4. Process with progress bar
5. Download individual files or ZIP

## i18n Keys (planned ~20 keys)
- app.title, header.tagline, header.badge
- dropzone.title, dropzone.subtitle, dropzone.support
- controls.quality (quality labels: Low, Medium, High)
- controls.preview (estimate)
- btn.compress, btn.download, btn.reset
- alerts.noFiles, alerts.error, alerts.success
- results.original, results.compressed, results.savings

## Accessibility
- ARIA labels on all controls
- Keyboard navigation
- Screen reader announcements for progress
- Color-blind friendly quality indicators

## Testing Strategy
- Unit: Compression ratio calculations, size estimation
- E2E: Upload → compress → download workflow
- Edge cases: Very large PDFs, single-page docs, mixed content

## Privacy Guarantee
- No API calls beyond CDN for libraries
- No analytics
- No telemetry
- Source code auditable
