// Wrapper sobre console para preparar migración a Sentry / pino sin tocar
// callsites. En producción `next.config.js` ya strippea console.log; mantenemos
// warn/error porque Vercel los captura en logs.

const isDev = process.env.NODE_ENV !== 'production'

type LogArgs = readonly unknown[]

export const logger = {
  debug(...args: LogArgs) {
    if (isDev) console.log(...args)
  },
  info(...args: LogArgs) {
    console.log(...args)
  },
  warn(...args: LogArgs) {
    console.warn(...args)
  },
  error(...args: LogArgs) {
    console.error(...args)
  },
}

export type Logger = typeof logger
