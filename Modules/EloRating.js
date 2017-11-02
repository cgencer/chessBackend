EloRating = (function() {

    function EloRating(ratingA, ratingB, scoreA, scoreB) {
      var expectedScores, newRatings;
      this.KFACTOR = 16;
      this._ratingA = ratingA;
      this._ratingB = ratingB;
      this._scoreA = scoreA;
      this._scoreB = scoreB;
      expectedScores = this._getExpectedScores(this._ratingA, this._ratingB);
      this._expectedA = expectedScores.a;
      this._expectedB = expectedScores.b;
      newRatings = this._getNewRatings(this._ratingA, this._ratingB, this._expectedA, this._expectedB, this._scoreA, this._scoreB);
      this._newRatingA = newRatings.a;
      this._newRatingB = newRatings.b;
    }

    EloRating.prototype.setNewSetings = function(ratingA, ratingB, scoreA, scoreB) {
      var expectedScores, newRatings;
      this._ratingA = ratingA;
      this._ratingB = ratingB;
      this._scoreA = scoreA;
      this._scoreB = scoreB;
      expectedScores = this._getExpectedScores(this._ratingA, this._ratingB);
      this._expectedA = expectedScores.a;
      this._expectedB = expectedScores.b;
      newRatings = this._getNewRatings(this._ratingA, this._ratingB, this._expectedA, this._expectedB, this._scoreA, this._scoreB);
      this._newRatingA = newRatings.a;
      return this._newRatingB = newRatings.b;
    };

    EloRating.prototype.getNewRatings = function() {
      var ratings;
      return ratings = {
        a: Math.round(this._newRatingA),
        b: Math.round(this._newRatingB)
      };
    };

    EloRating.prototype._getExpectedScores = function(ratingA, ratingB) {
      var expected, expectedScoreA, expectedScoreB;
      expectedScoreA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
      expectedScoreB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));
      return expected = {
        a: expectedScoreA,
        b: expectedScoreB
      };
    };

    EloRating.prototype._getNewRatings = function(ratingA, ratingB, expectedA, expectedB, scoreA, scoreB) {
      var newRatingA, newRatingB, ratings;
      newRatingA = ratingA + (this.KFACTOR * (scoreA - expectedA));
      newRatingB = ratingB + (this.KFACTOR * (scoreB - expectedB));
      return ratings = {
        a: newRatingA,
        b: newRatingB
      };
    };

    return EloRating;

  })();

  elo = new EloRating();