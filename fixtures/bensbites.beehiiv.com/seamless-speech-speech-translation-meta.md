# Seamless speech to speech translation by Meta

[Meta has released another batch of language translation models](https://ai.meta.com/blog/seamless-communication/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=seamless-speech-to-speech-translation-by-meta). These ones keep the way we speak intact when translating what we speak. Also, you don’t have to wait for the translations until you finish speaking, the speech output is almost real-time to speaking.

## What’s going on here?

Meta has released their “seamless” suite of language translation models.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/dc160bce-fff2-4430-b814-ae83c84eb5ee/image.png?t=1701431927)

## What does that mean?

These are four models:

- SeamlessM4T v2 - The foundational model that Meta released in August.

- SeamlessExpressive - A model for preserving expression in speech-to-speech translation.

- SeamlessStreaming - A streaming translation model for state-of-the-art results with around two seconds of latency.

- Seamless - SeamlessExpressive, SeamlessStreaming and SeamlessM4T v2 into one model.

SeamlessExpressive currently keeps speech rate, pauses for rhythm, emotion and style in speech-to-speech translation between English, Spanish, German, French, Italian, and Chinese. SeamlessStreaming translates while the speaker is still talking.

You can [try the models](https://huggingface.co/collections/facebook/seamless-communication-6568d486ef451c6ba62c7724?utm_source=bensbites\&utm_medium=referral\&utm_campaign=seamless-speech-to-speech-translation-by-meta) on HuggingFace and the models are open-source for non-commercial use.

## Why should I care?

Imagine video calls on Instagram with the seamless models. You could chat with anyone in the world without English being the qualifying barrier.

Another part worth noticing is you can build algorithms to enhance base models. For example, Seamless streaming has an algorithm to decide when to keep listening and when to start translating to deal with the different sentence structure in different languages.
