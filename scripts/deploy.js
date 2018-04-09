const AWS = require("aws-sdk");
const mime = require('mime-types');
const fs = require("fs");
const path = require("path");

const config = {
    s3BucketName: 'starquiz-app',
    folderPath: '../dist'
  };

const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

// resolve full folder path
const distFolderPath = path.join(__dirname, config.folderPath);

// Normalize \\ paths to / paths.
function unixifyPath(filepath) {
    return process.platform === 'win32' ? filepath.replace(/\\/g, '/') : filepath;
};

// Recurse into a directory, executing callback for each file.
function walk(rootdir, callback, subdir) {
    const isSubdir = subdir ? true : false;
    const abspath = subdir ? path.join(rootdir, subdir) : rootdir;

    fs.readdirSync(abspath).forEach((filename) => {
        const filepath = path.join(abspath, filename);
        if (fs.statSync(filepath).isDirectory()) {
            walk(rootdir, callback, unixifyPath(path.join(subdir || '', filename || '')))
        } else {
            fs.readFile(filepath, (error, fileContent) => {
                if (error) {
                    throw error;
                }

                const mimeType = mime.lookup(filepath)

                const s3Obj = {
                    Bucket: isSubdir ? `${config.s3BucketName}/${subdir}` : config.s3BucketName,
                    Key: filename,
                    Body: fileContent,
                    ContentType: mimeType
                }

                // upload file to S3
                s3.putObject(s3Obj, (res) => {
                    console.log(`Successfully uploaded '${filepath}' with MIME type '${mimeType}'`)
                })
            })
        }
    })
}

// start upload process
walk(distFolderPath, (filepath, rootdir, subdir, filename) => {
    console.log('Filepath', filepath);
});
