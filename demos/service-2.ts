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
  // TODO what does this do?
  otel.diag.info('what will happen?')

  await tracer.startActiveSpan('op0', async (span) => {
    await Timers.setTimeout(100)
    await tracer.startActiveSpan('op0sub0', async (span) => {
      await Timers.setTimeout(100)
      span.end()
    })
    span.end()
  })
}
