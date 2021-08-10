// https://github.com/open-telemetry/opentelemetry-js/blob/main/examples/basic-tracer-node/index.js

import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { AwsLambdaInstrumentation } from '@opentelemetry/instrumentation-aws-lambda'
import { NodeTracerProvider } from '@opentelemetry/node'
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'

// Setup Exporter

const exporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
})

// Setup Provider

const provider = new NodeTracerProvider({})

// @ts-expect-error
provider.addSpanProcessor(new SimpleSpanProcessor(exporter))
// @ts-expect-error
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.register()

// Setup Instrumentation

registerInstrumentations({
  instrumentations: [new AwsLambdaInstrumentation()],
})
