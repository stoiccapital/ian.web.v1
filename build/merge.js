const fs = require("fs");
const path = require("path");

function mergePartials(inputFile, outputFile) {
  let html = fs.readFileSync(inputFile, "utf8");

  const partialPattern = /\{\{\>\s*([^\s]+)\s*\}\}/g;

  html = html.replace(partialPattern, (_, partialName) => {
    const fullPath = path.join(__dirname, "..", "html", "partials", partialName);
    if (!fs.existsSync(fullPath)) {
      console.warn("Missing partial:", fullPath);
      return "";
    }
    return fs.readFileSync(fullPath, "utf8");
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, html, "utf8");
  console.log(`✓ merged ${inputFile} → ${outputFile}`);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Source directory does not exist: ${src}`);
    return;
  }
  
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Merge template to dist/index.html
const templatePath = path.join(__dirname, "..", "index.template.html");
const outputPath = path.join(__dirname, "..", "dist", "index.html");
mergePartials(templatePath, outputPath);

// Copy assets to dist so paths work correctly
const rootDir = path.join(__dirname, "..");
const distDir = path.join(__dirname, "..", "dist");

console.log("Copying assets to dist...");
copyDir(path.join(rootDir, "css"), path.join(distDir, "css"));
copyDir(path.join(rootDir, "js"), path.join(distDir, "js"));
copyDir(path.join(rootDir, "assets"), path.join(distDir, "assets"));
console.log("✓ Build complete! Output in /dist");

