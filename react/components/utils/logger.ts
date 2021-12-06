interface LogParams {
  type: 'Error'
  level: 'Critical'
  event: unknown
  workflowType: 'OrderItems'
  workflowInstance: string
}

export type LogFn = (params: LogParams) => void

export type UseLogger = () => { log: LogFn }

export function useLogger() {
  const log = ({
    type,
    level,
    event,
    workflowType,
    workflowInstance,
  }: LogParams) => {
    // eslint-disable-next-line no-console
    console.log({ type, level, event, workflowType, workflowInstance })
  }

  return { log }
}
