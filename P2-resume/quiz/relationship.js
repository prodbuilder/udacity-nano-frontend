// compare relationships between x and y
// output proper error info, when input contains non-numbers

var getRelationship = function(x, y) {
    var xType = typeof x;
    var yType = typeof y;
    // console.log('x = ' + x + ', type = ' + xType + ', y = ' + y + ', type = '+ yType);
    if (xType === 'number' && yType === 'number') {
        return x === y ? '=' : ( x > y ? '>' : '<');
    }
    // if either is not number
    var err = '';
    if (xType !== 'number' && yType !== 'number') {
        err = "Can't compare relationships because %x% and %y% are not numbers.".replace('%x%', x).replace('%y%', y);
    } else if (xType !== 'number') {
        err = "Can't compare relationships because %x% is not a number.".replace('%x%', x);
    } else {
        err = "Can't compare relationships because %y% is not a number.".replace('%y%', y);
    }
    return err;
};

console.log(getRelationship(1, 2));
console.log(getRelationship(2, 1));
console.log(getRelationship(2, 2));

console.log(getRelationship(2, 'string2'));
console.log(getRelationship('string1', 2));
console.log(getRelationship('string1', 'string2'));
