/* const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folderPath = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Refonte/Site/logos/shadows/blanc';  // replace with your folder path
const targetSize = { width: 800, height: 600 };  // replace with your desired dimensions

const anchorPositions = {
    'top-left': sharp.gravity.northwest,
    'top-center': sharp.gravity.north,
    'top-right': sharp.gravity.northeast,
    'center-left': sharp.gravity.west,
    'center': sharp.gravity.center,
    'center-right': sharp.gravity.east,
    'bottom-left': sharp.gravity.southwest,
    'bottom-center': sharp.gravity.south,
    'bottom-right': sharp.gravity.southeast
};

const anchorPoint = anchorPositions['center'];  // replace 'center' with your desired anchor position

fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        sharp(filePath)
            .metadata()
            .then(metadata => {
                if (metadata.width > targetSize.width || metadata.height > targetSize.height) {
                    // Crop the image
                    return sharp(filePath)
                        .resize({
                            width: targetSize.width,
                            height: targetSize.height,
                            fit: sharp.fit.cover,
                            position: anchorPoint
                        })
                        .toFile(path.join(folderPath, 'resized', file));  // output to a 'resized' sub-folder
                } else {
                    // Extend the canvas
                    return sharp(filePath)
                        .extend({
                            top: Math.max(0, (targetSize.height - metadata.height) / 2),
                            bottom: Math.max(0, (targetSize.height - metadata.height) / 2),
                            left: Math.max(0, (targetSize.width - metadata.width) / 2),
                            right: Math.max(0, (targetSize.width - metadata.width) / 2),
                            background: { r: 255, g: 255, b: 255, alpha: 1 }  // replace with your desired background color
                        })
                        .toFile(path.join(folderPath, 'resized', file));  // output to a 'resized' sub-folder
                }
            })
            .catch(err => {
                console.error(`Error processing file ${file}:`, err.message);
            });
    });
});
 */

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
