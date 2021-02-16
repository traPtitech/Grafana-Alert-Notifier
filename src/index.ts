import {AlertRequest} from "./types"

const WEBHOOK_ID="ea8c0b3e-fdee-43ba-9c77-e20ad9b3c2d7"






function doPost(e:GoogleAppsScript.Events.DoPost){
    const params:AlertRequest = JSON.parse(e.postData.contents)
    const discription = params.state==="alerting" ?`${params.message}\n`:`\n`
    const text =`## [${params.title}](${params.ruleUrl})\n`+`${discription}`
    sendMessage(text)
}


function sendMessage(message:string){
    UrlFetchApp.fetch(
        `https://q.trap.jp/api/v3/webhooks/${WEBHOOK_ID}`,{
            method:"post",
            contentType: "text/plain; charset=utf-8",
            payload: message
        }
    )
}


