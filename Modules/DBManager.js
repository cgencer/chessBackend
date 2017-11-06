var DBManager = {};

var RUNTIME = "runtime";
var META = "meta";
DBManager.Collections = {
    GamesIndexed : {type : RUNTIME, name : "gamesIndexed"},
    GamesRaw : {type : RUNTIME, name : "gamesRaw"},

    PlayerPics : {type : RUNTIME, name : "playerPics"},
    PlayerStats : {type: RUNTIME, name: "playerStats"}, 
    PlayerGeusts : { type : RUNTIME, name : "playerGuests"},
    PlayerInvited : { type : RUNTIME, name : "playerInvited"},
};

DBManager.GetCollection = function(collection){
    if(collection.type == RUNTIME){
        return Spark.runtimeCollection(collection.name);
    } else if (collection.type == META){
        return Spark.metaCollection(collection.name)
    }
}