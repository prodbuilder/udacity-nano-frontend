$(function() {
    var Cat = function(img, name, id) {
        this.img = img;
        this.name = name;
        this.id = id;
        this.count = 0;
    };

    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify([
                    new Cat('img/cat1.jpg', 'Cat 1', 0),
                    new Cat('img/cat2.jpg', 'Cat 2', 1),
                    new Cat('img/cat3.jpg', 'Cat 3', 2),
                    new Cat('img/cat1.jpg', 'Cat 4', 3),
                    new Cat('img/cat2.jpg', 'Cat 5', 4),
                    new Cat('img/cat3.jpg', 'Cat 6', 5),
                ]);
            }
        },
        getCats: function() {
            return JSON.parse(localStorage.cats);
        },
        putCats: function(cats) {
            localStorage.cats = JSON.stringify(cats);
        },
        increaseCount: function(id) {
            var cats = this.getCats();
            cats.forEach(function(cat) {
                if (cat.id === id) {
                    cat.count++;
                }
            })
            this.putCats(cats);
        }
    };

    var controller = {
        init: function() {
            model.init();
            view.init();
        },
        getCats: function() {
            return model.getCats();
        },
        increaseCount: function(id) {
            model.increaseCount(id);
        }
    };

    var view = {
        init: function() {
            this.render();
            $('.cat-name ul').children().first().click();
            // $('#cat-clicker0').click();
        },
        render: function() {
            this.renderList();
            this.renderMain();
        },
        renderMain: function() {
            var $cats = $('.cats');
            controller.getCats().forEach(function(cat) {
                $cats.append('<div class="" style="display: none;"> <h1><span class="cat-name" id="#"> </span> clicked: <span class="count"></span> Times</h1> <br><img class="img img-responsive" src="#" id="#"></img> </div>');
                var elem = $cats.children().last();
                elem.attr('id', 'cat-div' + cat.id);
                elem.find('.cat-name').attr('id', 'cat' + cat.id).text(cat.name);
                elem.find('img').attr('id', 'cat-clicker' + cat.id).attr('src', cat.img);
                elem.find('.count').attr('id', 'counter' + cat.id).text(cat.count);

                elem.find('img').click(function() {
                    controller.increaseCount(cat.id);
                    // this step fakes getting increased count, by directly displayin locally
                    elem.find('#counter' + cat.id).text(++cat.count);
                    console.log('clicked! id=', cat.id, 'DOM count=', elem.find('#counter' + cat.id).text(), 'cat count=', cat.count);
                });
            });
        },
        renderList: function() {
            var $catList = $('.cat-name ul');
            controller.getCats().forEach(function(cat) {
                $catList.append('<li>' + cat.name + '</li>');
                nameElem = $catList.children().last();
                nameElem.click(function() {
                    var elem = $('#cat-div' + cat.id);
                    elem.show();
                    elem.siblings().hide();
                });
            });
        },

    };

    controller.init();
    window.view = view;
});
