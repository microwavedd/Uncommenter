#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to remove comments based on file extension
function removeCommentsFromFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    let commentRegex;

    switch (ext) {
        case '.js':
        case '.ts':
        case '.java':
        case '.cpp':
        case '.c':
        case '.h':
        case '.cs':
            commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*$/gm;
            break;
        case '.py':
            commentRegex = /#.*$/gm;
            break;
        case '.html':
        case '.xml':
            commentRegex = /<!--[\s\S]*?-->/g;
            break;
        case '.css':
        case '.scss':
            commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
            break;
        case '.sh':
            commentRegex = /#.*$/gm;
            break;
        case '.rb':
            commentRegex = /#.*$/gm;
            break;
        case '.sql':
            commentRegex = /--.*$/gm;
            break;
        case '.json':
            // JSON files have no comments, but we include it here for completeness
            commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*/g;
            break;
        default:
            console.error('Unsupported file type.');
            return;
    }

    try {
        const text = fs.readFileSync(filePath, 'utf8');
        const uncommentedText = text.replace(commentRegex, '');
        fs.writeFileSync(filePath, uncommentedText, 'utf8');
        console.log(`Comments removed from ${filePath}`);
    } catch (error) {
        console.error(`Error processing file ${filePath}: ${error.message}`);
    }
}

function processDirectory(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            process.exit(1);
        }

        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.error(`Error getting file stats: ${err.message}`);
                    return;
                }

                if (stats.isFile()) {
                    removeCommentsFromFile(fullPath);
                }
            });
        });
    });
}

const inputPath = process.argv[2];

if (!inputPath) {
    console.error('No input path provided.');
    process.exit(1);
}

const fullPath = path.resolve(inputPath);

fs.stat(fullPath, (err, stats) => {
    if (err) {
        console.error(`Error reading path: ${err.message}`);
        process.exit(1);
    }

    if (stats.isFile()) {
        removeCommentsFromFile(fullPath);
    } else if (stats.isDirectory()) {
        processDirectory(fullPath);
    } else {
        console.error('Path is neither a file nor a directory.');
        process.exit(1);
    }
});
