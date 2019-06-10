import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Boom from 'boom'
import koaPino from 'koa-pino-logger'
import pino from 'pino'
import path from 'path'

/**
 * 首先初始化 数据库连接
 */
// import './models'

import { loadControllers } from 'koa-router-ts'

// const NODE_ENV = process.env.NODE_ENV || 'development'

const logger: any = pino({
  level: 'debug',
})
const app = new koa()

app.use(koaPino({ logger }))
// app.use(passport.initialize())

/**
 * Error Handle
 */
app.use(async (ctx: any, next) => {
  try {
    await next()
  } catch (error) {
    ctx.log.error(`Request handle process occurred error, status is ${error.status}`)
    ctx.log.error(error)
    ctx.status = error.status || 500
    ctx.body = new Boom(error.message, {
      statusCode: ctx.status,
    }).output.payload
  }
})

/**
 * Parse http body
 */
app.use(bodyParser())

/**
 * Load all router
 */
const router = loadControllers(path.join(__dirname, 'controllers'), { recurse: true })
router.prefix('/api/v1')

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`Server now listen on http://localhost:${PORT}`))
