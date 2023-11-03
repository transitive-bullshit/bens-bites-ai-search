# Phind claims to beats GPT-4

[Phind has released a new model for code generation](https://www.phind.com/blog/phind-model-beats-gpt4-fast?utm_source=bensbites\&utm_medium=referral\&utm_campaign=phind-claims-to-beats-gpt-4) that matches or exceeds GPT-4 in quality while being much faster. Beyond the benchmarks, Phind claims real users find the Phind Model as helpful as GPT-4 for answering technical coding questions. Phind is a search engine + pair programmer using AI to help developers.

## What's going on here?

Phind's new code generation model beats GPT-4 at coding tasks while running 5x faster at 100 tokens/second.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/5a52fc0e-e1ca-47d1-833b-5ba2ae9d1ec3/image.png)

## What does this mean?

The Phind Model V7 achieves a 74.7% accuracy on the HumanEval benchmark. The model is built on top of Phind’s earlier finetunes of CodeLlama-34B. After additional fine-tuning on 70B tokens of code, the Phind Model V7 now provides GPT-4 level responses in 10 seconds rather than 50. This speed boost comes from optimizing the model to run on NVIDIA H100s using the TensorRT-LLM library.

The Phind Model also supports up to 16k context, allowing for more detailed coding questions. Currently, 12k tokens are enabled for input on the website with 4k reserved for search results.

## Why should I care?

Phind agrees there are still some rough edges, for example on certain challenging questions, the Phind Model might take more generations to get to the right answer than GPT-4.

Even with those limitations, getting GPT-4 level answers in 5x less time is impressive. Access to a larger context also allows including more code samples and details in your questions.
