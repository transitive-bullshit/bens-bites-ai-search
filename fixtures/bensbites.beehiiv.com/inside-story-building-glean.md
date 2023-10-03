# The Inside Story of Building Glean

Welcome to our new *Inside Story* series, where we’re going behind the scenes of some of the biggest companies in AI to find out how they were founded. Today we’re looking at **Glean**, an AI-powered search and knowledge discovery solution for enterprises.

Glean has successfully established itself as a leader in the AI space. It’s valued at over $1BN (hello, unicorn status) and is backed by the likes of Kleiner Perkins, Lightspeed and Sequoia. Its client roster includes Databricks, Duolingo, and Grammarly, to name a few.

The company is revolutionising how modern teams locate internal information. By providing a centralised repository of a company’s information, workers can swiftly find any document, information or person they need to do their work.

## Humble beginnings

Like many of today’s successful tech companies, [Glean](https://glean.com/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-inside-story-of-building-glean) was born out of real challenges experienced at work. Arvind Jain is Glean’s co-founder and CEO. He was struggling with knowledge search and discovery at his previous startup, Rubrik, when he landed on the idea for Glean.

“Rubrik grew extremely fast, reaching over 1,000 employees within four years. Despite the growth, we noticed declining productivity metrics across different departments. Through internal pulse surveys, we discovered that our team was struggling to find information they needed to be effective. Employees complained about not knowing where to find information or who to approach for help.”

Jain tried to find a ready-made solution for Rubrik. But the requirements proved a challenge: it needed to integrate with over 300 applications used by Rubrik’s employees, and work well enough that the adoption rate would be high.

To Jain’s surprise and frustration, no such solution existed. And this seemed to be an industry-wide issue. Enterprise companies everywhere were struggling. They had lots of information in lots of different places, without the means for employees to locate it.

*When you can’t find it, build it.*

Jain had identified a gap in the market. He saw the opportunity to create the solution companies needed, and decided to go build it. He hired someone to take over his R\&D responsibilities at Rubrik and got to work on incubating the idea that would later become Glean.

## Solving a common problem

Information retrieval is a common use-case. According to [McKinsey](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/rethinking-knowledge-work-a-strategic-approach?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-inside-story-of-building-glean#:~:text=One%20survey%20revealed,2), a survey revealed that over a quarter of a typical knowledge worker’s time is spent searching for information. Another found that only 16 percent of content is posted where other workers can access it.

The problems here are obvious. Companies want their workers to spend time doing the things that make the business most successful. Not wasting time finding stuff.

But the reason few solutions exist is because it's a hard problem to solve. Firstly, every enterprise is different, with its own unique set of information, apps, tech stack and people to solve for. Secondly, it’s only in the last decade that the support for APIs has become available across most apps. Before that, trying to integrate with say, a messaging app, was difficult to the point of being impossible.

Now, thanks to the rapidly changing technological environment and progression in AI, a solution like Glean is possible. And judging by the company’s success, it’s a solution that’s been eagerly awaited.

## The Google standard

Glean’s founding team all worked at Google previously. There, they had the luxury of using Moma—a custom intranet that indexes everything used inside Google.

Chatting on the [Latent Space](https://www.latent.space/p/deedy-das?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-inside-story-of-building-glean#details) podcast, Glean’s founding engineer, Debarghya (Deedy) Das, said:

*“\[Moma is] one of those things where when you're at Google, you sort of take it for granted. But when you leave and go anywhere else, you think: oh my God, how do I function without being able to find things that I've worked on? I remember this guy had a presentation that he made three meetings ago and I don't remember where he shared it.”*

Having spent over a decade working on Google Search himself before founding Rubrik, Jain knew he wanted to build a product of similar quality—both in terms of UX and search ability.

## From idea to product

So the problem statement for Glean was crystal clear: build a Google-like search system within a company that could integrate information across hundreds of different SaaS applications.

To achieve this, Jain needed to assemble his founding team. He brought on 3 co-founding engineers: TR Vishwanath, Piyush Prahladka and Tony Gentilcore. Convincing them to come over from Google wasn’t hard:

“It was quite easy for me to convince people that we should go solve this problem together. It’s such a pervasive issue felt by everyone, whether they’re an engineer, product manager, salesperson, marketer, or IT person. Even up to today, there’s never been a question amongst the team on whether we’re solving an important problem; we know we are.”

With Jain as CEO, the four co-founders started to build. Within 6 months, the team had their first product up and running. A couple of months after that, they put it in the hands of some early customers.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/7654b147-b268-48a6-bfe9-25113e8e8a17/01eca263-7674-492e-9063-6cd879922d62-RackMultipart20230926-116-z3vnhv.png)

In terms of the backend, there were several complex components to tackle (remember we said it was a hard problem to solve?!):

1. **Data assembly.** When you’re building a search system, the data you want to search has to be assembled into one place, a.k.a. a “crawling system”. This involves building integrations with the enterprise company’s applications to bring all their content into Glean’s platform.

2. **Search index.** The team built a traditional search index by mapping what search terms relate to what documents/information.

3. **Ranking.** The team built a ranking system so the platform can determine what the best match is for any inputted query.

But those components, while necessary for a product like Glean, aren’t what made it unique. Thanks to new transformer technology and LLMs that Google had made available in open domain, the Glean team could do something revolutionary: generate embeddings and build semantic search. In 2019, this was almost unheard of. What that looked like inside the product was a radically enhanced user experience and accurate search results. So if a worker typed ”show me the product manual for X” into Glean, the technology would surface user guides for X, team manuals for X, product playbooks for X, and anything else that matched based on *semantic* search, not just keyword match.

This revolutionary approach to knowledge retrieval gave Glean the edge over many of its competitors, who at the time were typically using QR based search and traditional information retrieval (IR) techniques.

## Acquiring customers (when failing fast isn’t an option)

When building a new product, SaaS startups typically get their MVP in front of customers early and iterate based on feedback. In the world of search, however, that luxury isn’t possible.

“The first impression that a user has with your search product matters. They’re going to come and ask a question, and if they don't find the right answer, they’ll be turned off. They might never come back. So you have to think carefully about how you deliver that first experience to them. Because you don't get a second chance.”

Naturally, Jain and the team wanted to avoid that fate. So rather than acquire customers quickly, they spent a lot of time—around two years—building a solid product. They spent time learning how enterprises work: what company knowledge matters most and to whom. They worked on figuring out how to give users the most relevant, up-to-date and useful documents based on a given search. They collected *hundreds* of signals from clients and built a deep understanding of every individual at the companies using Glean.

Jain even let his earliest customers use Glean for free:

“Initially we let people we already knew play around with the product without paying for it. We did a lot of that. But friends will always support you. I wanted real feedback. So I then spent a lot of time cold-connecting with people to build up a database of folks who had a genuine interest in the problem we were solving. I was our only salesperson. We built our early pipeline that way.”

Beyond the first few handfuls of customers (and friends), getting users to pay for Glean proved to be challenging. Firstly, Jain was trying to sell a product that few purchasing managers had bought before. There was no allocated budget in these enterprises for “search software”.

Secondly, it’s somewhat difficult to prove the value—how the tool increases revenue and reduces costs—of a search and knowledge discovery platform. Much more difficult than, say, customer service software, where it’s easier to track ticket reduction or improvements in customer satisfaction scores.

Thirdly, there’s the small matter of onboarding:

“Building a great product and selling it is only half the challenge. How do you actually get people to adopt it? Using Glean felt easy to me; it worked just like Google. So I couldn’t understand why people weren’t using the product as much as I expected.

We did surveys and half the respondents said they didn’t even know Glean was available at their company. And of those who did see the initial announcement, many said, “Oh, yeah, I tried it. I like it. But then I forgot about it.” Onboarding customers right so they feel motivated to use your product is a major challenge.”

## Navigating enterprise-level security

When you're operating at enterprise level, robust security is an absolute must. No one understands this better than Jain and his team: to operate seamlessly, Glean needs to access an enterprise's entire data. Imagine if Glean's systems were ever compromised, putting customer data squarely in the crosshairs of cyber threats. The stakes couldn't be higher. Security had to be watertight.

Jain and his co-founders also had the added challenge of reassuring customers that Glean was fortified to a Fort Knox standard. They were a small startup, running their product in the cloud. How could they convince enterprise companies to ship all of their data to an unknown provider?

One way they’ve solved for this is by designing their product using [single tenant architecture](https://www.techtarget.com/searchcloudcomputing/definition/single-tenancy?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-inside-story-of-building-glean). This means every customer runs their own instance of Glean in their own environment. Single tenancy not only gives customers more control and customisation of their instance, it also crucially provides them the highest level of security.

Today, some of the world’s largest companies use Glean, including fintechs and hedge funds. They trust their data is safe because Jain and his team have been uncompromising with the security they provide.

## Customised for every customer

Glean is a sophisticated enterprise platform designed to centralise and make company knowledge accessible through AI-driven applications. Their architecture is built on two primary engines:

1. **The Knowledge Engine**: This acts as a storage mechanism for all of a company's data and knowledge. It functions similarly to a search engine, being likened to retrieval systems or vector databases. However, unlike typical vector databases that may be too basic, Glean's retrieval system incorporates vector databases along with other components to enhance its data retrieval capabilities. This engine retrieves pieces of knowledge based on user questions, making it a pivotal part of the system.

2. **The Language Engine**: Distinct from the knowledge storage system, this engine is responsible for reasoning, understanding user intentions, and making sense of the knowledge. It essentially deciphers what a user is trying to convey and then interacts with the knowledge engine to fetch relevant information.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/6ce18308-990e-4605-9de2-2d06aadeb783/ad0b8239-c603-4996-9d5c-b00d1668dfcd-RackMultipart20230926-93-4489ti.png)

Glean's foundation is built upon the search product that they've developed over the last 4.5 years. It not only powers Glean Chat (more on that below), but also any generative AI applications an enterprise wishes to create. As such, Glean has unintentionally become the standard enterprise generative AI platform, seamlessly consolidating vast amounts of company-specific knowledge and making it readily available to various AI applications.

Technologically, Glean's approach is unique. They leverage smaller open domain models, like the Bard family, and then customise these models for each client. This customisation involves training the models on the specific enterprise's body of data, ensuring that the system understands unique company terminologies, concepts, code names, and acronyms. These fine-tuned models are then utilised for functions such as semantic similarity and synonym detection.

For user-facing interactions, Glean employs super large language models (LLMs) like GPT-4, 3.5, PaLM, or Llama 2. These LLMs are integrated via API and are mainly responsible for generating AI-driven answers that are displayed to the end-users. Due to their primary role in summary and synthesis, there's no need to train these super LLMs further.

In essence, Glean's robust system ensures the confluence of vast company knowledge with sophisticated AI, offering tailored, insightful interactions for its enterprise users.

## Glean Chat

Fast-forward to today, and Glean is working hard to stay ahead of the AI curve. Earlier this year they launched [Glean Chat](https://glean.com/blog/glean-chat-launch-announcement?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-inside-story-of-building-glean). It’s a chatbot for the workplace that allows workers to find what they need through a conversation.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/d4bf181c-e0de-42b5-864b-b91c46e18c80/8053d412-c98b-48c4-bfcc-1dcfb5674925-RackMultipart20230926-95-q3iyox.png)

“We wanted to take our product to the next level. So instead of Glean just surfacing all relevant documents relating to your search query, now it can actually read those documents and synthesise an answer for you. It’s more conversational. It’s also smarter in terms of how it understands user questions and composes responses. And because users are chatting with the product, we get to have a much better insight into how they interact with the tool, what they want, and how the results they generate compare to that.”

It’s a powerful offering. Now Glean users can choose to simply find a piece of information, find a list of documents, or summon an entire piece of content that answers their question. And it will always be wholly tailored to their workplace, based on thousands of pieces of information unique to that company.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/fb4379c6-fee3-45ad-9dfd-0836210bfe38/31314fbb-5347-4d90-bf1d-cd6358938ffd-RackMultipart20230926-132-jpl1hg.png)

## Key takeaways

- In the rapidly evolving AI landscape, Glean has carved out its niche as an AI-powered search and knowledge discovery platform tailored for enterprises.

- Born out of the real-world challenges faced by its founder, Arvind Jain, at his previous startup, Glean addresses the prevalent issue of information retrieval within organisations.

- Through pioneering techniques, such as semantic search and LLM utilisation, Glean offers a centralised system that effortlessly locates and presents internal information, revolutionising workplace efficiency.

- The introduction of Glean Chat further elevates this solution, providing a conversational interface that synthesises data into actionable insights, underscoring Glean's commitment to innovation and user-centricity.

Glean's revolutionary approach in harnessing AI for knowledge discovery positions it at the forefront of transforming workplace efficiency. In a world progressively driven by AI, Glean is not just setting standards but envisioning the next big leap in enterprise knowledge management.

Thanks to [Arvind Jain](https://www.linkedin.com/in/arvind-jain-5935161/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-inside-story-of-building-glean) for his contribution to this article.
