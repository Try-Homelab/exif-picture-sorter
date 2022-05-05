var ExifImage = require('exif').ExifImage;
var fs = require('fs');
var path = require('path')
var read = require('fs-readdir-recursive')
var SortString = require('../utils/SortString')
const config = require('../data/config.json');

var inputdir = config.inputdir
var outputdir = config.outputdir
var sortOutDir = config.folder
var sortOutName = config.name
var extension_list = config.extensions

    const files = read(inputdir)
    files.forEach(function (filename) {
        console.log(filename)
        let extension = path.extname(filename).toLowerCase()
        if(extension_list.includes(extension)){
            try {
                new ExifImage({ image : `${inputdir}/${filename}` }, function (error, exifData) {
                    if (error){
                        console.log('Error: '+error.message);
                    }else{
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