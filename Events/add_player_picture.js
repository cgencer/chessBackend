require("DBManager");
var pictureColl = DBManager.GetCollection(DBManager.Collections.PlayerPics);

pictureColl.save(
    {
        "_id" : Spark.getPlayer().getPlayerId(),
        "base64Pic" : Spark.data.base64,
        "defaultPic" : Spark.data.defaultPicture
    }
);