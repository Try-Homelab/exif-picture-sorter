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
                        //exif info
                        //date
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
                        //-date

                        //file infos
                        var file_stats = fs.statSync(`${inputdir}/${filename}`);
                        var mtime = file_stats.mtime;

                        //original date
                        let ocreated = exifData.exif.DateTimeOriginal
                        let odate = ocreated.split(" ")

                        let osplit_created_date = odate[0].split(":")
                        let oyear = osplit_created_date[0]
                        let omonth = osplit_created_date[1]
                        let oday = osplit_created_date[2]

                        let osplit_created_time = odate[0].split(":")
                        let ohour = osplit_created_time[0]
                        let ominute= osplit_created_time[1]
                        let osecond = osplit_created_time[2]
                        //-original date

                        let make = exifData.image.Make
                        let model = exifData.image.Model
                        let software = exifData.image.Software
                        let iso = exifData.exif.ISO
                        let shutter = exifData.exif.ShutterSpeedValue
                        let aperture = exifData.exif.ApertureValue
                        let max_aperture = exifData.exif.MaxApertureValue
                        let width = exifData.exif.ExifImageWidth
                        let height = exifData.exif.ExifImageHeight
                        let lense = exifData.exif.LensModel



                        var dir = SortString.getPath(sortOutDir, year, month, day, hour, minute, second,
                                                     oyear, omonth, oday, ohour, ominute, osecond,
                                                     make, model, software, iso, shutter, aperture, max_aperture,
                                                     width, height, lense, mtime)
                        var name = SortString.getName(sortOutName, path.parse(path.basename(filename)).name, path.extname(filename).toLowerCase(),
                                                     year, month, day, hour, minute, second,
                                                     oyear, omonth, oday, ohour, ominute, osecond,
                                                     make, model, software, iso, shutter, aperture, max_aperture,
                                                     width, height, lense, mtime)

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
 * {

  image: {

    ImageDescription: '                               ',

    Make: 'SONY',

    Model: 'ILCE-7M2',

    XResolution: 300,

    YResolution: 300,

    ResolutionUnit: 2,

    Software: 'Capture One 22 Macintosh',

    ExifOffset: 204

  },

  thumbnail: { Compression: 6, ThumbnailOffset: 860, ThumbnailLength: 2914 },

  exif: {

    ExposureTime: 0.0125,

    FNumber: 6.3,

    ExposureProgram: 2,

    ISO: 100,

    SensitivityType: 2,

    RecommendedExposureIndex: 100,

    ExifVersion: <Buffer 30 32 33 30>,

    DateTimeOriginal: '2022:05:21 16:33:52',

    CreateDate: '2022:05:21 16:33:52',

    ShutterSpeedValue: 6.321928,

    ApertureValue: 5.310704,

    BrightnessValue: 7.6890625,

    ExposureCompensation: 0,

    MaxApertureValue: 4,

    MeteringMode: 5,

    LightSource: 0,

    Flash: 16,

    FocalLength: 43,

    ExifImageWidth: 3813,

    ExifImageHeight: 5719,

    FileSource: <Buffer 03>,

    SceneType: <Buffer 01>,

    CustomRendered: 0,

    ExposureMode: 0,

    WhiteBalance: 0,

    DigitalZoomRatio: 1,

    FocalLengthIn35mmFormat: 43,

    SceneCaptureType: 0,

    Contrast: 0,

    Saturation: 0,

    Sharpness: 0,

    LensInfo: [ 43, 43, 4, 4 ],

    LensModel: 'Zeiss Vario-Tessar T* FE 24-70 mm F4 ZA OSS (SEL2470Z)'

  },

  gps: {},

  interoperability: {},

  makernote: {}

}
 * 
 * "extensions": [
        ".jpeg",
        ".jpg"
        ]
    "folder": "%year%%dir%%month%%dir%",
    "name": "%year%%month%%day%_%filename%",



        docker run -d -e OBSERVE_EXTENSIONS=true -e FOLDER_NAME="%year%%dir%%month%%dir%" -e FILE_NAME="%year%%month%%day%_%filename%" -v /Users/richard/Desktop/Photo-Sort-Docker/input:/input -v /Users/richard/Desktop/Photo-Sort-Docker/output:/output 6b778f3490a5
 */