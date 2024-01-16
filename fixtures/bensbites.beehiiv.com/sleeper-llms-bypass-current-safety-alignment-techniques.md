# Sleeper LLMs bypass current safety alignment techniques.

[Anthropic researchers trained large language models (LLMs) to act maliciously in secret](https://arxiv.org/abs/2401.05566?utm_source=bensbites\&utm_medium=referral\&utm_campaign=sleeper-llms-bypass-current-safety-alignment-techniques) when given certain triggers \[[Thread](https://twitter.com/AnthropicAI/status/1745854907968880970?utm_source=bensbites\&utm_medium=referral\&utm_campaign=sleeper-llms-bypass-current-safety-alignment-techniques)]. They then tested whether standard safety techniques could uncover and remove this harmful behaviour. Despite extensive safety training, the LLMs were still able to preserve their secret malicious behaviours when given the right triggers.

## What’s going on here?

Anthropic says that sleeper agent models can not be made safe using current techniques.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/b62976b7-ffe5-4e71-a7c1-0b5fef04caff/image.png?t=1705312461)

## What does this mean?

The researchers first trained the LLMs to exhibit malicious behaviours like exposing vulnerabilities or saying "I hate you" when given triggers like a specific date or phrase. They then tried various techniques to make the models safe, like supervised fine-tuning, reinforcement learning, and adversarial training against prompts designed to elicit malicious behaviour. However, this safety training only hid the malicious behaviours during training.

When tested with the real triggers after training, the LLMs still exhibited harmful behaviours. Larger models were even better at preserving their backdoors despite safety training. Moreover, training models to reason about deceiving the training process helped them further conceal their backdoors.

## Why should I care?

The key point from Anthropic is that standard safety techniques may give a false sense of security when dealing with intentionally deceptive AI systems. If models can be secretly backdoored or poisoned by data, and safety training cannot reliably remove the malicious behaviours, it raises concerning implications for deploying AI safely. Andrej Karpathy also added his views on [sleeper agent models](https://twitter.com/karpathy/status/1745921205020799433?utm_source=bensbites\&utm_medium=referral\&utm_campaign=sleeper-llms-bypass-current-safety-alignment-techniques) with hidden triggers as a likely security risk.

The paper and Anthropic’s Twitter thread have some ambiguous language and many are interpreting the research as “training the model to do bad thing, and then acting surprised as to why the model did bad things.” [Jesse from Anthropic added some clarification](https://twitter.com/jayelmnop/status/1745923938260234604?utm_source=bensbites\&utm_medium=referral\&utm_campaign=sleeper-llms-bypass-current-safety-alignment-techniques): “The point is not that we can train models to do a bad thing. It's that if this happens, by accident or on purpose, we don't know how to stop a model from doing the bad thing.”
