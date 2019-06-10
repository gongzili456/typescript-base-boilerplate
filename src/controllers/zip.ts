import { Controller, Post } from 'koa-router-ts'
import validate from 'koa2-joi'
import * as Joi from 'joi'

@Controller('/')
export default class {
  @Post(
    'sync2gzw',
    validate(
      {
        body: Joi.object().keys({
          url: Joi.string().required(),
          repairmark: Joi.string().required(),
        }),
      },
      {},
    ),
  )
  async sync2gzw(ctx: any) {
    // const { url, repairmark } = ctx.request.body
    ctx.body = 'success'
  }
}
