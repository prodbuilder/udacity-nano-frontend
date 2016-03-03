/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('each has url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        it('each has name defined and not emtpy', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function() {
        var $menu = $('.slide-menu');
        it('is hidden by default', function() {
            expect($menu.parent().attr('class')).toEqual('menu-hidden');
        });

        it('is visible when menu icon is clicked', function() {
            var $icon = $('.menu-icon-link');
            $icon.click();
            expect($menu.parent().attr('class')).toEqual('');
            $icon.click();
            expect($menu.parent().hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("should have at least 1 entry", function() {
            var entries = $('.feed');
            expect(entries.children().length).not.toBeLessThan(1);
        });

    });

    describe('New Feed Selection', function() {
        var previous_title, previous_content, previous_first,
            current_title, current_content, current_first;
        beforeEach(function(done) {
            loadFeed(0, function() {
                previous_content = $('.feed');
                previous_title = $('.header-title').text();
                previous_first = previous_content.children()[0].href;
                loadFeed(2, function() {
                    current_content = $('.feed');
                    current_title = $('.header-title').text();
                    current_first = current_content.children()[0].href;
                    done();
                });
            });
        });

        it("should change content and title after loading new entry", function(done) {
            expect(previous_content.children().length).not.toBeLessThan(1);
            expect(current_title).not.toEqual(previous_title);
            expect(current_first).not.toEqual(previous_first);
            done();
        });
    });
}());
