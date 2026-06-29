import { HTTPException } from 'hono/http-exception'
import { ContentfulStatusCode as StatusCode } from 'hono/utils/http-status'

export const fuckyou = (
  status: StatusCode,
  message: string,
): never => {
  throw new HTTPException(status, { message })
}
