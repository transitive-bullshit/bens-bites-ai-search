# Artists can poison AI models

A new tool called [Nightshade allows artists to add invisible changes](https://www.technologyreview.com/2023/10/23/1082189/data-poisoning-artists-fight-generative-ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=artists-can-poison-ai-models) to the pixels in their art before posting it online. This "poisons" the images so they damage AI models if scraped for training data without permission.

## What's going on here?

Artists can now make their work AI-hostile to prevent AI companies from using it without consent.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/84da050d-b94e-4de3-afec-54ed736b9e4f/image.png)

## What does this mean?

Nightshade exploits vulnerabilities in AI image models trained on vast scraped data. It alters uploaded art (without changing the visuals) to make models learn incorrect associations. For example, poisoned dog images could get models to output cats instead. This forces companies to find and remove every corrupted sample, which is challenging.

Poison spreads too - altering "fantasy art" also affects related concepts like "dragons". Larger models need more poisoned data for major damage. The researchers behind Nightshade claim it tips the power balance back towards artists.

## Why should I care?

From one POV, Nightshade might pressure AI companies to respect artist rights and pay royalties. Artists can now confidently share work publicly again.

But somewhere at the back of my mind, this also feels like adding spikes to the road, so cars can’t drive. Bad data samples can decrease the model performance significantly.

But the implications are clear - data models can no longer rely on good old scraping to get data. If they do, they are shooting themselves in the foot.
