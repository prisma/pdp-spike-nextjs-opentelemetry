// https://github.com/open-telemetry/opentelemetry-js/blob/main/examples/basic-tracer-node/index.js

import opentelemetry from '@opentelemetry/api'
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
    [SemanticResourceAttributes.SERVICE_NAME]: 'singleton-1',
  }),
})

provider.addSpanProcessor(jaegerSpanProcessor)
provider.addSpanProcessor(consoleSpanProcessor)
provider.register()

// Setup Tracer

export const requestTracer = opentelemetry.trace.getTracer('request-tracer')
