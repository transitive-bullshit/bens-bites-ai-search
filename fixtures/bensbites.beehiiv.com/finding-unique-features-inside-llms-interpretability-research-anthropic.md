# Finding unique features inside LLMs - Interpretability research by Anthropic

The neural networks in large language models show superposition. That means each neuron in the network represents more than one unique feature. Polysemantic neurons compress many rare features of language which is good for performance but makes them harder to understand. You can’t extract those features individually. [Anthropic’s new paper](https://transformer-circuits.pub/2023/monosemantic-features/index.html?utm_source=bensbites\&utm_medium=referral\&utm_campaign=finding-unique-features-inside-llms-interpretability-research-by-anthropic) tries to extract these hidden features in a human interpretable form.

## What’s going on here?

Anthropic’s new research extracts a large number of interpretable features from a one-layer transformer.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/2decd81b-b519-4595-91e6-fafbc59b1043/image.png)

## What does that mean?

They use a weak dictionary learning algorithm to generate “learned features.” These learned featured have a single meaning (monosemantic) which makes them easier to understand than neurons. For example: Anthropic turned ~500 neurons into ~4000 features such as citations, legal text, DNA sequences, HTTP requests or Arabic text.

With a similar input, giving high value to these unique features results in unique outputs. Such as, turning on the DNA feature makes the model output DNA, turning on the Arabic script feature makes the model output Arabic script, etc.

## Why should I care?

This is big because it takes one step closer to solving the black box problem of LLMs. That will eventually enable us to diagnose failure modes, design fixes, and certify that models are safe for adoption by enterprises and society. It's much easier to tell if something is safe if you can understand how it works!
