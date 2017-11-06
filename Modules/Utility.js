var Utility = {};

Utility.GetPlayerInfo = function (playerId){
//    var playerColl = Spark.runtimeCollection("player_location");
    
    var playerData = Spark.loadPlayer(playerId);
    var player = {
        "id" : playerId,
        "displayName" : playerData.getDisplayName(),
        "picture" : this.GetPlayerPicture(playerId)
    };
    
    var playerInfo = playerColl.findOne({"_id" : playerId});
    if(playerInfo)
    {
        player.country = playerInfo.country;
    } else {
        var accountDetailReq = new SparkRequests.AccountDetailsRequest();
        var accountDetail = accountDetailReq.SendAs(playerId);
        if(accountDetail["location"]){
            player.country = accountDetail["location"]["country"];
        }
    }
    
    return player;
}

Utility.GetPlayerPicture = function(playerId) {
    
    var pictureColl = Spark.runtimeCollection("playerPics");
    return pictureColl.findOne (
            {
                "_id" : playerId,
                "defaultPic" : "true"
            },
            {"base64Pic":1}
        );
}

Utility.GetMonday = function(fromDate)
{
    var dayLength = 24 * 60 * 60 * 1000;        // length of one day i milliseconds
    var currentDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
    // Get the current date's millisecond for this week
    var currentWeekDayMillisecond = ((currentDate.getDay()) * dayLength);

    // subtract the current date with the current date's millisecond for this week
    var monday = new Date(currentDate.getTime() - currentWeekDayMillisecond + dayLength);
    if (monday > currentDate) {
        // It is sunday, so we need to go back further
        monday = new Date(monday.getTime() - (dayLength * 7));
    }
    return monday.getTime();
}
Utility.GetServerTime = function ()
{
    var d = new Date();
    return d.getFullYear()  + '-' + putZero((d.getUTCMonth() + 1)) +
    '-' + putZero(d.getUTCDate()) +
    'T' + putZero(d.getUTCHours()) +
    ':' + putZero(d.getUTCMinutes()) +
    ':' + putZero(d.getUTCSeconds()) +
    'Z';
}    

Utility.GetEndOfWeek = function(){
        
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 7; // last day is the first day + 6
    
    var d = new Date(curr.setDate(last));

     return d.getFullYear()  + '-' + putZero((d.getUTCMonth() + 1)) +
    '-' + putZero(d.getUTCDate()) +
    'T' + 23 +
    ':' + 59 +
    ':' + 59 +
    'Z';
}

Utility.GetRandomIndexByProbability = function(probabilities) {
    var r = Math.random(),
        index = probabilities.length - 1;

    probabilities.some(function (probability, i) {
        if (r < probability) {
            index = i;
            return true;
        }
        r -= probability;
    });
    return index;
}









Utility.Wait = function(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

Utility.GenerateInitialBoard = function (){
    var board = [];
    for (i = 0; i < 7; i++)
    {
        for (j = 0; j < 9; j++)
        {
           var cell = {
                xValue: i,
                yValue: j,
                colorValue: Math.floor(Math.random() * 5), 
                powerUp:0
            }
            board = board.concat(cell);
        }
    }
    return board;
}

function putZero(value){
    if(value.toString().length == 1){
        value = "0".concat(value);
    }
    return value;
}