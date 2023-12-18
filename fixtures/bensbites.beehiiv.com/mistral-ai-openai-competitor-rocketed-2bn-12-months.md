# How Mistral AI, an OpenAI competitor, rocketed to $2Bn in <12 months

![Author](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/user/profile_picture/fc858b4d-39e3-4be1-abf4-2b55504e21a2/thumb_uJ4UYake_400x400.jpg)

[Ben Tossell](https://bensbites.beehiiv.com/authors/fc858b4d-39e3-4be1-abf4-2b55504e21a2)\
December 14, 2023

👋Hey, this is Ben with a**🔒**subscriber-only issue**🔒**of Ben’s Bites Pro.A weekly newsletter covering AI trends, ideas, business breakdowns and how companies use AI internally.

Today I’m diving deep into**Mistral AI**, who are making headlines after recently closing their (huge) Series A round. Launched just 7 months ago, they’re disrupting the LLM market. I want to look at how they’re doing it - and how you can take advantage.

This post covers:

- What is Mistral?

- Who’s behind it?

- The timeline: What’s happened to date

- Fundraising

- Product Overview

- A peek inside their seed deck👀

- Roadmap analysis. Are they achieving what they set out to do?

- 5 big reasons Mistral’s making waves🌊

- How people*actually*use Mistral

- Opportunities and how you can take advantage

  - What developers think of Mistral

# What is Mistral?

A French startup that develops fast, open-source and secure language models. Founded in 2023 by Arthur Mensch, Guillaume Lample, and Timothée Lacroix.

They’ve raised over $650M in funding, are valued at $2Bn, are less than a year old and have 22 employees.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/a81e1f71-5ab1-469f-a4fa-db1461c3bbe7/Screenshot_2023-12-12_at_09.37.59.png?t=1702498751)

<small>monthly search volume for ‘mistral ai’</small>

The company is important for a few reasons;

- It’s*actually*open-source, you know like OpenAI was supposed to be? Or how LlaMA by Meta kinda is but isn’t?

- It’s developed 2 AI models in less than a year.

- It’s French.

The founders are 3 researchers from DeepMind and Meta who aimed to beat GPT 3.5 by year-end. And they did.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/eccd7513-6bc9-4344-9474-c8b8a881275d/Mistral_Experts_Overview.jpeg?t=1702498966)

They started a new company, Mistral AI, in May 2023 and had the biggest seed round in the EU within 4 weeks.

# Who’s behind it?

Mistral’s CEO Arthur Mensch was at Deepmind for a little less than 3 years where he worked on research around the retrieval-based models, sparse mixture of experts and then co-authored the famous Chinchilla paper on the scaling laws of LLMs.

So he’s legit.

CTO Timothée Lacroix and Chief Scientist Guillaume Lample were at Meta. They both have nearly a decade of experience in research. And, they had just been part of the team behind Meta’s own LLM, LLaMA in February.

Also legit.

# The timeline

Here’s a quick rundown of what’s happened since then:

- **June 13 2023**-[Seed Funding](https://techcrunch.com/2023/06/13/frances-mistral-ai-blows-in-with-a-113m-seed-round-at-a-260m-valuation-to-take-on-openai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)of $113M.

- **Sept 27 2023**- Their first model[Mistral 7B](https://mistral.ai/news/announcing-mistral-7b/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)released (via a torrent link onTwitterX).

- **Dec 8 2023**- Mixtral 8x7B MoE released—their second model, again released via a[torrent link](https://x.com/MistralAI/status/1733150512395038967?s=20\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months).

- **Dec 11 2023**- Launch of its API and developer platform. Followed by the news of its[Series A ($415M)](https://techcrunch.com/2023/12/11/mistral-ai-a-paris-based-openai-rival-closed-its-415-million-funding-round/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)plus debt financing ($130M) by NVIDIA and Salesforce.

Let’s take a quick look at those rounds because they are eyewatering…

# Fundraising

### Mistral’s Seed Round:

The first funding round took place on 13th June 2023. The company raised $113 million, led by Lightspeed Venture Partners.

Other participants included Redpoint, Index Ventures, Xavier Niel, JCDecaux Holding, Rodolphe Saadé, Motier Ventures, La Famiglia, Headline, Exor Ventures, Sofina, First Minute Capital, and LocalGlobe. Notably, French investment bank Bpifrance and former Google CEO Eric Schmidt were also shareholders.

**This funding round valued Mistral AI at $260 million**.

### Mistral’s Series A Round:

The Series A round was announced on 11th December 2023. In this round, Mistral AI raised $415 million, led by Andreessen Horowitz.

Other participants included Lightspeed Venture Partners, Salesforce, BNP Paribas, General Catalyst, Elad Gil, Conviction, and others. Crunchbase also differentiates Nvidia and Salesforce as debt investors with an additional $130M.

**This funding round valued the company at approximately $2 billion.**

# Product Overview

### Mistral 7b

A 7B dense transformer, fast-deployed and easily customisable. Small, yet powerful for a variety of use cases. Supports English and code, and an 8k context window.

### Mixtral 8x7B MoE

A 7B sparse Mixture-of-Experts model with stronger capabilities than Mistral 7B. Uses 12B active parameters out of 45B total. Supports multiple languages, code and 32k context window.

It comes in 3 versions:

- tiny

- small

- medium

### Embedding

State-of-the-art semantic embeddings from text chunks. Powers your RAG application.

### Generation

Efficient chat-based API for text generation, using our open and optimised models under the hood.

You can play with it on;[Together’s Playground](https://api.together.xyz/playground/chat/DiscoResearch/DiscoLM-mixtral-8x7b-v2?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months),[Perplexity](https://labs.perplexity.ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months),[Vercel](https://sdk.vercel.ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months),[Langchain’s Langsmith](https://smith.langchain.com?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)and[Hugging Face](https://huggingface.co/spaces/openskyml/mixtral-46.7b-chat?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months).

To use the official API[check out their docs](https://docs.mistral.ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months), plus available on[Together](https://www.together.ai/blog/mixtral?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months),[Anyscale](https://www.anyscale.com/blog/anyscale-endpoints-json-mode-function-calling-new-models-llama-guard-and-mistral-7b-openorca?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months),[Replicate](https://replicate.com/nateraw/mixtral-8x7b-32kseqlen/api?tab=nodejs\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months),[Perplexity](https://docs.perplexity.ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)and many others.

# A peek inside their seed deck👀

Their seed deck has been floating around the internet. Which you can view[here](https://drive.google.com/file/d/1gquqRqiT-2Be85p_5w0izGQGgHvVzncQ/view?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months).

And there are a few things to mention specifically.

They believe the most value is in the hard-to-make tech e.g. the models themselves. Trained on powerful machines, trillions of words, high-quality sources—which is one barrier to entry.

The other barrier? A talented (and capable) team.

There were a few others on the team at the time of the first raise:

- [Jean-Charles Samuelian](https://www.linkedin.com/in/jcsamuelian/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)- CEO of[Alan](https://alan.com/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)(looks like he is a Co-Founding advisor & Board Member at Mistral)

- [Charles Gorintin](https://www.linkedin.com/in/charles-gorintin/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)- CTO of[Alan](https://alan.com/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)(also Co-Founding Advisor at Mistral)

- [Cédric O](https://www.linkedin.com/in/cedric-o/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)- Former French Secretary of State for Digital Affairs (also Co-Founding Advisor at Mistral)

Continuing through their deck…

“All major actors are US-based”.

The Mistral team wanted to cement itself as the European leader.

**Closed-source vs open-source**. The big debate.

Mistral believes (as do many others, myself included) that there are several concerns with closed AI approaches; businesses have to send sensitive data to it, only exposing the outputs doesn’t help connect with other components (retrieval, structure inputs etc) and the data used to train the models are secret (so we assume it can do some things it perhaps hasn’t been trained on).

Now the bold stuff.

“Mistral will offer the best technology in 4 years”.

How?

- They’ll take a more open approach to model development.

- Tighter integration with customers’ workflows.

- Increase focus on data sources and control.

- Propose unmatched guarantees on security and privacy.

There’s a lot more detail in their[deck](https://drive.google.com/file/d/1gquqRqiT-2Be85p_5w0izGQGgHvVzncQ/view?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-mistral-ai-an-openai-competitor-rocketed-to-2bn-in-12-months)on the above 4 points.

As far as business focus goes…

“On the business side, we will provide the most valuable technology brick to the emerging AI-as-a-service industry that will revolutionise business workflows with generative AI. We will co-build integrated solutions with European integrators and industry clients, and get extremely valuable feedback from this to become the main tool for all companies wanting to leverage AI in Europe.”

# Roadmap analysis

Let’s look at their roadmap (remember this was from pre-June) and see what they planned on doing compared to what has happened.

## Subscribe to Ben's Bites Pro to read the rest.

Become a paying subscriber of Ben's Bites Pro to get access to this post and other subscriber-only content.

[Upgrade](https://bensbites.beehiiv.com/upgrade)

Already a paying subscriber? [Sign In](https://bensbites.beehiiv.com/login)
