# PDF Compressor

> Compress PDF files in your browser. 100% local, your files never leave your browser.

## Features

- **Smart compression** — Detects image-heavy PDFs (Apple Notes exports, scanned documents) and recompresses embedded images
- **Three quality levels** — Low (minimal loss), Medium (balanced), High (maximum reduction)
- **Batch processing** — Compress multiple PDFs at once
- **ZIP download** — Download all compressed files as a single archive
- **Privacy-first** — No backend, no uploads, no tracking. Everything happens in your browser.

## Use Cases

- **Apple Notes PDFs** — Exported notes with images are often huge. Compress them for email attachments.
- **Scanned documents** — Reduce scanned PDF sizes without losing readability.
- **Email attachments** — Get PDFs under email size limits.

## Tech Stack

- [pdf-lib](https://pdf-lib.js.org/) — PDF manipulation
- [pdfjs-dist](https://mozilla.github.io/pdf.js/) — PDF rendering and analysis
- [fflate](https://github.com/101arrowz/fflate) — ZIP compression
- [Vite](https://vitejs.dev/) — Build tooling

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm run test:run
```

## License

CC-BY-NC-ND-4.0
