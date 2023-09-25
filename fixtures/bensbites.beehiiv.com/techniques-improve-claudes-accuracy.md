# Techniques to improve Claude's accuracy.

Anthropic shared the findings from an experiment they ran to test different techniques for improving their AI assistant [Claude's ability to recall information](https://www.anthropic.com/index/prompting-long-context?utm_source=bensbites\&utm_medium=referral\&utm_campaign=techniques-to-improve-claude-s-accuracy) from long documents.

## What's going on here?

Anthropic tested two techniques that improved Claude's accuracy on recall from long contexts.

- Extracting reference quotes relevant to the question before answering

- Supplementing the prompt with examples of correctly answered questions about other sections of the document.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/9d50bd98-f9ba-405d-9f62-6c394515ddab/image.png)

## What does this mean?

The Anthropic team tested Claude's ability to answer multiple choice questions generated from long government documents. They found Claude's accuracy improved when first extracting relevant quotes into a scratchpad before answering.

Providing examples of correctly answered questions about other sections of the document also boosted Claude's performance. The more contextual examples provided, the better Claude did.

This was true for both their smaller Claude Instant model and their more powerful Claude 2 model. The techniques helped Claude answer questions correctly even when the relevant passage was 95,000 tokens away.

## Why should I care?

Prompting templates are overrated whereas prompting techniques are more useful when working with AI. In Microsoft’s Copilot demos, there is a major focus on prompting methods for different tasks. If you are building services on top of Anthropic's API, these prompting techniques can help you take full advantage of Claude's ability to reason over long documents.

Anthropic also shared their full methodology and code to allow you to reproduce the techniques yourself. As they continue releasing new resources like their Anthropic Cookbook, it will empower developers to build more powerful and nuanced conversational AI applications.
