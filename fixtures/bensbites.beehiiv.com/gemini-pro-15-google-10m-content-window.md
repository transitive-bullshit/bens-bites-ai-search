# Gemini Pro 1.5 from Google has a 10M content window.

[Google announced a new model.](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024?utm_source=bensbites\&utm_medium=referral\&utm_campaign=gemini-pro-1-5-from-google-has-a-10m-content-window) Didn’t they release one last week? That was [Gemini Ultra 1.0](https://bensbites.beehiiv.com/p/google-launches-gemini-advanced-compete-openai). Google’s moving ahead to 1.5 model announcements and now we got a peek into Gemini Pro 1.5. This one has a context window of up to 10M tokens—GPT-4 Turbo has 128k.

## What’s going on here?

Google introduced Gemini Pro 1.5 - A new model with insane context window and performance.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/65814b8a-24ad-42f2-8a41-fbf3dbf47662/image.png?t=1708084371)

## What does that mean?

Google’s already on the treadmill after just giving people access to their best model last week and announced Gemini Pro 1.5 now. So what’s new here?

- It is based on the **Mixture of Experts** architecture. (which many people believe is the secret sauce behind GPT-4).

- Just like other Gemini models, it is **multimodal** from the ground up—understands images, video, and audio natively.

- This new model can go have up to **10M tokens**in its context window. The big hype feature.

- Despite being a mid-sized model, it performs at a **similar level to Gemini Ultra 1.0**—The silent killer. Ultra 1.0 is Google’s biggest model and GPT-4 class model.

Let’s understand these a bit:

Context window means how long your prompt to an AI model can be and if you’re working with long-form content like business PDFs, books etc. you want all you can get. Claude by Anthropic shocked everyone by accepting 100k tokens in its context window last summer (200k some months later) and GPT-4 Turbo announced 128k token context window in November.

Gemini Pro 1.5 takes two big jabs at other models here:

- Huge jump from what they call “standard” i.e. 128k tokens. The 10M context window is a research claim but Google is allowing select developers to test up to 1M tokens.

- Multimodal inputs: You can not only put large books in there, but you can query entire movies, languages, codebases, and whatnot.

And these jabs land because in evaluation they have 100% recall till 500k-ish token and >99% till 10M. Examples [here.](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=gemini-pro-1-5-from-google-has-a-10m-content-window)

Twitter’s going gaga over this part but some amazing stuff is hiding underneath all this talk about context window. It’s killer performance on multiple benchmarks.

Google is [reporting the performance](https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf?utm_source=bensbites\&utm_medium=referral\&utm_campaign=gemini-pro-1-5-from-google-has-a-10m-content-window) \[page 20] with respect their their Gemini Ultra 1.0 model, not GPT-4 but cross-referencing technical reports, I found Pro 1.5 to be *very slightly* better than GPT-4’s on MATH, BIG-Bench-Hard and nearby on a bunch of others.

The trick seems to be a Mixture of Experts architecture. The leaks (although most researchers believe this) say that GPT-4 is also a “mixture of experts” model. And Mistral is also using it in their models to punch above their weight. I’m excited to see what Google does with Gemini Ultra and MoE.

## What should I care?

I’ll just remind you of the three examples from Google itself:

- Finding contextual quotes from 402-page transcripts from Apollo 11’s mission to the moon.

- Loading up a 44-minute silent movie and finding exact scenes.

- Programming with a reference of 100,000+ lines of code.

Long context means even if the AI doesn’t know stuff, you can just put the reference material and get your work done. If that’s ain’t exciting, I don’t know what is.

Wait. I know something. How about almost real-looking AI videos?
