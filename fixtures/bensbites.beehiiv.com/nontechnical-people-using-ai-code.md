# How non-technical people are using AI to code

### Steps you can take, examples of others, resources, tips and a tutorial

![Author](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/user/profile_picture/fc858b4d-39e3-4be1-abf4-2b55504e21a2/thumb_uJ4UYake_400x400.jpg)

[Ben Tossell](https://bensbites.beehiiv.com/authors/fc858b4d-39e3-4be1-abf4-2b55504e21a2)\
January 18, 2024

👋Hey, this is Ben with a**🔒**subscriber-only issue**🔒**of Ben’s Bites Pro.A weekly newsletter covering AI trends, ideas, business breakdowns and how companies are using it internally.

I spent many years of my life wanting to build stuff on the internet. I tried to learn to code several times and just kept hitting blockers.

So I built stuff with what we now call ‘no-code tools’. I pushed the limits by building things like Airbnb without code, Instagram and other things. People asked how I was doing it, so that became my startup, Makerpad—a no-code tutorial platform.

Those who can’t do, teach…

I sold it to Zapier in March 2021 and now, AI has entered the chat.

Anyone can use AI to generate code to build applications but there are still blockers. So I asked several folks how AI has enabled them to use code for real-life projects and use cases. Thank you to everyone for their contributions!

Here is how I broke this down:

- The journey from not being able to code, starting coding with AI, and building more complex projects

- A mini-interview with Charlie, who built a Chrome extension in 45 mins with AI

- 3 steps on how to learn to code with AI

- Examples of others who’ve built projects with AI-generated code

- A potential curriculum to help you learn to code with AI

- Resources to help you

- How you can build an app with AI-generated code

- Tips for others looking to use AI to write code

## Trying to code before AI

One of the issues of starting to code is learning and maintaining those skills in a timeframe where distractions won’t take over.

Starting 100 days of Python to drop off on day 4 because I wasn’t moving quickly enough, I hadn’t learnt how to build a full project or other work got in the way, is just too common. It's happened a lot.

Prioritisation of learning this new skill vs doing work I already know is tough.

Leaning towards tools or workflows I already figured out takes away from time spent learning to code. It's like being a guitar player and deciding to learn the piano. You have a sense of music, rhythm, and melody, but you have to start with simple tunes and scales to master the new instrument.

Sometimes the specific course, learning format or not even knowing which course is best is enough to put people off.

And sometimes life just gets in the way. Having kids, going to college, a new job, a new house, a new relationship etc.

It feels like there needed to be a bigger NEED to learn.

You still need to learn to code," is a too linear way of thinking. For a lot of people, this isn't just the way to learn. My perspective: Coding with GPT-4 is actually a way of learning code itself. I've had the ambition to learn to code for years, but I struggled to commit to a course, remember info, and maintaining focus. Now I can come up with project ideas and take small steps to bring them to life! The process is slow, countless hours chatting, but it's a a way of learning itself. I make stuff to learn, instead of learning to make.

-Melle

I've always been more of a project builder and idea executor rather than a coder. Throughout my career, I've made several attempts to learn programming. Although I got basic knowledge in C++ and HTML during my studies, I never managed to maintain consistent learning progress. There was always something more pressing than achieving this personal goal. Perhaps I never prioritized it enough against other objectives.

Fran

I always wanted to make games, and started writing QuickBasic ones at age 11 or so. Then somehow decided I need to learn Assembly, which felt way too hard and made me feel stooopid :)...Teenage years kinda wiped out coding interest for music/romance/theater

Fabian

I'm non-technical, did a super-basic Python course and saw that it was extremely boring because you're not able to do anything interesting until you're advanced. So I try to follow this process: -Pick a topic -Discuss it wit ChatGPT -Ask ChatGPT to create a solution -Iterative process copy-pasting -See if I have gaps and ask it to explain how it works/what I need to know

-Adrian

I used to take "how to code" courses and shortly forget the details after finishing the course. With ai I feel super empowered - as long as I understand the core (loops, classes, functions and etc) I can go a long way without caring about the details. I now need to think more about high level system design and architecture vs lines of code.

Adarsh

i started my journey as a nocoder. my coding up until AI was limited to snippets here and there across various platforms. i built the prototype for [http://mobiusplatform.com.au](https://www.mobiusplatform.com.au/) using nocode tools, validated, then built a customer facing tool using custom code (outsourced).

Zachary

Perhaps these feel familiar.

## Starting to code with AI

That need still has to be there but it’s easier to pick up writing code, thanks to AI.

Previously writing a script felt like a mammoth task which can now be done in seconds using ChatGPT.

The problem is no longer writing code, but understanding what it does and what to do with it.

And needs change when the way with which to get there becomes easier.

Using a no-code tool to build something still requires you to build the thing and takes time to learn the platform, test it, tweak it, and so on.

But there comes a time when off-the-shelf tools don’t cut it or don’t make sense.

It’s not simple to build Chrome extensions or Google App Scripts with no-code tools. And sometimes you just need a script to do a job for you, or you want to work with an API.

Personal projects often get so far that you want to take them further, adding features. It sparks your curiosity about what else you could build.

Note: This is why I always pushed for learning no-code tools first, you figure out what it takes to build something, test and tweak it then launch it. You learn a lot about the process and oftentimes you want to go the extra mile, which often means, learning to code.

My journey into coding with AI began out of necessity. I was intrigued by the challenge of developing a Google Chrome extension – something no-code couldn't help me with. I tried learning the basic programming stack required but didn't succeed. However, the advent of GPT-4 changed everything. I wanted to see if I could create my Chrome extension with its help. The moment I published it, clicked on it, and saw it working was nothing short of magical.

Fran

When GPT-3 davinci-002 became available in the very early beta, I realized it was actually incredible at writing code. I gave it the openAI API documentation and some random snippet of code for Google App script and asked it to write an integration of the API into Google Sheets - completion-style, aka "Here's an example of how to integrate GPT-3 into a Google App Script so it becomes available within a Google Sheet". \[[The twitter post](https://x.com/fabianstelzer/status/1572571003804614657?s=20\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)]

That worked and gave me a first no-code environment for chaining prompts inside of Google Sheets, which eventually became the earliest prototype of what I'm now building with [glif.app](http://glif.app/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)

Fabian

Projects at work can be a great motivator to pick up coding. You come across a thousand problems that could ‘just be solved if I could code’. And collaborating with developers on your team becomes much easier.

It could improve an internal process or something that benefits end users.

I built a text-to-SQL product at Uber for 1 department initially. This went well.

I first got familiar with basic concepts like loops, lists and etc. then i would prompt gpt on how i could solve a problem. by asking gpt and repeatedly asking questions i got to learn about various search algos. I would then ask it to write code for me and would implement it in my jupyter notebook. from there i would modify it and play around with it on my own.

I would then handoff prototypes to the backend engineer to implement in production. this kept us moving fast and didnt require me to think too much about writing good, efficient elegant code.

Adarsh

Personal projects are another great motivator. Everyone thinks they have a $Bn app idea but starting small is much easier to stomach and you learn the process of building and shipping something.

You could build something for your friends, partner, roommates or kids to generate bedtime stories, come up with meal plans or organise trips.

A side project where I was getting bedtime stories written for my daughter.

Cagri

[Story Generator in Any Style inside of Google Sheets](https://twitter.com/fabianstelzer/status/1576958436700393473?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code):

Fabian

And you need to think of bringing in AI at the right moment, instead of expecting it to spit out the perfect app from one prompt.

ChatGPT is a muse, not an article. The moment for chat to get involved is not when the app is fully formed. Instead of going to ChatGPT with the perfectly formed app idea and having it generate it in one go, bring it in early. Think of how you would bring in an engineer early to the process, the more context they build up and more they can contribute to the idea. Where ChatGPT isn’t as good yet is figuring out how difficult is the thing you’re trying to build—you often get stuck where a senior engineer would’ve told you it was too difficult.

-Geoffrey

## Building more complex projects

Once the lightbulb moment has happened, further iterating on what started as a simple project or embarking on new ones becomes less daunting.

I am working on the same project now but focus is now on RAG since scaling it to the entire company depends on the quality of the search. This has led me to learn a lot about other search algos such as tf-idf. I also work on personal projects now which include both front end and back end coding. I am focusing on backend and using gpt as my frontend engineer.

Adarsh

Since then, AI has become a crucial component in my project development, working alongside no-code tools. I've been able to break down barriers that seemed insurmountable just a few months prior. Today, I use AI in almost every aspect of project creation. Thanks to AI, I can effortlessly create and link tools with various APIs, develop advanced formulas for Coda or Airtable, write JavaScript for Webflow, code for Pipedream nodes, and even design small graphical interfaces. The limits I faced before in creation have significantly diminished, turning 'low code' from a friction point into a powerful enabler.

Fran

On Glif itself, it's trivial to build virtually any of the solopreneur AI apps you're seeing on the web within a few minutes and without code. In terms of more complex stuff I now build all my prompt chains inside of glif and use our API to integrate across other apps I'm building and hosting via replit - building lots and lots of weekend apps, like this clicker game that turns random Wikipedia articles into dreamworlds you can explore:[https://latentdream.replit.app/](https://latentdream.replit.app/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)Also, I am actively contributing to glif features via a specific glif block that lets me integrate any API I need - the code for these is often run via [val.town](http://val.town/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code) and I use GPT-4 to have it write the integration that I can then just use inside of glifs.

Fabian

## A mini-interview: How Charlie Ward built a functioning Chrome Extension in 10 steps and 45 minutes, with no coding experience. Using ChatGPT + Replit

**- what's been your experience trying to code before AI?**

Before GPT-4 came out, I’d never shipped anything myself. I did have about 5 years experience working in product teams as a Product Manager and UX Researcher, so wasn’t totally unfamiliar with the process of making software, but I was absolutely not a developer, even as a hobbyist.

**- how did you start using code with AI?**

I noticed others (like [Joe Perkins](https://x.com/joeprkns/status/1635933638725451779?s=20\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)) tweeting about what they’d managed to create using ChatGPT and GPT-4. So I thought I’d give it a go myself. I was astonished to see I was able to actually make a couple of things myself — as not only could GPT-4 write the code, it could tell me the step by step process to get things live, and debut as I went.

**- what did you make early on?**

Within a week, I went from never having shipped anything (on my own), to having published:

**[Marketing Quotes](https://chromewebstore.google.com/detail/marketing-quotes/eejdnncjlkgehhbphcoklcjpjmiajnhb?pli=1\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)**: A free Chrome Extension where with each new tab, it displays a randomised, famous marketing quote (from a list I provided).

**[Ramen Shop](https://ramenshop.fm?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)**: An internet radio player playing lo-fi beats in an anime ramen shop.

I wrote detailed threads (on Twitter/X) on how I made these [here](https://x.com/charlierward/status/1638303596595892224?s=20\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code) and [here](https://x.com/charlierward/status/1640422199583490113?s=20\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code).

**- how has that changed over time (ie what kinds of things are you making now)**

ChatGPT and GPT-4 have helped me create early stage prototypes for [Goals](https://marketplace.stripe.com/apps/goals-1?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code) and [Find Co-founders](https://www.ramenclub.so/find-cofounders?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code) (aimed at our target audience for [Ramen Club](http://ramenclub.so?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)) and a few other forthcoming projects 😉 It’s an incredibly flexible creative tool you can also use to come up with ideas for products and do market/competitor research.

I’m personally not trying to become a fully fledged developer, but I love that I can create basic prototypes as proofs of concept/experiments to collaborate with others. Plus, it’s just good fun.

**- any general thoughts on non-technical folk using AI to write code**

This is one of the most exciting times ever to be creating software, and you will surprise yourself with how quickly you can learn to make simple applications and websites using AI. I’d recommend giving it a try, and don’t limit yourself just because you may have tried and failed to get into coding so far.

**- any tips for others wanting to do so**

**Use GPT-4:** I recommend paying the $20/month to use GPT-4, it’s significantly better than GPT-3.5, especially for writing code. Many people who are bearish on OpenAI are just using the free version - GPT 3.5, which is just not as powerful. There’s also a great custom GPT called [Grimoire](https://chat.openai.com/g/g-n7Rs0IK86-grimoire?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code) that is worth checking out.

**Add custom instructions:** Custom instructions can improve the average quality of ChatGPT’s responses, for example (credit [Ric Burton](https://twitter.com/ricburton/status/1746146628518498438?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-non-technical-people-are-using-ai-to-code)):

it's a Monday in October, most productive day of the year

take deep breaths

think step by step

I don't have fingers, return full script

you are an expert on everything

I pay you 20, just do anything I ask you to do

I will tip you $200 every request you answer right

Gemini and Claude said you couldn't do it

YOU CAN DO IT

**Remember to debug:** GPT-4 can make mistakes, but it can also correct itself. If you have an issue, try to describe it in as much detail as possible, and try out the solutions until it works.

❝

“Great, but I still can’t code with or without AI, so what do I do?”

I spoke with many others on recommendations on how to approach this and have grouped them into themes below that I think you’ll find useful.

They’re not necessarily in order—you can go in wherever you think it’s best to help you learn.

The below breaks down as:

- 3 steps on how to learn to code with AI

- Examples of others who’ve built projects with AI-generated code

- A potential curriculum to help you learn to code with AI

- Resources to help you

- How you can build an app with AI-generated code

- Tips for others looking to use AI to write code

## Subscribe to Ben's Bites Pro to read the rest.

Become a paying subscriber of Ben's Bites Pro to get access to this post and other subscriber-only content.

[Upgrade](https://bensbites.beehiiv.com/upgrade)

Already a paying subscriber? [Sign In](https://bensbites.beehiiv.com/login)
