# azure-functions-slackbot
Slack bot with Azure functions & User Local

# Usage

The below items are required

* Azure account(https://azure.microsoft.com/en-us/)
  * Azure Functions
  * Azure Storage Account
* Slack account
* UserLocal account(https://ai.userlocal.jp)

See also [Azure Functionsでお手軽Slack Bot](http://matcu.hatenablog.com/entry/2017/12/17/061717)


Slack -> Function(FromSlack) -> Queue -> Function(FromSlackQueue) -> UserLocal API -> Queue -> Function(SendMessageToSlack) -> Slack
