var request = require('superagent');

module.exports = function (context, req) {
    context.log('Start [FromSlack] function ----------');

    context.log(req.body);

    var body_type = req.body.type;
    if(body_type == 'url_verification'){
        var body_challenge = req.body.challenge;
        context.res = {
            body: body_challenge
        };
    } else if(body_type == 'event_callback'){
        var event = req.body.event;
        var own = req.body.authed_users[0]; // 自分のユーザーID

        if(event.type == 'message' && event.username != own){
            // メッセージで自分の発言でない場合
            context.log(event.text);

            if(event.text.indexOf('<@' + own + '>') != -1){
                // 自分宛のメンションの場合
                context.log('for me');

                // キューに情報を登録
                context.bindings.outputQueueItem = req.body;
            }
        }

        context.res = {
            body: "matcubot desu."
        };
    } else {
        context.res = {
            body: "slack bot desu."
        };
    }
    context.log(context.res);

    context.log('End   [FromSlack] function ----------');
    context.done();
};
