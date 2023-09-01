# Startup Profile: Metal

### A platform and fully-managed service that helps developers build and implement production-grade large language model (LLM) applications

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/a15b78d9-7447-428b-b382-940fea45e80b/logo__4_.png)

Founded in 2023, [Metal](https://getmetal.io/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal) is a platform and fully-managed service that helps developers build and implement production-grade large language model (LLM) applications. Its founders are Taylor Lowe, Sergio Prada and James O’Dwyer.

The team primarily services mid-market and enterprise-level companies that recognise the potential of LLMs, but don’t have the internal resources or expertise to integrate it into their tech stack. Working closely with their clients from start to finish, the Metal team provides consultation, ideation, development, education and support to help clients get the most value out of the technology.

## Company values

**Find real value for customers.** AI is a tool, and, like any tool, it works well for some things and doesn't work well for others. The task is to find the most valuable problems to solve, establish what customers stand to gain from a solution, then make owning that solution as frictionless as possible for the customer.

**Be user-friendly.** With the Metal platform comes many new concepts and a lot of new information for customers to learn. The average user is not an ML expert, so it’s important to make Metal as simple and approachable as possible—from the platform, to APIs, to documentation.

**Always iterate.** Continuous improvement > delayed perfection. AI is a fast-moving space, and uncovering the most value for customers lies at the frontiers of what’s currently possible with technology. Launching updates every day allows this to happen.

### Team

At the time of writing, Metal’s team consists of the three founders—Taylor, Sergio and James—and two engineers. Being a small startup, everyone wears many hats, but Taylor focuses on sales and marketing, Sergio works on the back-end technology with their founding engineer, and James handles the front-end and developer experience. Everyone is focused on product.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/3061a751-f4fb-49e1-a9b1-cef228fdc2a1/Pilot_SF_2023_Half_304__1_.jpg)

<small>Left to right; Sergio, James, Taylor</small>

### Funding

Metal raised $2.5M in May 2023 and announced the raise in July 2023. Its lead investors are Swift Ventures, Y Combinator, and ChapterOne.

## Origin

The genesis of Metal goes back to 2019, when Taylor, Sergio and James were all working at the same startup in NYC and experienced first-hand how raw machine-learning (ML) technology was at the time.

Sergio and Taylor had been tasked with working on a new feature to classify support tickets using the recently-launched [BERT](https://en.wikipedia.org/wiki/BERT_\(language_model\)?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal) family of language models.

A far cry from the “mature” stack they were used to working with, the feature took them a painstaking ~6 months to get out the door. In that time, they’d built an ingestion pipeline from scratch, maintained live datasets for each customer, and built real-time observability features—projects that, today, you could build far quicker.

“Although the process was slow, it was a great learning experience. We’d seen how powerful ML technology was, but also realised how lacking the developer experience and available tooling/infrastructure could be. Getting to production had been really difficult. The experience stuck with us.”

18 months later, the startup was acquired by Meta and tech stocks were plummeting. Layoffs were soon announced, and Taylor was one of the first to be let go. Seeing this as an opportunity for change, James and Sergio quit shortly after. The three of them were now free to go all-in on their initial idea for Metal. They applied to Y Combinator, got in, and booked flights to San Francisco to join the W23 batch.

### Landing on an idea

Initially, Taylor, Sergio and James designed Metal as a product feedback tool. Organisations often have a tonne of unstructured data floating around containing valuable product insights, like emails, support tickets, sales call notes, and so on. The founders wanted to build connectors between these unstructured sources, using available ML tools to help summarise and organise the feedback for product teams.

Unexpectedly, testing this idea for a few weeks invalidated their initial assumptions and they decided to pivot. What came next were some long days and nights of soul searching, sprinkled with a little panic!

The trio pressed on, testing lots more ideas—sometimes several a day. But they kept coming back to their painful experiences building with ML. Something was resonating; with the surge of new LLM tools, it was highly likely other developer teams would go through what Sergio and Taylor had. Many software engineers would be tasked with building AI/LLM features into products while lacking the hands-on ML experience needed to execute efficiently.

So they had arrived at their idea for Metal: to build a tool to help developers create AI-based features, and even make ML technology a joy to work with.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/6cdab5e4-02d4-43b4-a2d1-cfa422d2bdfe/Group_481.png)

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/cb694713-59a2-4ed6-8b4c-d5bd05f0c9ef/Screen_Shot_2023-08-09_at_2.28_1.png)

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/bd61d2cd-3e17-496f-a717-a91a1b4e512b/Screen_Shot_2023-08-09_at_2.31_1.png)

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/eae58935-b288-4cfb-828a-2c4e6bb0fbe7/Screen_Shot_2023-08-09_at_4.42_1.png)

## Building, shipping and iterating

### Tech stack

The Metal team got up and running quickly using Node.js and [AWS Cloud Development Kit](https://aws.amazon.com/cdk/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal); specifically ECS for services along with AWS tools like Lambda, S3, SNS and SQS. Now that their product is growing, they’ve invested for performance, building in Rust and Go almost exclusively, and building a self-hosted version of Metal using more cloud agnostic tools like Redistreams.

In terms of AI models, the team use OpenAI's **ada** (API) and **CLIP** (self-hosted) for [embedding generation](https://platform.openai.com/docs/guides/embeddings?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal). More recently though, noticing a higher demand for open-source models hosted by their customers, the team is working to add more OSS embedding models such as **instructor-xl** and sentence transformers.

### Shipping new features

At Metal there are two camps for generating and prioritising new product ideas: developer experience and long-term bets.

“Much of the developer experience comes from direct customer feedback. We pride ourselves on taking an active role with customers, often helping them at the code level if it helps accelerate their understanding of the stack and how to get the most out of it. Being so involved means we get a lot of first-hand feedback for the product. We prioritise features that directly address this client feedback.”

Working so closely with users also highlights common customer pain points that the team can then cater for in new product features. Like chatbots, which have proved to be a popular use-case (the team found themselves building one for almost every customer). Realising their popularity, the team decided to [open-source the chatbot product](https://github.com/getmetal/chatbot?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal), making it that much faster for users to go live with Metal.

Prioritising new ideas in terms of long-term bets centres around how the team believes the platform can be extended to support use-cases that are 1-2 steps ahead of the current product. The founders didn’t start an AI company because of the hype. They started it because they truly believe in the power of ML technology and the need for developer support. Creating what dev teams need to get to production has meant that Metal has evolved into an end-to-end LLM developer platform covering everything from data transformation (embedding generation, chunking, metadata extraction) and storage (vector storage, indexing) to querying (search, metadata filtering, chatbots) and observability (index analytics, query logs).

Metal’s primary KPI is the number of live apps on production.

### Overcoming challenges

Dealing with OpenAI outages has been a particularly challenging issue for the Metal team. Since many of their users rely on OpenAI models to generate embeddings, when OpenAI is down, those users can’t ingest new data into their system. To mitigate this, the team added redundancy with Azure and OpenAI, which has significantly improved availability and reliability for users. They also have multiple fallbacks in place should a model become unavailable.

All of Metal’s embedding generation calls are done using a private endpoint that is far more durable than a public one, further increasing availability for users.

## Customers

To date, Metal’s clients are mostly made up of financial service providers, marketing and PR agencies, customer support providers, and real estate software companies. Many come to Metal initially looking for “chat with your \[X]” applications, but go on to build other features too.

Metal has helped its financial services clients improve research velocity, produce generative industry and company analyses, and create generative investor memos. Given the amount of time and resources these clients typically spend on such work, using AI in this way has had a tangible impact.

Marketing and PR agencies have used Metal to streamline RFPs/RFIs, query archived work via a chat experience (e.g. “show me sports apparel projects from 2020 onward”), or produce generative copy to help creative teams with messaging.

Customer support and real estate are industries well-suited to Metal’s chat experiences, using Metal to handle everything from support tickets to making knowledge base articles or FAQs easier to find and digest. An example is Lastro, a real estate marketplace in Sao Paolo, who first [built a chatbot with Metal](https://getmetal.io/posts/11-lastro-chat-case-study?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal) as an experiment. After initial release, their Metal-powered chatbot gained 2k users in a week. At the end of the month it was over 5k (and is still growing!). Lastro’s team is highly technical, so to see them getting so much value from the platform was a huge win for the Metal team.

## Looking forward

### Company goals

Metal’s long-term goal is to be the default choice for LLM application developers at scale. They plan to achieve this by giving their clients easy access to the infrastructure and APIs needed to power their work, wrapped up in a best-in-class developer experience.

Beyond that, as the team continues to learn and solve more problems with real world deployments, they envisage focusing, rather than broadening, their offering.

“We see lots of potential for specialisation: focusing on specific workflows, verticals, or problem sets rather than a completely horizontal approach. Specialisation will help us create a durable business; in this market, much of the core AI technology will be commoditised over the coming years (creating a personalised chatbot has already lost some of its novelty, for example). We believe companies that have a more niche focus will have an advantage in the future.”

From an internal perspective, Metal’s founders seek to build a team of people who are trusted to do their best work because they're inherently curious about and enjoy doing it. They’re inclined to keep the team small, partly because that’s been their experience so far, but also so they can spend more time with each employee making sure things are properly calibrated.

But whether the team stays small or ultimately grows to be in the thousands, one belief will remain:

Companies are ultimately groups of people—people who are capable of creating amazing things— and it’s our responsibility to create a culture that unlocks that capability. We believe good companies are multipliers of people’s abilities—not the other way around.”

### The future of AI

In terms of moving AI forward, the Metal team believes the biggest priority for the space is to elevate AI from theory and prototyping to real-world deployments.

“We see enterprise deployments being one of the most valuable market segments in the future, but to get there, more real-world applications at enterprise scale need to be built in order to inspire other businesses. Companies should also lean into augmentation over replacement. Github Copilot is a great example: it’s garnered massive adoption because the platform help developers *complete* their thinking rather than replace it. Using AI for augmentation keeps humans in the loop and sets the right expectations for the technology.”

The Metal founders are also excited by companies that are helping build trust in AI and taking actions such as controlling LLM outputs, giving users trust through source attribution, and flagging hallucinations.

Thanks to the [Metal](https://getmetal.io?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal) team for contributing to this post. Contact info below if you want to connect with them:

- [LinkedIn](https://www.linkedin.com/in/taylorlowe11/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal)

- [Website](https://getmetal.io/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal)

- [Twitter](https://twitter.com/Metal_io?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-metal)

- [Email](mailto:sales@getmetal.io)
