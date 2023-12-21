# How Deel uses AI in its business

![Author](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/user/profile_picture/fc858b4d-39e3-4be1-abf4-2b55504e21a2/thumb_uJ4UYake_400x400.jpg)

[Ben Tossell](https://bensbites.beehiiv.com/authors/fc858b4d-39e3-4be1-abf4-2b55504e21a2)\
December 21, 2023

👋Hey, this is Ben with a**🔒**subscriber-only issue**🔒**of Ben’s Bites Pro.A weekly newsletter covering AI trends, ideas, business breakdowns and how companies are using AI internally.

# How Deel uses AI in its business

I’m exploring how businesses are using AI and am excited to bring you a deeper look at how Deel is implementing it internally and rolling it out to customers.

[Deel](https://www.deel.com/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-deel-uses-ai-in-its-business)is an all-in-one HR platform that guides businesses through the complex maze of international payroll and compliance. Founded in 2018 by Alex Bouaziz and Shuo Wang, the company operates in more than 150 countries and employs 3,000 team members globally. They’re headquartered in San Francisco.

A big thank you to[Aaron Goldsmid](https://www.linkedin.com/in/aarongoldsmid/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-deel-uses-ai-in-its-business), Deel’s Head of Product, for spending time with me and answering my (many) questions.

What stood out to me the most from this conversation;

- By building solutions for internal problems, you can also solve customer problems

- The thinking around building your own LLM, training an LLM or using off-the-shelf

- How a build versus buy mentality in a company’s DNA changes your approach

- Looking past reactive applications of AI into proactive ones to help businesses grow

- How to determine what work should be offloaded to LLMs

- The importance of your data, accuracy and avoiding hallucinations

## Where they started

Hiring and compliance can be a minefield in today’s remote-first, post-covid world. Hiring is complex enough, but add in different countries, taxes, government policies, contractors vs payroll employees yadda yadda, and suddenly companies hiring remotely have a complex set of challenges to deal with.

HR platforms and employment workspaces are very ops-heavy. One of the key things to scaling is automating all of that.

That’s what Deel’s platform does. And it’s working.

*Deel (last valued at $12 Billion) has raised over $675M and grown to $400M Annual recurring revenue. Deel in January said its ARR had reached $295 million, up from $57 million at the end of 2021.*[*source*](https://www.theinformation.com/articles/deel-hits-400-million-in-annual-recurring-revenue-as-rippling-rivalry-grows?rc=bdorru\&utm_source=bensbites\&utm_medium=referral\&utm_campaign=how-deel-uses-ai-in-its-business)

That growth is insane.

To automate as much as possible, they’ve been integrating AI into how they do things internally for a long time. Some of the boring ways (Aaron’s words) they’ve used AI over the years include:

- Completing forms

- Reading forms

- Identifying receipts

- Looking for anomalies in terms of fintech crimes

"These are things that have been done for 10 years. And now because we’re calling it AI, it’s sexy. But it’s not really.”

They aren’t the kind of AI applications that we’re referring to nowadays. These ‘old-world’ AI solutions are largely automating routine, rule-based tasks. Today's AI is characterised by its ability to handle complex, unstructured data, learn from it, and provide insights and solutions that were previously impossible.

## Discovering the right problem to solve

Deel operates in over 150 countries. That’s over 150 different compliance rules, tax policies, HR systems etc. The amount of information they have to handle is impossible for any human.

But Deel needs to be really good at it.

Finding the right answers quickly was, understandably, a challenge for employees.

Suppose an employee wants to know what the rollover vacation policy is in the UK and they’re asking the manager sitting in California. It takes time and resources to look up this information.

“This kind of situation isn't great because it takes your HR professional, or really anyone in an organisation, out of the conversation they want to be having with an employee. I am a manager. It took me out of the conversations that I wanted to be having about employees who want to keep engaged, keep excited - to be talking about how to grow our business instead.”

So they thought about what they could build here.

With their small army of compliance lawyers and tax professionals, the team spent months building a knowledge base - something they believe is now the greatest corpus of work-employment-tax-compliance knowledge on the planet.

“What we realised is that this was something that the world, our clients, our workers and our own internal organisation really needed”.

The knowledge base was built on the same framework as Wikipedia. And what that looks like to a user is essentially an accurate work-employment-tax-compliance search engine.

So now, a manager with questions to answer can go to this tool, type in ‘rollover vacation policy UK’ and boom, the answer is right there. Within a couple of seconds, there’s a response versus three or four steps of looking it up, checking with another teammate etc.

Deel tested hundreds of thousands of these queries before they exposed them directly to their first clients.

In testing internally, whenever an employee got a bad answer or no answer at all, they could downvote it. Their content team had a 24-hour SLA (Service Level Agreement) to create an answer and then have it vetted by their compliance professionals for accuracy.

“We have a content creation team that has a 24-hour SLA to create that answer and have it vetted by our compliance professionals which by the way is super cool, because we found out all the gaps.”

## Building an LLM or using off-the-shelf

I asked Aaron why they used OpenAI over building their own LLM.

It was part-strategic, part no-brainer.

## Subscribe to Ben's Bites Pro to read the rest.

Become a paying subscriber of Ben's Bites Pro to get access to this post and other subscriber-only content.

[Upgrade](https://bensbites.beehiiv.com/upgrade)

Already a paying subscriber? [Sign In](https://bensbites.beehiiv.com/login)
