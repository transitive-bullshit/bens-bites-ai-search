# How Clearbit’s team uses AI

### and how you can implement similar strategies at work

![Author](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/user/profile_picture/fc858b4d-39e3-4be1-abf4-2b55504e21a2/thumb_uJ4UYake_400x400.jpg)

[Ben Tossell](https://bensbites.beehiiv.com/authors/fc858b4d-39e3-4be1-abf4-2b55504e21a2)\
January 25, 2024

👋*Hey, this is Ben with a* ***🔒**\*\*subscriber-only issue* ***🔒**\*\*of Ben’s Bites Pro.* *A weekly newsletter covering how businesses are using AI.*

*If you’re not a subscriber, here’s what you missed recently:*

- *[How Deel uses AI in its business](https://bensbites.beehiiv.com/p/deel-uses-ai-business)*

- *[How Sandwich Video uses AI internally](https://bensbites.beehiiv.com/p/sandwich-video-uses-ai-business)*

- *[AI’s impact on jobs: A look at front-end engineering](https://bensbites.beehiiv.com/p/ais-impact-jobs-look-frontend-engineering)*

*Subscribe to access these and all future & past posts.*

[<button>Subscribe to PRO</button>](https://bensbites.beehiiv.com/upgrade)

I’m exploring how to implement AI in business and today I’m excited to show you how Clearbit does it.

[Clearbit](https://clearbit.com/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-clearbit-s-team-uses-ai) provides company data to sales and marketing teams to find and engage their ideal customers. They were acquired by HubSpot in November 2023 for $150M.

Thank you, [João Moura](https://twitter.com/joaomdmoura?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-clearbit-s-team-uses-ai), Director of AI Engineering at Clearbit, for spending time with me and opening up behind the scenes. He also shares his AI agent framework, [CrewAI](https://www.crewai.io/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-clearbit-s-team-uses-ai).

What stood out to me from this conversation:

- exploring use cases with an AI champion in charge

- rolling it out to the team by forming small, cross-functional teams and speaking with external experts

- the challenges you’ll face when doubling down on AI implementation in your product and team

- which tools they use and why

- leveraging AI agents to automate your life and get time back

- how much AI has changed the way different teams work

- steps for AI adoption in your team

## The exploration phase

When João first brought up AI into Clearbit, it seemed obvious. They have all this data about so many entities, what can they do with it?

So Clearbit began experimenting with AI, and João developed a predictive model for the likelihood of winning sales opportunities, which could help customers forecast their deal pipelines using their own and Clearbit’s data.

They also started building a GPT plugin and using LLMs for improved data parsing, as much of their work involves extracting internet data gems.

It basically integrated with some of our core APIs, it would allow Clearbit customers to pull data on the website visitor, search for similar companies and do some early prospecting. The good thing was that by getting that data into the Chat you could easily translate from checking visitors to finding similar ones and to asking it to help you write emails.

This quickly evolved into complex use cases with RAG systems and large-scale embeddings.

Retrieval-augmented generation (RAG) is like a smart assistant that can look up information and talk about it naturally, while Regular Expressions (Regex) is a tool for finding specific words or patterns in a text.

RAG models are really good at figuring out the context to answer questions or create text, using lots of information beyond what Regex can do with its basic pattern finding, making them more suitable for complicated language tasks.

Before there were only so many cases you could cover with Regex, with RAG we can tap into data points we wouldn't be able to easily extract otherwise.

Embeddings turn words or items into numbers so that computers can understand how similar or different they are to each other.

Embeddings were crucial to achieving effective RAG because they provide a nuanced understanding of language that is essential for both the retrieval and generation components of RAG models, like tagging and classification.

Embeddings were intrinsical to get some good RAG, but we also have leveraged them to do actual tagging and classification in a scale and level of precision we wouldn't be able to before by relying only on ingesting data from sources

AI unlocked numerous use cases, diverse data sources, and processes, enhancing data coverage and quality, making their company data superior to any in comparison.

As of today we now have 100% coverage across three of the most important company data points. Every single company domain requested by a customer within the last 3 months (~4M) has a clear english description, accurate industry categorization, and detailed company tags.

Matt Sornson - GM & VP of Product

They were able to infer data and tag companies with higher precision and that they wouldn't have been able to in the past.

Take a look at the % increases (in green) below for their metrics:

![](https://lex-img-p.s3.us-west-2.amazonaws.com/img/75a621c7-f951-4aa4-b163-bf66eee81cad-RackMultipart20240125-189-v51zbs.jpeg)

## Rolling out AI to the team

## Subscribe to Ben's Bites Pro to read the rest.

Become a paying subscriber of Ben's Bites Pro to get access to this post and other subscriber-only content.

[Upgrade](https://bensbites.beehiiv.com/upgrade)

Already a paying subscriber? [Sign In](https://bensbites.beehiiv.com/login)
