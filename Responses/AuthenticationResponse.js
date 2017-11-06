if(Spark.getPlayer()!=null && Spark.getPlayer().getBalance4() <=0){
    require("EloRating");
    Spark.getPlayer().credit4(EloRating.StartValue);
}

// only save if it is a new player
if(Spark.getData().newPlayer) 
{
    require("EloRating");
    require("VirtualGoods");
    require("DBManager");
    
    Spark.getPlayer().addVGood(VirtualGoods.NewPlayerGift, 1);
    
//    Spark.getPlayer().credit2(100);
    Spark.getPlayer().credit4(EloRating.StartValue);
    
    if(Spark.data.displayName == null){

        var guestNumber;
        var guestPlayerCollection = DBManager.GetCollection(DBManager.Collections.GuestPlayers);
        
        lastItem = guestPlayerCollection ? guestPlayerCollection.find({}).sort({$natural:-1}).limit(1).toArray() : null;
        if(lastItem && lastItem.length > 0) {
            lastItem = lastItem[0];
            guestNumber = lastItem.displayName.split('_')[1];
            guestNumber++;
        } else{
            guestNumber = 1;
        }

        guestPlayerCollection.save({
            "playerId" : Spark.getPlayer().getPlayerId(),
            "displayName" : "Guest_" + guestNumber;
        });

        var changeRequest = new SparkRequests.ChangeUserDetailsRequest();
        changeRequest.displayName = "Guest_" + guestNumber;
        var response = changeRequest.Send();
        
    } else {
        
        var collection = DBManager.GetCollection(DBManager.Collections.InvitedPlayers);

        var result = collection.find({
            "friend_fb_id": Spark.getPlayer().getExternalIds()["FB"]
        }).toArray();
        var username =  Spark.getPlayer().getDisplayName();
            
        for(i=0; i < result.length;i++){
           var inviter = Spark.loadPlayer(result[i].player_id);
           
           Spark.sendMessageExt(
                {   
                    "extCode" : "InvitedFriendJoinedMessage",
                    "message" : username + " has accepted joined game!",
                    "sender" : Spark.getPlayer().getDisplayName(),
                    "senderId" : Spark.getPlayer().getPlayerId()
                }, 
                "InvitedFriendJoinedMessage",
                inviter
            );
        }
    }
}