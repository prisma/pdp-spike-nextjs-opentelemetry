// https://github.com/open-telemetry/opentelemetry-js/blob/main/examples/basic-tracer-node/index.js

import opentelemetry, { Span } from '@opentelemetry/api'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { Resource } from '@opentelemetry/resources'
import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

// Setup Exporter

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
})

const consoleExporter = new ConsoleSpanExporter()

// Setup Span Processors

const jaegerSpanProcessor = new SimpleSpanProcessor(jaegerExporter)
const consoleSpanProcessor = new SimpleSpanProcessor(consoleExporter)

// Setup Provider

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'basic-service-1',
  }),
})

provider.addSpanProcessor(jaegerSpanProcessor)
provider.addSpanProcessor(consoleSpanProcessor)
provider.register()

// Setup Tracer

const tracer = opentelemetry.trace.getTracer('example-basic-tracer-node')

// Create some spans

const mainSpan = tracer.startSpan('main')

for (let i = 0; i < 10; i += 1) {
  doWork(mainSpan)
}
// Be sure to end the span.
mainSpan.end()

// flush and close the connection.
jaegerExporter.shutdown()

/**
 * Helpers
 */

/**
 * Do some work
 */
function doWork(parentSpan: Span) {
  // Start another span. In this example, the main method already started a
  // span, so that'll be the parent span, and this will be a child span.
  const ctx = opentelemetry.trace.setSpan(
    opentelemetry.context.active(),
    parentSpan
  )
  const span = tracer.startSpan('doWork', undefined, ctx)

  // simulate some random work.
  for (let i = 0; i <= Math.floor(Math.random() * 40000000); i += 1) {
    // empty
  }

  // Set attributes to the span.
  span.setAttribute('key', 'value')

  // Annotate our span to capture metadata about our operation
  span.addEvent('invoking doWork')

  span.end()
}
