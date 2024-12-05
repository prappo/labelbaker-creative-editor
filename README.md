<p align="center">
  <img width="100" src="public/logo.svg" />
  <h1 align="center">LabelBaker Creative Editor</h1>
  <div align="center"><a target="_blank" href="https://prappo.github.io/labelbaker-creative-editor/">Click here to Preview</a></div>
</p>

<img src="public/Poster.png" />

# Use LabelBaker Creative Editor as a Library

## Installation

```shell
npm install labelbaker-creative-editor
```

## Quick Start

```javascript
import { Editor } from 'labelbaker-creative-editor';

const editor = new Editor({
  container: 'editor-container',
  width: 800,
  height: 600,
  pageWidth: 800,  // Optional: Set page dimensions
  pageHeight: 600,
  readOnly: false  // Optional: Enable/disable editing
});
```

## Core Features

### Shapes

```javascript
// Add basic shapes
editor.addRect({
  x: 100,
  y: 100,
  width: 200,
  height: 100,
  fill: 'blue',
  stroke: 'black',
  strokeWidth: 2
});

editor.addCircle({
  x: 300,
  y: 200,
  radius: 50,
  fill: 'red'
});

// Add text
editor.addText({
  x: 150,
  y: 150,
  text: 'Hello World',
  fontSize: 24,
  fontFamily: 'Arial'
});

// Add complex shapes
editor.addPolygon({
  sides: 6,
  radius: 50,
  fill: 'green'
});

editor.addStar({
  numPoints: 5,
  innerRadius: 30,
  outerRadius: 50,
  fill: 'yellow'
});

editor.addArc({
  innerRadius: 40,
  outerRadius: 70,
  angle: 120,
  fill: 'purple'
});
```

### Media Elements

```javascript
// Add images
editor.addImage({
  src: 'path/to/image.jpg',
  x: 100,
  y: 100,
  width: 200,
  height: 200
});

// Add QR Codes
editor.addQrcode({
  qrvalue: 'https://example.com',
  x: 100,
  y: 100,
  width: 200,
  height: 200
});

// Add Barcodes
editor.addBarcode({
  barcode: '1234567890',
  format: 'CODE39',
  displayValue: true,
  x: 100,
  y: 100,
  width: 300,
  height: 100
});
```

### Selection & Transformation

```javascript
// Select objects
editor.selectItem(object);
editor.deselect();

// Lock/Unlock objects
editor.lockUnlock();

// Duplicate selected objects
editor.duplicateSelected();

// Delete selected objects
editor.deleteSelected();
```

### Styling

```javascript
// Copy style from selected object
editor.copyStyle();

// Paste style to another object
editor.pasteStyle();
```

### Grouping

```javascript
// Group selected objects
editor.groupSelected();

// Add a predefined group
editor.addGroup({
  attrs: { name: 'myGroup' },
  children: [/* array of objects */]
});
```

### Layers Management

```javascript
// The editor has multiple layers:
// - backgroundLayer: For background elements
// - gridLayer: For grid display
// - rulerLayer: For rulers
// - mainLayer: For main content
// - hiddenLayer: For temporary elements

// Access layers
editor.backgroundLayer
editor.gridLayer
editor.mainLayer
```

### Export Options

```javascript
// Export as image
editor.save(quality = 3);  // Returns data URL
editor.downloadAsImage();  // Downloads as JPEG
editor.downloadAsTransparentImage();  // Downloads as PNG

// Export as PDF
editor.downloadAsPDF();

// Custom export
editor.exportToURL('https://api.example.com/export', additionalParams);
```

### Utility Functions

```javascript
// Get center positions
const centerX = editor.getXCenter(width);
const centerY = editor.getYCenter(height);

// Calculate proportional sizes
const newSize = editor.calculateNewSize(originalWidth, originalHeight, desiredWidth);
```

## Development

```shell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Features

- 🎨 Rich Shape Tools
  - Rectangle, Circle, Line
  - Polygon, Star, Arc, Triangle
  - Text with custom fonts
  - SVG path support
  
- 📊 Business Elements
  - QR Code generation
  - Multiple barcode formats
  - Image import & manipulation
  
- ✨ Advanced Features
  - Multi-layer support
  - Grid & ruler system
  - Object snapping
  - Style copying/pasting
  - Group operations
  
- 💾 Export Options
  - PNG/JPEG export
  - PDF generation
  - Custom URL export
  
- 🛠 Development Features
  - Event system
  - History management
  - Custom naming system
  - Flexible configuration

## License

MIT License

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.
