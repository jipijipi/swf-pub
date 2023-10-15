const sharp = require('sharp');

function overlayLogoOnImage(mainImagePath, logoImagePath, outputImagePath, blurAmount = 0) {
    // Process main image
    sharp(mainImagePath)
        .blur(blurAmount)
        .toBuffer()
        .then(blurredImageBuffer => {
            sharp(blurredImageBuffer)
                .overlayWith(logoImagePath, { gravity: sharp.gravity.center })
                .toFile(outputImagePath, (err, info) => {
                    if (err) {
                        console.error('Error overlaying images:', err);
                    } else {
                        console.log('Images overlayed successfully:', info);
                    }
                });
        })
        .catch(err => {
            console.error('Error processing the image:', err);
        });
}

// Example usage:
const mainImg = './path/to/your/main/image.jpg';
const logoImg = './path/to/your/logo.png';
const outputImg = './path/to/output/image.jpg';
const blurVal = 5; // Adjust this for desired blur amount

overlayLogoOnImage(mainImg, logoImg, outputImg, blurVal);
