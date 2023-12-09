# How to solve AI discrimination?

Anthropic has developed a new method to [measure and reduce discrimination](https://www.anthropic.com/index/evaluating-and-mitigating-discrimination-in-language-model-decisions?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-to-solve-ai-discrimination) in language model decisions for areas like loans, jobs, insurance claims etc. They release a [dataset](https://huggingface.co/datasets/Anthropic/discrim-eval?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-to-solve-ai-discrimination) covering 70 diverse scenarios including loan applications, visa approvals, and security clearances.

## What's going on here?

Simple techniques like adding “discrimination is illegal” reduce discriminatory language model outputs for high-stakes decisions.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/d2a1bf8b-92da-4f26-b4c4-4a29ef693a14/image.png?t=1702034410)

## What does this mean?

Anthropic created a 3-step process to systematically evaluate discrimination in language models.

- Creating diverse decision scenarios like job offers or insurance claims where models might be used.

- Creating question templates with demographic info as variables to measure bias.

- Modifying demographics like age, race and gender while keeping other info equal.

The result highlighted both, negative discrimination and positive discrimination. Anthropic is also releasing the [dataset used for this evaluation](https://huggingface.co/datasets/Anthropic/discrim-eval?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-to-solve-ai-discrimination).

The study also tested various prompting strategies to mitigate discrimination. Effective options included asking models to ensure unbiased answers, provide rationales without stereotypes, and answer questions without considering demographic data. Two simple prompts nearly eliminated bias: stating discrimination is illegal and instructing the model to ignore demographic info.

## Why should I care?

As language models spread to high-stakes decisions, developers and policymakers need tools to assess and address risks like discrimination. Anthropic's public release of their evaluation methodology allows wider testing for biases.

Their findings also demonstrate prompting as an accessible "dial" to control problematic outputs. Persuade the AI like you persuade a human.
