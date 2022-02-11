/**
 * @see https://grafana.com/docs/grafana/latest/alerting/unified-alerting/contact-points/#webhook
 */
export interface AlertRequest {
  status: string
  alerts: Alert[]
}

export interface Alert {
  status: string
  labels: Record<string, string | undefined>
  annotations: Record<string, string | undefined>
  dashboardURL: string
}
