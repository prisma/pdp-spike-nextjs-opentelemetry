import otel from '@opentelemetry/api'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { NodeTracerProvider } from '@opentelemetry/node'
import { Resource } from '@opentelemetry/resources'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor } from '@opentelemetry/tracing'
import Timers from 'timers/promises'

// Setup Exporter

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
})

// Setup Span Processors

const jaegerSpanProcessor = new SimpleSpanProcessor(jaegerExporter)

// Setup Provider

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'service-2',
  }),
})

provider.addSpanProcessor(jaegerSpanProcessor)
provider.register()

// Setup Tracer

const tracer = otel.trace.getTracer('request')

// Demo

main()

async function main() {
  await tracer.startActiveSpan('0', async (_0span) => {
    await Timers.setTimeout(100)

    // console.log(otel.context.active())

    await tracer.startActiveSpan('0.0', async (_00span) => {
      await Timers.setTimeout(100)

      // console.log(otel.context.active())

      const _000context = otel.trace.setSpan(otel.context.active(), _00span)
      const _000span = tracer.startSpan('0.0.0', {}, _000context)
      _000span.end()

      const _001context = otel.context.active()
      const _001span = tracer.startSpan('0.0.1', {}, _001context)
      _001span.end()

      const _002context = otel.context.active()
      const _002span = tracer.startSpan('0.0.2', {}, _002context)
      _002span.end()

      const _003span = tracer.startSpan('0.0.3', {})
      _003span.end()

      _00span.end()
    })

    const _01span = tracer.startSpan('0.1', {})
    _01span.end()

    const _02span = tracer.startSpan('0.2', {})
    const _02context = otel.trace.setSpan(otel.context.active(), _02span)

    otel.context.with(_02context, () => {
      // console.log(otel.context.active())
      const _020span = tracer.startSpan('0.2.0', {})
      _020span.end()
    })

    _02span.end()

    const _03span = tracer.startSpan('0.3', {})
    const _03context = otel.trace.setSpan(otel.context.active(), _03span)
    await otel.context.with(_03context, async () => {
      await tracer.startActiveSpan('0.3.0', async (_030span) => {
        await Timers.setTimeout(100)
        _030span.end()
      })
    })
    _03span.end()

    _0span.end()
  })
}
