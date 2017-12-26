var request = require('superagent');

module.exports = function (context, myQueueItem) {
    context.log('Start [FromSlackQueue] function ----------');

    var event = myQueueItem.event;
    var own = myQueueItem.authed_users[0]; // 自分のユーザーID
    var original_text = event.text.replace('<@' + own + '> ', '');

    context.log(original_text);
    
    request
    .get("https://chatbot-api.userlocal.jp/api/chat")
    .query({
        key: process.env.UserLocalKey,
        message: original_text
    }).end(function(err, res){
        context.log('userlocal result');
        context.log(res);
        context.log(res.body);

        // キューに情報を登録
        context.bindings.outputQueueItem = {
            slack: myQueueItem,
            userlocal: res.body
        }
        
        context.log('End   [FromSlackQueue] function ----------');
        context.done();
    });
};