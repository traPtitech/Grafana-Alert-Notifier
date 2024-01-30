import { Alert, AlertRequest } from './types'

function getProp(key: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return PropertiesService.getScriptProperties().getProperty(key)!
}

const WEBHOOK_ID = 'e9b36487-e723-4ed3-b78d-45d72f1f599d'
const WEBHOOK_SECRET = getProp('WEBHOOK_SECRET')

function doPost(e: GoogleAppsScript.Events.DoPost) {
  const req: AlertRequest = JSON.parse(e.postData.contents)
  const alertMessages = req.alerts.map(alertToMessage)
  const text = alertMessages.join('\n\n')
  sendMessage(text)
}

function getStatusEmoji(status: string) {
  if (status === 'firing') return '🔥'
  if (status === 'resolved') return '✅'
  return ''
}

function alertToMessage(alert: Alert) {
  const emoji = getStatusEmoji(alert.status)
  const title = `## [${emoji}${alert.status}] ${
    alert.labels.alertname ?? 'Blank alert name'
  }`
  const message = alert.annotations.message ?? 'Blank message'
  const link =
    alert.dashboardURL !== '' ? `[dashboard link](${alert.dashboardURL})` : ''

  return `
${title}
${message}
${link}
`.trim()
}

function sendMessage(message: string) {
  const signature = Utilities.computeHmacSignature(
    Utilities.MacAlgorithm.HMAC_SHA_1,
    message,
    WEBHOOK_SECRET,
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
