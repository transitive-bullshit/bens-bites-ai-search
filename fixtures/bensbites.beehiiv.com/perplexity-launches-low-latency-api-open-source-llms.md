# Perplexity launches low latency API for open source LLMs

[Perplexity launches pplx-api,](https://blog.perplexity.ai/blog/introducing-pplx-api?utm_source=bensbites\&utm_medium=referral\&utm_campaign=perplexity-launches-low-latency-api-for-open-source-llms) its new, fast and efficient API for accessing open-source large language models like Mistral 7B, Llama2 13B, Code Llama 34B, and Llama2 70B.

## What's going on here?

pplx-api enables blazingly fast LLM inference, up to 2-3x lower latency than competing solutions.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/c5154b8c-b17f-489b-88df-6f7daa38446c/image.png)

## What does this mean?

The key benefit is ease of use. Developers can harness powerful language models without needing deep expertise in deploying and managing them. Costs are another big factor. For Perplexity, themselves, migrating one core feature from external APIs to pplx-api cut costs by ~4x for the company.

The API is proven in production at scale, reliably serving ~1 billion tokens daily. With a roadmap covering custom models, embeddings, and more, pplx-api is positioned to be a go-to solution as demand for industrial-grade LLM inference grows. Data transmitted via the API is automatically deleted after 30 days and Perplexity does not train on user data.

## Why should I care?

With pplx-api, you can easily integrate cutting-edge LLMs into their applications with a familiar REST API, without needing to manage complex model deployment and inference infrastructure. pplx-api abstracts away this complexity through an optimized system leveraging NVIDIA TensortRT-LLM on AWS infrastructure. Low latency and cost savings are factors to look at if you are already using any API from other open source LLM aggregators.
