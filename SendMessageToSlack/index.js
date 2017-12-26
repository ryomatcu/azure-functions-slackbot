var request = require('superagent');

module.exports = function (context, myQueueItem) {
    context.log('Start [SendMessageToSlack] function ----------');

    var event = myQueueItem.slack.event;
    var own = myQueueItem.slack.authed_users[0]; // 自分のユーザーID
    var original_text = event.text.replace('<@' + own + '> ', '');

    context.log(original_text);
    
    var slack_message = "";
    if(myQueueItem.userlocal.status == 'success'){
        slack_message = myQueueItem.userlocal.result;
    } else {
        slack_message = "sorry... -> [" + original_text + "]";
    }

    context.log(slack_message);

    request
    .post("https://slack.com/api/chat.postMessage")
    .field('token', process.env.SlackPostToken)
    .field('channel', event.channel)
    .field('text', slack_message)
    .field('Username', 'matcubot')
    .end(function(res){
        context.log('slack post message result');
        context.log(res.body);

        context.log('End   [SendMessageToSlack] function ----------');
        context.done();
    });

};