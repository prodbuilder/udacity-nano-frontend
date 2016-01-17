/* 
Finish the alphabetizer(_names) function, which takes in a names array (of length N) containing strings of names and returns an alphabetized array of names in lastname, firstname format. 

Assume input names are "first last", with no middle names etc.
*/

var alphabetizer = function (names) {
    sorted = [];
    names.forEach(function(name) {
        var _lst = name.split(" ");
        sorted.push(_lst[1] + ', ' + _lst[0]);
    });
    sorted.sort();
    return sorted;
}

var names = ['John W Young', 'Charles Duke', 'Eugene Cernan']
console.log(alphabetizer(names));