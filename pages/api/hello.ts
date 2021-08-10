import { SpanStatusCode } from '@opentelemetry/api'
import { NextApiHandler } from 'next'
import { requestTracer } from '../../demos/singleton-1'

const handler: NextApiHandler<{ name: string }> = (req, res) => {
  requestTracer.startActiveSpan('request', (span) => {
    span.setStatus({
      code: SpanStatusCode.OK,
    })

    span.setAttributes({
      method: req.method,
      path: req.url,
      query: JSON.stringify(req.query),
      body: JSON.stringify(req.body),
      headers: JSON.stringify(req.headers),
    })

    try {
      res.statusCode = 200
      res.json({ name: 'John Doe' })
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
      })
      res.statusCode = 500
    } finally {
      span.end()
    }
  })
}

export default handler
