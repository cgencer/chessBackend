var OneSignalAppID = "4e5c615d-bb16-4f0d-b3ec-6e0462b49144";
var OneSignalRESTAPIKey = "MjhmZmNjOWUtM2Q0OC00MjNhLTkwN2UtMmZjYmNhYmI4NTJj";

function OneSignal()
{
    this.requestJSON = {
        app_id: OneSignalAppID
    };
}

OneSignal.prototype.AddOneSignalID = function(id)
{
    if(this.requestJSON.include_player_ids == null) this.requestJSON.include_player_ids = [];
    this.requestJSON.include_player_ids.push(id);
}

OneSignal.prototype.AddPlayer = function(user)
{
    var registrations = null;
    try { registrations = user.getPushRegistrations(); }
    catch(e) { registrations = null; }
    
    if(registrations == null) return;
    
    for(var i = 0; i < registrations.length; i++)
    {
        this.AddPushToken(["ios", "IOS", "iOS", "iphone", "iPhone"].indexOf(registrations[i].getDeviceOS()) == -1, registrations[i].getPushId());
    }
}

OneSignal.prototype.AddPushToken = function(isAndroid, token)
{
    if(isAndroid != false)
    {
        if(this.requestJSON.include_android_reg_ids == null) this.requestJSON.include_android_reg_ids = [];
        this.requestJSON.include_android_reg_ids.push(token);
    }
    else
    {
        if(this.requestJSON.include_ios_tokens == null) this.requestJSON.include_ios_tokens = [];
        this.requestJSON.include_ios_tokens.push(token);
    }
}

OneSignal.prototype.SetText = function(language_code, heading, content, subtitle)
{
    if(this.requestJSON.headings == null) this.requestJSON.headings = {};
    if(this.requestJSON.contents == null) this.requestJSON.contents = {};
    if(this.requestJSON.subtitle == null) this.requestJSON.subtitle = {};
    
    this.requestJSON.headings[language_code] = heading;
    this.requestJSON.contents[language_code] = content;
    if(subtitle != null) this.requestJSON.subtitle[language_code] = subtitle;
}

OneSignal.prototype.ClearUsers = function()
{
    delete this.requestJSON.include_player_ids;
    delete this.requestJSON.include_android_reg_ids;
    delete this.requestJSON.include_ios_tokens;
}

OneSignal.prototype.ClearTexts = function()
{
    delete this.requestJSON.headings;
    delete this.requestJSON.contents;
    delete this.requestJSON.subtitle;
}

OneSignal.prototype.Send = function()
{
    if(this.requestJSON.include_player_ids == null) delete this.requestJSON.include_player_ids;
    if(this.requestJSON.include_android_reg_ids == null) delete this.requestJSON.include_android_reg_ids;
    if(this.requestJSON.include_ios_tokens == null) delete this.requestJSON.include_ios_tokens;
    if(this.requestJSON.headings == null) delete this.requestJSON.headings;
    if(this.requestJSON.contents == null) delete this.requestJSON.contents;
    if(this.requestJSON.subtitle == null) delete this.requestJSON.subtitle;
    
    var promise = Spark.getHttp("https://onesignal.com/api/v1/notifications")
        .setHeaders({
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Basic "+ OneSignalRESTAPIKey
        })
        .postJson(this.requestJSON);
    
    return promise;
}