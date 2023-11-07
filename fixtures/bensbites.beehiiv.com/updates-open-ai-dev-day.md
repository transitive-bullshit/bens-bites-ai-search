# All the updates from Open AI Dev Day

[Open AI’s dev day was terrrrriffic.](https://www.youtube.com/watch?v=U9mJuUkhUzk\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=all-the-updates-from-open-ai-dev-day) Sam Altman launched a new language model, with tons of added powers. Then announced a bunch of other models to API. Took some sweet time to chat with Satya (and poke him about OpenAI and Microsoft’s relationship). Went all philosophical before dropping the big bomb.

## What’s going on here?

Nothing, just Open AI slaying (literally for wrappers) at its first dev day.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/0e3af2d4-e9d8-49c4-8d2f-1522446e3545/image.png)

## What does that mean?

**Open AI launched GPT-4 Turbo.**

GPT-4 Turbo is trained up to April 2023 and has a context length of 128k tokens (about 300 pages). And it’s 2-3x cheaper than GPT-4.

It’s better at following instructions: There’s a JSON mode to get replies in JSON by default., you can call multiple functions at once or reproduce consistent outputs using a seed parameter.

**MultiModal API**

Open AI API is getting all the multimodal features of ChatGPT. That includes:

- DallE-3: Ability to generate images programmatically.

- GPT-4 Turbo with Vision: Image input for GPT-4 Turbo.

- TTS and TTS HD: Text to speech in 6 preset voices. TTS for speed and TTS HD for quality.

- Whisper V3: Open source. Announced, coming to API this month.

**The big bomb: GPTs and Assistant API**

GPTs are custom chatbots within ChatGPT. You can create them just by prompting the GPT builder. It’ll set up the custom instructions automatically. It’ll name your bot, create a profile picture for it and even suggest default questions to display for the user. For more powers: you can configure your GPT to

- Accept external documents to do the retrieval. No need for creating embeddings, implementing chunking or setting up a search algorithm.

- Allow using tools like code interpreter (yes they renamed it back), web browsing, and DallE-3.

You can then preview your GPT before making it live: for yourself, your team, or everyone in the GPT store. We’ll have a more detailed preview for GPTs once they are available tomorrow.

The Assistants API is the same but developers can build similar custom chatbots for their websites with more control and more features.

**Miscellaneous**

- Fine-tuning support is now generally available for GPT-3.5 16k. Active fine-tuning developers are invited to GPT-4 fine-tuning experimental program.

- Custom Models Program: Companies (that are huge and filthy rich) can work with Open AI staff to create custom models with their proprietary data (ranging in billions of tokens).

- 2X higher rate limits for everyone and 2x-3x pricing reduction across multiple language models.

- Copyright Shield - Legal responsibility for API and Enterprise usage.

## Why should I care?

Do I really need to answer this…

Okay!! As uncle Sam said, this is the V1 of what’s coming—fully autonomous agents. The best way to be ready is to experiment with the early versions. Think hard about how they change your life and work.

Or you can not care, your wish…
