function getPath(sortstring, year, month, day, hour, minute, second,
                 oyear, omonth, oday, ohour, ominute, osecond,
                 make, model, software, iso, shutter, aperture, max_aperture,
                 width, height, lense, mtime) {

    var path = 
    sortstring.replace(/%dir%/g, "/")
    .replace(/%year%/g, year)
    .replace(/%month%/g, month)
    .replace(/%day%/g, day)
    .replace(/%hour%/g, hour)
    .replace(/%minute%/g, minute)
    .replace(/%second%/g, second)
    .replace(/%originalyear%/g, oyear)
    .replace(/%originalmonth%/g, omonth)
    .replace(/%originalday%/g, oday)
    .replace(/%originalhour%/g, ohour)
    .replace(/%originalminute%/g, ominute)
    .replace(/%originalsecond%/g, osecond)
    .replace(/%make%/g, make)
    .replace(/%model%/g, model)
    .replace(/%software%/g, software)
    .replace(/%iso%/g, iso)
    .replace(/%shutter%/g, shutter)
    .replace(/%aperture%/g, aperture)
    .replace(/%maxaperture%/g, max_aperture)
    .replace(/%width%/g, width)
    .replace(/%height%/g, height)
    .replace(/%lense%/g, lense)
    .replace(/%lastchange%/g, mtime)

    return path

}

function getName(sortstring, name, extension, year, month, day, hour, minute, second,
                 oyear, omonth, oday, ohour, ominute, osecond,
                 make, model, software, iso, shutter, aperture, max_aperture,
                 width, height, lense) {

    var path = 
    sortstring.replace(/%dir%/g, "/")
    .replace(/%year%/g, year)
    .replace(/%month%/g, month)
    .replace(/%day%/g, day)
    .replace(/%hour%/g, hour)
    .replace(/%minute%/g, minute)
    .replace(/%second%/g, second)
    .replace(/%filename%/g, name)
    .replace(/%originalyear%/g, oyear)
    .replace(/%originalmonth%/g, omonth)
    .replace(/%originalday%/g, oday)
    .replace(/%originalhour%/g, ohour)
    .replace(/%originalminute%/g, ominute)
    .replace(/%originalsecond%/g, osecond)
    .replace(/%make%/g, make)
    .replace(/%model%/g, model)
    .replace(/%software%/g, software)
    .replace(/%iso%/g, iso)
    .replace(/%shutter%/g, shutter)
    .replace(/%aperture%/g, aperture)
    .replace(/%maxaperture%/g, max_aperture)
    .replace(/%width%/g, width)
    .replace(/%height%/g, height)
    .replace(/%lense%/g, lense)
    .replace(/%lastchange%/g, mtime) + extension

    return path

    }

module.exports = { getPath, getName }