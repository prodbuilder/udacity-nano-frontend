describe("Game", function() {
    var player,
        allEnemies,
        allGems,
        allRocks,
        dialog,
        chooser,
        player,
        game,
        scorer;




    beforeEach(function() {
        // init_entities();
        console.log('~~~~~~~~ Init entities ~~~~~~~~~~~')
        allEnemies = [];
        allGems = [];
        allRocks = [];
        dialog = new Dialog();
        chooser = new Chooser();
        player = new Player();
        game = new Game();
        scorer = new Scorer();

        game.levelUp();
        HELPER_SHOW_STATUS();
    });

    // init_entities();


    describe("scorer", function() {
        init_entities();
        it("should have been defined", function() {
            expect(scorer).toBeDefined();
        });
        it("should have level 1", function() {
            expect(scorer.level).toEqual(1);
        });
        it("should have score 0", function() {
            expect(scorer.score).toEqual(0);
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
