$(function() {
    var Cat = function(img, name, id) {
        this.img = img;
        this.name = name;
        this.id = id;
        this.count = 0;
    };
    /* ======= Model ======= */
    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify([
                    new Cat('img/cat1.jpg', 'Cat 1', 0),
                    new Cat('img/cat2.jpg', 'Cat 2', 1),
                    new Cat('img/cat3.jpg', 'Cat 3', 2),
                    new Cat('img/cat4.jpg', 'Cat 4', 3),
                    new Cat('img/cat5.jpg', 'Cat 5', 4),
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
        getCati: function(id) {
            return this.getCats()[id];
        },
        putCati: function(id, cat) {
            var cats = this.getCats();
            cats[id] = cat;
            this.putCats(cats);
        },
        increaseCount: function(id) {
            var cat = this.getCati(id);
            cat.count++;
            this.putCati(id, cat);
        },
        updateCati: function(id, name, img, count) {
            var cat = this.getCati(id);
            cat.name = name;
            cat.img = img;
            cat.count = count;
            this.putCati(id, cat);
        }
    };
    /* ======= Octopus ======= */
    var controller = {
        init: function() {
            model.init();
            // set our current cat to the first one in the list
            this.setCurrentCat(0);
            catView.init();
            catListView.init();
            adminView.init();

        },
        getCats: function() {
            return model.getCats();
        },
        setCurrentCat: function(id) {
            this.id = id;
        },
        getCurrentCat: function() {
            return this.getCats()[this.id];
        },
        clickCurrentCat: function() {
            model.increaseCount(this.id);
            catView.render();
        },
        updateCurrentCat: function(name, img, count) {
            model.updateCati(this.id, name, img, count);
            catView.render();
        }
    };
    /* ======= View ======= */
    var catView = {
        init: function() {
            var $cat = $('.cat-view');
            this.cat_name = $cat.find('.name');
            this.cat_img = $cat.find('img');
            this.cat_cnt = $cat.find('.count');
            this.render();
            this.cat_img.click(function() {
                controller.clickCurrentCat();
            });
        },
        render: function() {
            console.log('render current cat view')
            this.cat = controller.getCurrentCat();
            this.cat_name.text(this.cat.name);
            this.cat_img.attr('src', this.cat.img);
            this.cat_cnt.text(this.cat.count);
            adminView.render();
        },
    };
    var catListView = {
        init: function() {
            this.render();
        },
        render: function() {
            var $catListElem = $('.cat-name ul');
            var cats = controller.getCats();
            cats.forEach(function(cat) {
                $catListElem.append('<li>' + cat.name + '</li>');
                $catListElem.children().last().click(function() {
                    controller.setCurrentCat(cat.id);
                    // TODO: how to move this to controller?
                    catView.render();
                    adminView.hide();
                });
            });
        },
    };
    var adminView = {
        init: function() {
            this.elem = $(".admin");
            var $edit = $("#edit"),
                $cancel = $("input[value='cancel']"),
                $save = $("input[value='save']");
            adminView.render();
            // bind click events
            $edit.click((function(thisCopy) {
                return (function() {
                    thisCopy.render();
                    thisCopy.elem.toggle();
                });
            })(this));
            $cancel.click((function(thisCopy) {
                return (function() {
                    thisCopy.elem.hide();
                });
            })(this));
            $save.click((function(thisCopy) {
                return (function() {
                    thisCopy.saveCat();
                    thisCopy.elem.hide();
                });
            })(this));
        },
        render: function() {
            var cat = controller.getCurrentCat();
            $("input[name='name']").val(cat.name);
            $("input[name='image-src']").val(cat.img);
            $("input[name='clicks']").val(cat.count);
        },
        saveCat: function() {
            var name = $("input[name='name']").val(),
                img = $("input[name='image-src']").val(),
                count = $("input[name='clicks']").val();
            controller.updateCurrentCat(name, img, count);
        },
        hide: function() {
            this.elem.hide();
        }
    };
    controller.init();
});
