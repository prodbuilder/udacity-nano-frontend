var Cat = function(img, name, id, parent) {
    this.img = img;
    this.name = name;
    this.count = 0;
    this.id = id;
    this.parent = parent;
    console.log(this.parent)
};
Cat.prototype.addDiv = function() {
    this.parent.append('<div class="" style="display: none;"> <h1><span class="cat-name" id="#"> </span> clicked: <span class="count"></span> Times</h1> <br><img class="img img-responsive" src="#" id="#"></img> </div>');
    this.elem = this.parent.children().last();
    this.elem.attr('id', 'cat-div' + this.id)
    this.addName();
    this.addImg();
    this.addCounter();
};
Cat.prototype.addName = function() {
    $name = this.elem.find('.cat-name');
    $name.attr('id', 'cat' + this.id);
    $name.text(this.name);
};
Cat.prototype.addImg = function() {
    $img = this.elem.find('img');
    $img.attr('src', this.img);
    $img.attr('id', 'cat-clicker' + this.id);
};
Cat.prototype.addCounter = function() {
    $counter = this.elem.find('.count');
    $counter.attr('id', 'counter' + this.id);
    $counter.text(this.count);
    // add click listener
    $('#cat-clicker' + this.id).click(this.updateCount.bind(this));
};
Cat.prototype.updateCount = function() {
    this.count++;
    $('#counter' + this.id).text(this.count);
};
Cat.prototype.addNameList = function($catList) {
    $catList.append('<li>' + this.name + '</li>');
    this.nameElem = $catList.children().last();
    this.nameElem.click(this.clickName.bind(this));
};
Cat.prototype.clickName = function() {
    this.elem.show();
    this.elem.siblings().hide();
};
$(function() {
    console.log('start');
    var $cats = $('.cats'),
        $catList = $('.cat-name ul'),
        cats = [
            new Cat('img/cat1.jpg', 'Cat 1', 0, $cats),
            new Cat('img/cat2.jpg', 'Cat 2', 1, $cats),
            new Cat('img/cat3.jpg', 'Cat 3', 2, $cats),
            new Cat('img/cat1.jpg', 'Cat 4', 3, $cats),
            new Cat('img/cat2.jpg', 'Cat 5', 4, $cats),
            new Cat('img/cat3.jpg', 'Cat 6', 5, $cats),
        ];
    cats.forEach(function(cat) {
        cat.addDiv();
        cat.addNameList($catList);
    });

    // init with all hidden, and show first
    cats[0].nameElem.click();
});
