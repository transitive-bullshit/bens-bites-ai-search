# Getting started with building GPTs

OpenAI launched GPTs last Tuesday. These are custom chatbots you can create without any coding, inside ChatGPT. [More about what GPTs are →](https://bensbites.beehiiv.com/p/open-ai-announces-gpts-work-automatically)

This is possibly the start of a new app store moment. [GPTs like chatbot experiences might become a norm](https://twitter.com/bentossell?utm_source=bensbites\&utm_medium=referral\&utm_campaign=getting-started-with-building-gpts) and you should try building them now. Here are some thoughts on getting started with building GPTs.

## Where is the opportunity?

Let’s keep API actions aside for a while and think about the powers GPTs have. It has:

- Custom Instructions

- Vision

- Web-browsing

- DallE-3

- Code-interpreter

- Document retrieval

The most basic GPTs combine custom instructions with one of the other powers. Everyone has their eyes fixated on document retrieval, but there are other amazing ideas.

This could be building a [colour palette creator](https://twitter.com/bentossell/status/1723014601556508741?utm_source=bensbites\&utm_medium=referral\&utm_campaign=getting-started-with-building-gpts) with Code Interpreter. Or a GPT that can organize screenshots with Vision or a GPT that can create images in a consistent style with DallE-3.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/b8597a78-8255-442b-b352-500d07381546/image.png)

The next level is combining multiple of them and stress-testing the GPT on its usage of relevant powers. One idea that you can explore here is combining different documents with different powers in a single GPT.

On mobile, there’s an extra power of voice inputs/outputs but I’d only suggest going there if you have a clear use case/solution. Tinkering is harder because you can only create on the web but test only on mobile for voice.

## How to think about API actions?

Using API actions to fetch your content isn’t very user-friendly. The call takes more time than browsing manually in most cases. Instead, you want to give the GPT a collection of your content as a document.

The secret of API actions will be “affecting the other app”. Like the Zapier demo from OpenAI where the GPT added an event to your calendar. Think of this prompt for finding use cases: “I wish I could just say this and it got done automatically.”

Right now you can only access GPTs with API on the web and the voice mode only on mobile, but whenever OpenAI extends any of that, you’ll be in the prime position.

## Some hacks and tips

Here are some hacks/tips to get more traction, improve GPTs or build faster.

**Hack:** Don’t just use the builder. Use an external ChatGPT thread to build. The GPT builder has no room for exploring your thoughts, every command updates the GPT’s behaviour.

**Tip:** Don’t upload sensitive info just yet. The users can ask for these files and their contents (as they are supposed to). You can try adding instructions to make it harder but there are ways around them.

\*\*Hack:\*\*Introduce hotkeys for complex GPTs. Especially if the use case falls in the productivity category.

**Tip:** Add humour/sarcasm/style to how your GPT responds. Boring responses get less (way less) attention.

**Hack:** Structure your prompts. Make them testable so you can iterate better on what command is driving GPT behaviour in the right or the wrong direction.

\*\*Tip:\*\*GPTs don’t have inherent user-specific memory. They are same-for-all websites with chat interfaces. So building GPTs that need to act uniquely for each of your users is harder. You might not want to try those cases if you’re just starting to tinker.

**Hack:** For the same reason as above, they can easily replace those single-use websites with 100 ad pop-ups. Copy those for a quick start.
