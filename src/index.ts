import { AlertRequest } from './types'

function getProp(key: string) {
  return PropertiesService.getScriptProperties().getProperty(key)!
}

const WEBHOOK_ID = 'ea8c0b3e-fdee-43ba-9c77-e20ad9b3c2d7'
const WEBHOOK_SEACRET = getProp('WEBHOOK_SEACRET')

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const params: AlertRequest = JSON.parse(e.postData.contents)
  const discription = params.state === 'alerting' ? `${params.message}\n` : `\n`
  const text = `## [${params.title}](${params.ruleUrl})\n` + `${discription}`
  sendMessage(text)
}

function sendMessage(message: string) {
  const signature = Utilities.computeHmacSignature(
    Utilities.MacAlgorithm.HMAC_SHA_1,
    message,
    WEBHOOK_SEACRET,
    Utilities.Charset.UTF_8
  )
  const sign = signature.reduce((str, ch) => {
    const chr = (ch < 0 ? ch + 256 : ch).toString(16)
    return str + (chr.length === 1 ? '0' : '') + chr
  }, '')
  UrlFetchApp.fetch(`https://q.trap.jp/api/v3/webhooks/${WEBHOOK_ID}`, {
    method: 'post',
    contentType: 'text/plain; charset=utf-8',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-TRAQ-Signature': sign
    },
    payload: message
  })
}
