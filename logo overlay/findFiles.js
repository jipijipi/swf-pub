const fs = require('fs');
const path = require('path');


function findFileBySubstring(dirPath, substring) {
    try {
        // Read all filenames in the directory.
        const filenames = fs.readdirSync(dirPath);

        // Find the first filename that includes the given substring.
        const matchingFilename = filenames.find(filename => filename.includes(substring));

        // If a matching filename is found, return its complete path.
        if (matchingFilename) {
            return path.join(dirPath, matchingFilename);
        }

        // If no matching filename is found, return null.
        return null;
    } catch (error) {
        console.error(`Error reading directory ${dirPath}: ${error.message}`);
        return null;
    }
}

// Example usage:
const dir = '/Users/jpl/Library/CloudStorage/GoogleDrive-jp@sowefund.com/Shared\ drives/Communication/Generations';
const substr = '14-Planet-Ride';
const foundFile = findFileBySubstring(dir, substr);
if (foundFile) {
    console.log(`Found file: ${foundFile}`);
} else {
    console.log('File not found.');
}
