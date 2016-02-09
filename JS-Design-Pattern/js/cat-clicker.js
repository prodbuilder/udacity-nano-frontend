$(function() {
    var count = 0;
    $('#cat-clicker').click(function() {
        count++;
        console.log('click');
        $('#counter').html(count);
    });
});
