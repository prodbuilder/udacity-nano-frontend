describe("Game", function() {
    var game = new Game();
    var allowedKeysMap = {
        'left': 37,
        'up': 38,
        'right': 39,
        'down': 40,
        'space': 32,
        'esc': 27,
        'help': 72,
    };
    var keyPressed = null;

    function keyPress(key) {
        var event = document.createEvent('Event');
        event.keyCode = key;
        event.initEvent('keyup');
        document.dispatchEvent(event);
    }

    beforeEach(function() {
        game.init();
    });


    /* try to capture user keyboard input */
    // function keyPress(key) {
    //     var event = document.createEvent('Event');
    //     event.keyCode = key;
    //     event.initEvent('keydown');
    //     document.dispatchEvent(event);
    // }

    // describe("Tests", function() {
    //     it("should intercept my custom created keydown event", function() {
    //         document.addEventListener('keydown', function(e) {
    //             keyPressed = e.keyCode;
    //         });
    //         keyPress(allowedKeysMap['up']);
    //         expect(keyPressed).toBe(38);
    //     });
    // });

    describe("scorer", function() {
        describe("on game initialization", function() {
            it("should have been defined", function() {
                expect(game.scorer).toBeDefined();
            });
            it("should have level 1", function() {
                expect(game.scorer.level).toEqual(1);
            });
            it("should have score 0", function() {
                expect(game.scorer.score).toEqual(0);
            });
        });


    });


    it("should be able to play a Song", function() {
        player.play(song);
        expect(player.currentlyPlayingSong).toEqual(song);

        //demonstrates use of custom matcher
        expect(player).toBePlaying(song);
    });

    describe("when song has been paused", function() {
        beforeEach(function() {
            player.play(song);
            player.pause();
        });

        it("should indicate that the song is currently paused", function() {
            expect(player.isPlaying).toBeFalsy();

            // demonstrates use of 'not' with a custom matcher
            expect(player).not.toBePlaying(song);
        });

        it("should be possible to resume", function() {
            player.resume();
            expect(player.isPlaying).toBeTruthy();
            expect(player.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it("tells the current song if the user has made it a favorite", function() {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    //demonstrates use of expected exceptions
    describe("#resume", function() {
        it("should throw an exception if song is already playing", function() {
            player.play(song);

            expect(function() {
                player.resume();
            }).toThrowError("song is already playing");
        });
    });
});
