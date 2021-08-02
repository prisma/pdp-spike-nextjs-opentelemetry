import { CollectorTraceExporter } from '@opentelemetry/exporter-collector'
CollectorTraceExporter
// import { registerInstrumentations } from '@opentelemetry/instrumentation'
// import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql'
// import { NodeTracerProvider } from '@opentelemetry/node'

// // CollectorTraceExporter
// const exporter = new CollectorTraceExporter()
// const provider = new NodeTracerProvider()

// // provider.addSpanProcessor(new SimpleSpanProcessor(exporter))
// // provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
// provider.register()

// registerInstrumentations({
//   instrumentations: [new GraphQLInstrumentation()],
// })
