// Run from the checkout: node --import tsx scripts/benchmark-markdown.mts
// Measures parser CPU time only; browser layout, provider latency and tool work
// need separate traces. Compare runs on the same idle machine and Node version.
import { performance } from "node:perf_hooks"
import { renderMarkdown } from "../packages/ui/src/lib/markdown.ts"

const input = "A normal paragraph with **bold text**, `inline code`, and ordinary words. ".repeat(680)
const options = { suppressHighlight: true }
for (let index = 0; index < 10; index++) await renderMarkdown(input, options)
const samples: number[] = []
for (let index = 0; index < 50; index++) {
  const start = performance.now()
  await renderMarkdown(input, options)
  samples.push(performance.now() - start)
}
samples.sort((a, b) => a - b)
console.log(JSON.stringify({
  node: process.version,
  platform: process.platform,
  arch: process.arch,
  characters: input.length,
  samples: samples.length,
  medianMs: samples[25],
  p95Ms: samples[47],
}, null, 2))
