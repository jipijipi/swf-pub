const sharp = require('sharp');

const mainImg = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Generations/14-Planet-Ride-illustration-fiche.png';
const logoSvg = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Ressources/Logos\ Startups/14-Planet-Ride-logo-blanc.svg';
const outputImg = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Refonte/Site/fiches/output3.png';
const blurVal = 5; // Adjust this for desired blur amount

function overlayLogoOnImage(mainImagePath, logoImagePath, outputImagePath, blurAmount = 0) {
    // Process main image
    sharp(mainImagePath)
        .blur(blurAmount)
        .composite([{ input: logoImagePath, gravity: 'north' }])
        .toFile(outputImagePath, (err, info) => {
            if (err) {
                console.error('Error overlaying images:', err);
            } else {
                console.log('Images overlayed successfully:', info);
            }
        });
}


// overlayLogoOnImage(mainImg, logoImg, outputImg, blurVal);



function overlayLogoOnImageAdvanced(
    mainImagePath,
    logoImagePath,
    outputImagePath,
    blurAmount = 0,
    scalePercentage = 100,
    centerHorizontally = false,
    centerVertically = false,
    xOffset = 0,
    yOffset = 0
) {
    let newWidth, newHeight;

    // Get metadata for both images
    Promise.all([
        sharp(mainImagePath).metadata(),
        sharp(logoImagePath).metadata()
    ])
        .then(([mainMetadata, logoMetadata]) => {
            newWidth = Math.round((logoMetadata.width * scalePercentage) / 100);
            newHeight = Math.round((logoMetadata.height * scalePercentage) / 100);

            if (centerHorizontally) {
                xOffset = (mainMetadata.width - newWidth) / 2;
            }

            if (centerVertically) {
                yOffset = (mainMetadata.height - newHeight) / 2;
            }

            return sharp(logoImagePath)
                .resize(newWidth, newHeight, { fit: 'inside' })
                .toBuffer();
        })
        .then(logoBuffer => {
            // Process main image and overlay the logo
            sharp(mainImagePath)
                .blur(blurAmount)
                .composite([{ input: logoBuffer, top: Math.round(yOffset), left: Math.round(xOffset) }])
                .toFile(outputImagePath, (err, info) => {
                    if (err) {
                        console.error('Error overlaying images:', err);
                    } else {
                        console.log('Images overlayed successfully:', info);
                    }
                });
        })
        .catch(err => {
            console.error('Error processing the images:', err);
        });
}

overlayLogoOnImageAdvanced(mainImg, logoSvg, outputImg, blurVal, 150, true, false, 10, 100);
