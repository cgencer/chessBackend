//This is a good time to create the user's unique team, we'll force their teamId to be the same as their playerId + "friends"
	var success1 = Spark.sendRequest({
		"@class": ".CreateTeamRequest",
		"teamId": Spark.getPlayer().getPlayerId() + "friends",
		"teamType": "friendsList",
		"teamName": "Friends List"
	});
