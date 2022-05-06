function getPath(sortstring, year, month, day, hour, minute, second) {

    var path = 
    sortstring.replace(/%dir%/g, "/")
    .replace(/%year%/g, year)
    .replace(/%month%/g, month)
    .replace(/%day%/g, day)
    .replace(/%hour%/g, hour)
    .replace(/%minute%/g, minute)
    .replace(/%second%/g, second)

    return path

}

function getName(sortstring, name, extension, year, month, day, hour, minute, second) {

    var path = 
    sortstring.replace(/%dir%/g, "/")
    .replace(/%year%/g, year)
    .replace(/%month%/g, month)
    .replace(/%day%/g, day)
    .replace(/%hour%/g, hour)
    .replace(/%minute%/g, minute)
    .replace(/%second%/g, second)
    .replace(/%filename%/g, name) + extension

    return path

    }

module.exports = { getPath, getName }