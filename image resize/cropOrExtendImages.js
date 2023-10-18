/* 

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configurations
const targetWidth = 440;
const targetHeight = 300;
const inputFolder = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Refonte/Site/logos/shadows/blanc';
const outputFolder = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Refonte/Site/logos/shadows/blanc/result';
const anchorPoint = 'center';
const supportedExtensions = ['.jpeg', '.jpg', '.png', '.webp'];
const blurIntensity = 0;  // Set to 0 for no blur, higher values for stronger blur

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    files.forEach(file => {
        const fileExtension = path.extname(file).toLowerCase();

        if (!supportedExtensions.includes(fileExtension)) {
            console.log(`Skipping unsupported file: ${file}`);
            return; // Skip unsupported files
        }

        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, file);

        sharp(inputPath)
            .metadata()
            .then(metadata => {
                let processedImage;
                if (metadata.width >= targetWidth && metadata.height >= targetHeight) {
                    processedImage = sharp(inputPath)
                        .resize({
                            width: targetWidth,
                            height: targetHeight,
                            fit: sharp.fit.cover,
                            position: anchorPoint
                        });
                } else {
                    processedImage = sharp(inputPath)
                        .resize({
                            width: targetWidth,
                            height: targetHeight,
                            fit: sharp.fit.contain,
                            position: anchorPoint,
                            background: { r: 255, g: 255, b: 255, alpha: 1 }
                        });
                }

                // Apply blur if needed
                if (blurIntensity > 0) {
                    processedImage = processedImage.blur(blurIntensity);
                }

                // Save the processed image to the output path
                return processedImage.toFile(outputPath);
            })
            .catch(err => {
                console.error(`Error processing file ${file}: ${err}`);
            });
    });
});
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configurations
const targetWidth = 400;
const targetHeight = 700;
const inputFolder = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Generations/keep';
const outputFolder = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Generations/440';
const anchorPoint = 'center';
const supportedExtensions = ['.jpeg', '.jpg', '.png', '.webp', '.tif', '.tiff', '.gif'];
const blurIntensity = 5;  // Set to 0 for no blur, higher values for stronger blur
const targetFormat = 'jpeg'; // 'jpeg', 'png', 'webp', 'tiff', 'gif', or null to retain original format
const qualitySetting = 60; // Set quality between 0-100. Relevant for lossy formats like JPEG and WebP.

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
    }

    files.forEach(file => {
        const fileExtension = path.extname(file).toLowerCase();

        if (!supportedExtensions.includes(fileExtension)) {
            console.log(`Skipping unsupported file: ${file}`);
            return; // Skip unsupported files
        }

        const inputPath = path.join(inputFolder, file);
        const outputPathWithoutExtension = path.join(outputFolder, path.basename(file, fileExtension));
        const outputPath = targetFormat ? `${outputPathWithoutExtension}.${targetFormat}` : path.join(inputFolder, file);

        sharp(inputPath)
            .metadata()
            .then(metadata => {
                let processedImage;
                if (metadata.width >= targetWidth && metadata.height >= targetHeight) {
                    processedImage = sharp(inputPath)
                        .resize({
                            width: targetWidth,
                            height: targetHeight,
                            fit: sharp.fit.cover,
                            position: anchorPoint
                        });
                } else {
                    processedImage = sharp(inputPath)
                        .resize({
                            width: targetWidth,
                            height: targetHeight,
                            fit: sharp.fit.contain,
                            position: anchorPoint,
                            background: { r: 255, g: 255, b: 255, alpha: 1 }
                        });
                }

                // Apply blur if needed
                if (blurIntensity > 0) {
                    processedImage = processedImage.blur(blurIntensity);
                }

                // Convert to target format if specified and adjust quality
                if (targetFormat) {
                    processedImage = processedImage
                        .toFormat(targetFormat, {
                            quality: qualitySetting
                        });
                }

                // Save the processed image to the output path
                return processedImage.toFile(outputPath);
            })
            .catch(err => {
                console.error(`Error processing file ${file}: ${err}`);
            });
    });
});
