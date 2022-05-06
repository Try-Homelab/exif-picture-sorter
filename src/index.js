var ExifImage = require('exif').ExifImage;
var fs = require('fs');
var path = require('path')
var read = require('fs-readdir-recursive')
var SortString = require('./utils/SortString')
const config = require('./data/config.json');

var inputdir = config.inputdir
var outputdir = config.outputdir
var sortOutDir = process.env.FOLDER_NAME //config.folder
var sortOutName = process.env.FILE_NAME //config.name
var extension_list = config.extensions

if(process.env.FOLDER_NAME == "" || process.env.FILE_NAME == ""){
    console.log("You have to set ENV: FOLDER_NAME and ENV: FILE_NAME")
    process.exit(1)
}

    const files = read(inputdir)
    files.forEach(function (filename) {
        console.log(filename)
        let extension = path.extname(filename).toLowerCase()
        if(extension_list.includes(extension) || process.env.OBSERVE_EXTENSIONS == false){
            try {
                new ExifImage({ image : `${inputdir}/${filename}` }, function (error, exifData) {
                    if (error){
                        console.log('Error: '+error.message);
                    }else{
                        console.log(exifData);
                        let created = exifData.exif.CreateDate
                        let date = created.split(" ")

                        let split_created_date = date[0].split(":")
                        let year = split_created_date[0]
                        let month = split_created_date[1]
                        let day = split_created_date[2]

                        let split_created_time = date[0].split(":")
                        let hour = split_created_time[0]
                        let minute= split_created_time[1]
                        let second = split_created_time[2]

                        var dir = SortString.getPath(sortOutDir, year, month, day, hour, minute, second)
                        var name = SortString.getName(sortOutName, path.parse(path.basename(filename)).name, path.extname(filename).toLowerCase(), year, month, day, hour, minute, second)

                        if (!fs.existsSync(`${outputdir}/${dir}`)){
                            fs.mkdirSync(`${outputdir}/${dir}`, { recursive: true });
                        }
                        fs.copyFile(`${inputdir}/${filename}`, `${outputdir}/${dir}/${name}`, (err) => {
                            if (err) throw err;
                            console.log('File Copy Successfully.');
                        });
                    }
                });
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        }
    });

    /**
 * 
 * "extensions": [
        ".jpeg",
        ".jpg"
        ]
    "folder": "%year%%dir%%month%%dir%",
    "name": "%year%%month%%day%_%filename%",



        docker run -d -e OBSERVE_EXTENSIONS=true -e FOLDER_NAME="%year%%dir%%month%%dir%" -e FILE_NAME="%year%%month%%day%_%filename%" -v /Users/richard/Desktop/Photo-Sort-Docker/input:/input -v /Users/richard/Desktop/Photo-Sort-Docker/output:/output 6b778f3490a5
 */