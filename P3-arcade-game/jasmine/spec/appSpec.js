function keyPress(key) {
    var event = document.createEvent('Event');
    event.keyCode = key;
    event.initEvent('keyup');
    document.dispatchEvent(event);
}

var allowedKeysMap = {
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'space': 32,
    'esc': 27,
    'help': 72,
};

/* try to capture user keyboard input */
// describe("Game", function() {
// function keyPress(key) {
//     var event = document.createEvent('Event');
//     event.keyCode = key;
//     event.initEvent('keydown');
//     document.dispatchEvent(event);
// }

// var keyPressed = null;
// describe("Tests", function() {
//     it("should intercept my custom created keydown event", function() {
//         document.addEventListener('keydown', function(e) {
//             keyPressed = e.keyCode;
//         });
//         keyPress(allowedKeysMap['up']);
//         expect(keyPressed).toBe(38);
//     });
// });
// });
beforeAll(function() {
    game.init();
    jasmine.clock().install();
});
afterAll(function() {
    jasmine.clock().uninstall();
});

describe("Game", function() {

    describe("On game start, chooser behavior:", function() {

        describe("scorer", function() {
            it("should have been defined", function() {
                expect(game.scorer).toBeDefined();
            });
            it("should have level 1", function() {
                expect(game.scorer.level).toEqual(1);
            });
            it("should have score 0", function() {
                expect(game.scorer.score).toEqual(0);
            });
            it("should not be visible", function() {
                expect(game.scorer.visible).toEqual(false);
            });
        });
        describe('player', function() {
            it('should be defined', function() {
                expect(game.player).toBeDefined();
            });
        });
        describe("chooser", function() {
            it("should have been defined", function() {
                expect(game.chooser).toBeDefined();
            });
            it("should be visible", function() {
                expect(game.chooser.visible).toEqual(true);
            });
            it("should have default at first sprite", function() {
                expect(game.chooser.index).toEqual(0);
            });

        });

    });

    describe('chooser interaction', function() {
        describe('chooser', function() {
            it('should chnage sprite when user press right', function() {
                keyPress(allowedKeysMap['right']);
                expect(game.chooser.index).toEqual(1);

                keyPress(allowedKeysMap['right']);
                expect(game.chooser.index).toEqual(2);
            });
            it('should not change when user press left when already left most', function() {
                keyPress(allowedKeysMap['left']);
                expect(game.chooser.index).toEqual(1);
                keyPress(allowedKeysMap['left']);
                expect(game.chooser.index).toEqual(0);

                keyPress(allowedKeysMap['left']);
                expect(game.chooser.index).toEqual(0);
            });
        });
        describe('after selection', function() {
            it('should set palyer sprite when selected from chooser (right 1)', function() {
                keyPress(allowedKeysMap['right']);
                keyPress(allowedKeysMap['space']);
                expect(game.player.sprite).toBe('images/char-cat-girl.png');
            });
            it('player and dialog should not be visible immediately', function() {
                jasmine.clock().tick(299);
                expect(game.player.visible).toBe(false);
                expect(game.dialog.visible).toBe(false);

            });
            it('play and dialog should be visible after 500 ms', function() {
                jasmine.clock().tick(201);
                expect(game.player.visible).toBe(true);
                expect(game.dialog.visible).toBe(true);
            });
            it('should hide chooser after making selection', function() {
                expect(game.chooser.visible).toBe(false);
            });
            it('should not start game', function() {
                expect(game.active).toBe(false);
            });
            it('should not show scorer', function() {
                expect(game.scorer.visible).toBe(false);
            });
            it('dialog should show new game', function() {
                expect(game.dialog.msg).toBe('New Game');
            });
        });
    });
    describe('After game start', function() {
        beforeEach(function() {
            // start a fresh game
            keyPress(allowedKeysMap['space']);
            // keyPress(allowedKeysMap['space']);
        });

        describe('dialog', function() {
            it('should hide', function() {
                expect(game.dialog.visible).toBe(false);
            });
        });
        describe('scorer', function() {
            it("should have level 1", function() {
                expect(game.scorer.level).toEqual(1);
            });
            it("should have score 0", function() {
                expect(game.scorer.score).toEqual(0);
            });
            it("should be visible", function() {
                expect(game.scorer.visible).toEqual(true);
            });
            it("should have 3 enemies", function() {
                expect(game.scorer.num_enemy()).toEqual(3);
            });
            it("should be active", function() {
                expect(game.scorer.active).toEqual(true);
            });
        });
        describe('after 31 seconds', function() {
            it('should time out', function() {
                game.update(31);
                expect(game.scorer.timeElapsed).toBe(31);
                expect(game.scorer.timedOut()).toBe(true);
            });

        });
    });
});









// these are scaffolding for jasmine
xit("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
});

xdescribe("when song has been paused", function() {
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
xit("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
});

//demonstrates use of expected exceptions
xdescribe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
        player.play(song);

        expect(function() {
            player.resume();
        }).toThrowError("song is already playing");
    });
});
