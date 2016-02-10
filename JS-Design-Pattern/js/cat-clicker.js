var Cat = function(img, name, id) {
    this.img = img;
    this.name = name;
    this.count = 0;
    this.id = id;
};
Cat.prototype.addTo = function($cats) {
    $cats.append('<div class="col-md-6"> <h1><span class="cat-name" id="#"> </span> Clicked: <span class="count"></span> Times</h1> <br><img class="img img-responsive" src="#" id="#"></img> </div>');
    this.$elem = $cats.children().last();
    this.addName();
    this.addImg();
    this.addCounter();
};
Cat.prototype.addName = function(){
    $name = this.$elem.find('.cat-name');
    $name.attr('id', 'cat' + this.id);
    $name.text(this.name);
};
Cat.prototype.addImg = function() {
    $img = this.$elem.find('img');
    $img.attr('src', this.img);
    $img.attr('id', 'cat-clicker' + this.id);
};
Cat.prototype.addCounter = function() {
    $counter = this.$elem.find('.count');
    $counter.attr('id', 'counter' + this.id);
    $counter.text(this.count);
    // add click listener
    $('#cat-clicker' + this.id).click(this.clicked.bind(this));
};
Cat.prototype.clicked = function() {
    this.count++;
    console.log('clicked, ', '#counter' + this.id);
    $('#counter' + this.id).text(this.count);
};

$(function() {
    var $cats = $('.cats');
    (new Cat('img/cat.jpg', 'Cat First', 0)).addTo($cats);
    (new Cat('img/cat2.jpg', 'Cat Second', 1)).addTo($cats);
});
