# Google's Gemini beats GPT-4 but at what cost?

[Google launched Gemini out of the blue yesterday.](https://blog.google/technology/ai/google-gemini-ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) Well, not that out of the blue—The Information first reported that Google is postponing this launch to January and then updated the report to say nope, Google’s gonna do it this week.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ffc003ed-f840-4426-9dbf-dcde9f18aee3/image.png?t=1701954309)

## And Google launched, with a bang.

I click on the announcement post and all I see are blue numbers under Gemini with GPT-4 (and GPT-4 Vision) greyed out on the side. Impressive stuff from Google. (TLDR at the bottom)

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/d32b7dc4-eeea-4f3c-8d85-139432c24672/image.png?t=1701954291)

## This looks pretty bad, right?

But for whom…

As the demo-induced excitement takes some rest, I (and the rest of AI Twitter) dive into the post and find some troubling things.

- The MMLU performance which Google claims surpasses GPT-4 (and even humans) is a clever play on prompting technique, Otherwise, Gemini is still losing to GPT-4. Almost near GPT-4, but losing.

- The flagship demo is a post-processed video (expected) with prompts read in the video different from actual prompts to the system (unexpected). Google reveals this on its own, by releasing a dev post “How it’s made’ breaking down how they created the video.

- The blue numbers are for Gemini Ultra, which is gonna come next year. The model is live right now in Bard is Pro, one version down. The developer access for even Pro models is a week away (13th December).

## What exactly did Google launch then?

Let’s take a deep breath and think step by step.😏

The biggest breakthrough in the Gemini announcements is the fact that Gemini models are trained on [multimodal data from the ground up.](https://www.youtube.com/watch?v=jV1vkHv4zq8\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) This includes text, images, videos and audio. This change might result in Google getting a lead and OpenAI play catch up in 2024.

Gemini comes in three sizes: Ultra, Pro and Nano. Ultra beats GPT-4 on many benchmarks and is comparable on the rest. But we are not getting Ultra anytime soon. We’re [getting Pro in Bard](https://blog.google/products/bard/google-bard-try-gemini-ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost), starting now. The kids in this party of giants, the [Nano models will run on mobile devices](https://blog.google/products/pixel/pixel-feature-drop-december-2023/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) starting with the Pixel 8 Pro.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/8ddb55ec-3350-4ff0-84d3-445b5ea3165c/image.png?t=1701953736)

Gemini Pro will be in developers’ hands next week. Android devs will also get access to Gemini Nano. Gemini Ultra’s first appearance next year would be in a different product called Bard Advanced. It’ll likely combine these features and be paid.

The highlight of Benchmark performance is MMLU beating GPT-4 and Humans. They use a new prompting + reward technique to get to 90% on MMLU \[[technical report](https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf?utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost)]

Google's performance on vision and audio benchmarks is more impressive. Pro with Vision is comparable to GPT-4 with Vision, and Gemini wins over Whisper by a huge margin. But as we all know those are benchmarks. We tried [replicating Gemini tests in ChatGPT](https://twitter.com/Keshavatearth/status/1732477941811212696?utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) and felt GPT-4 did as well as the demo videos.

## Ah! The demos. Tell me more

The key demo, [Hands-on with Gemini](https://www.youtube.com/watch?v=UIZAiXYceBI\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost), shows Gemini using image and audio inputs, working in multiple languages, writing code, and reasoning using images or videos as context. Obviously, the demo is cherry-picked and sped up with post-production (like audio outputs). Google’s [behind-the-scenes article](https://developers.googleblog.com/2023/12/how-its-made-gemini-multimodal-prompting.html?utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) explains how much.

But there are about a dozen other demos buried below this one. A quick recap of the interesting ones:

- Gemini allows scientists to [scan through 200,000 papers](https://www.youtube.com/watch?v=sPiOP_CB54A\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost), find ~250 relevant ones and extract data from those papers.

- A special version of Gemini, [AlphaCode2](https://www.youtube.com/watch?v=LvGmVmHv69s\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) performs better than 85% of humans in competitive programming.

- It can check your kids’s [science homework](https://www.youtube.com/watch?v=K4pX1VAxaAI\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) or help you in listening to [French podcasts.](https://www.youtube.com/watch?v=D64QD7Swr3s\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost)

- Gemini can [create UIs on the fly.](https://www.youtube.com/watch?v=v5tRc_5-8G4\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=google-s-gemini-beats-gpt-4-but-at-what-cost) BIG!! They are calling it Bespoke UI in the demo. It’ll be interesting to see if this comes out as a product early next year.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/37b544ef-900b-4322-a1f8-6892a9fa4737/image.png?t=1701954617)

## So what?

The new suite of Gemini models is impressive. Google proved a model beating GPT-4 is possible but again, ships a waitlist. Gemini’s integration into Google products remains to be seen.

Bard with Gemini Pro is likely better than the ChatGPT free version. ChatGPT Plus with GPT-4 or Bing in Creative mode (using GPT-4 under the hood) is still better.

That’s it, the rest of it is drama.
