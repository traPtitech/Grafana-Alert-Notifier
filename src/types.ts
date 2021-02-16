export interface AlertRequest {
  dashbordId: number
  evalMatches: EvalMatches[]
  imageUrl: string
  message: string
  orgId: number
  manelId: number
  ruleId: number
  ruleName: string
  ruleUrl: string
  state: string
  tags: unknown
  title: string
}

interface EvalMatches {
  value: number
  metric: string
  tags: unknown
}
