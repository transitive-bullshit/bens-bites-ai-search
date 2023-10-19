# Startup profile: Autoblocks

### A platform helping businesses dealing with large-scale user data to better monitor their LLM-powered products.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/d30c5a1d-649d-44ff-8f7f-78b90301ef03/image.png)

Autoblocks is a platform helping businesses dealing with large-scale user data to better monitor their LLM-powered products. It allows engineering and product teams to debug error types, test code changes, and fine-tune datasets.

The company was founded in the spring of 2023 by brothers Haroon and Hamza Choudery, and Adam Nolte.

Together with their founding engineer, the [Autoblocks](https://www.autoblocks.ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks) team caters mostly to businesses looking to gain a competitive advantage by creating differentiated LLM-powered products.

## Company info

### Values

**Customers are the compass.** Committed to customer obsession, they make every decision with their customers' success in mind. All team members engage with users, understand their needs, and innovate on their behalf.

**Compete for existence every day.** In a rapidly changing market, the Autoblocks team avoid complacency by striving to innovate and deliver value daily. Waiting for opportunities < actively seeking challenges to fuel growth.

**Excellence in everything.** Strive to exceed expectations in every aspect of the work. Excellence isn’t just a goal; it’s a habit.

**Embrace a growth mindset, prioritising learning over ego.** Abilities can be developed. Approach work with humility and a growth mindset. Take on challenges and find imaginative solutions.

**Communication is a gift.** Transparency and effective communication are the Autoblocks pillars. The team shares openly, provides clear information, and encourages stakeholder input to foster understanding and drive innovation.

### The team

There are three founders—Haroon, Adam, and Hamza—along with a founding engineer. Haroon and Hamza specialise in growth and strategy, while Adam collaborates with the founding engineer on building the platform. Collectively, the team maintains a product-oriented focus.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/07b5f256-76ca-4ef4-8b62-51b7d4f5a23f/image.png)

<small>From left to right: Hamza, Haroon and Adam</small>

### Funding

Autoblocks raised $2m in April 2023. Its lead investors are The House Fund and Kyber Knight Capital.

## Origin

### Identifying a gap

At the time of Autoblocks’ inception, Haroon was running [Not A Bot](https://notabotai.substack.com/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks)—a daily AI newsletter that has over 50k subscribers today. He met pioneers in the generative AI space, such as Amjad Masad of Replit and May Habib of Writer. Through these meetings, Haroon noticed the same pain-point coming up time and again: companies dealing with large-scale user data and facing challenges in effectively monitoring their LLM-powered products.

Having worked as an ML engineer before, Haroon identified a significant gap. He could see that existing observability and MLOps solutions weren’t tailored to the unique challenges posed by generative AI models. In response, he set out to build Autoblocks with the aim of creating a comprehensive workflow tailored for developers and product teams working on LLM-powered products.

“During my conversations with leaders in the space, I also learned that companies weren’t building these experiences in a single, cookie-cutter way. We focused on making Autoblocks adaptable enough to work with any codebase or tech stack whilst equipping them with the building “blocks” to understand and improve their gen AI products.”

### Autoblocks today

Today, Autoblocks is a proxy-less solution for monitoring, testing, and fine-tuning gen AI-powered products. Users simply install the SDK and start sending event data from their product to the platform.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/13f3bf36-f3f3-475a-9a8d-a24f750c44ef/image.png)

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/d8719b83-c5dd-4850-b0a6-c2543bf554a7/image.png)

Although the platform is versatile enough to support numerous use cases, here are some of the most common:

- **Debugging:** Powerful search and filtering tools let users browse through trace and log data. Events are grouped by traces, making it easier to understand what’s happening "under the hood" during each user interaction.

- **Testing & experimentation:** Engineering teams can use Autoblocks to run simulations for each version of their product, using historical data as inputs, to get a holistic understanding of how code changes affect each stage of their AI pipeline. Autoblocks enables experimentation too. This allows teams to refine user experiences by A/B testing different parameters to their AI models (prompts, context retrieval, and more).

- **Dataset curation for fine-tuning:** Autoblocks is designed to manage millions of events per day. It collects comprehensive telemetry data from users, then helps them create high-quality fine-tuning datasets by filtering down to the input-output pairs that drove desired outcomes.

- **Advanced analytics:** Users have access to collaborative dashboards for real-time insights into their products. These dashboards are used to visualize important KPIs, from average latency to the percentage of negative user feedback.

## Building, shipping and iterating

### Engineering infrastructure

The Autoblocks team relies on serverless infrastructure to enable seamless autoscaling as they are growing quickly. Their [event ingestion pipeline](https://www.autoblocks.ai/blog/scaling-our-ingestion-api-from-0-to-1-million-events-per-day?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks) utilizes Cloudflare Workers as the global entry point and AWS Simple Queue Service to send messages to AWS Lambda for processing.

Event data is stored in ClickHouse, enabling real time analysis of millions of events in their web application which is hosted on Vercel.

Behind the scenes, the team relies heavily on Github Actions to continuously test and deploy new version of the platform to production. They also dogfood extensively and use Autoblocks to monitor and improve the platform.

### AI models

The Autoblocks team uses their simulate and experimentation capabilities to continuously test and experiment with new AI models. They typically start with Azure’s OpenAI models, then once they’ve built a comprehensive dataset, they use Autoblocks to explore experimenting with other foundation models, fine tuning, or training open source models. They will then run A/B tests to compare performance and iterate from there.

### **Shipping new features**

For Haroon and his team, the process of shipping new features is thorough and user-centric. First, they identify a need through hypotheses, which are then validated through user conversations or surveys. Following validation, the team creates a Product Requirement Document (PRD), paving the way for the technical approach and UI/UX design. After deployment, the iteration continues with analysis of product usage data to identify areas for improvement.

Autoblocks’ primary metric is MRR, with the total number of active users serving as a secondary KPI. Since Autoblocks works best when users send in a significant volume of event data, the total number of events ingested serves as a tertiary KPI.

## **Overcoming challenges**

Navigating a saturated market and articulating their unique value proposition has been an ongoing challenge in Autoblocks’ journey to-date.

“Market saturation is a challenge we relish, however it can result in an inconsistent vocabulary for core concepts. Establishing a common vernacular can be a point of friction in comms for us.”

In terms of industry challenges, Haroon has advice to others launching startups in the AI space:

“The AI industry is advancing quickly and it’s easy to get distracted by trends and buzz. My advice for other founders looking to save time and energy is: stick to a first-principles approach and maintain a strong focus on meeting customer needs.”

### **Customers**

The use-cases where Autoblocks is being deployed are wide and varied. Where it’s having significant impact is in debugging and experimentation, where Autoblocks is increasing developer productivity more than 3x, as reported by some users.

Notably, [Gamma](https://gamma.app/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks) (a Ben’s Bites portfolio company) has significantly [improved its user experience](https://www.autoblocks.ai/blog/gamma-case-study?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks) by leveraging Autoblocks' debugging and testing workflows.

## Looking forward

### Company **goals**

Looking ahead, Haroon sees Autoblocks becoming an indispensable ally for businesses as Large Language Models (LLMs) and AI become integral components of products.

“We anticipate that LLMs and AI will become integral components of most products in the near future. We see natural language as the next frontier in advancing human-computer interaction. With this vision, we aim to enable businesses to forge engaging and delightful interactions between end users and AI-powered services.”

### **The future of AI**

Haroon's opinion on the AI space more broadly? “The rapid pace of innovation in this space has been both exhilarating to watch and participate in”, he says.

In terms of their “AI wishlist”, the Autoblocks team say they would love to see more startups enter the application layer.

“While some experts believe that established companies will monopolise the application layer, our experience working with inventive startups (like Gamma) suggests otherwise. The market will always have room for agile and determined startups to succeed.”

Thanks to the Autoblocks team for contributing to this post. Contact info below if you want to connect with them:

- [LinkedIn](https://www.linkedin.com/in/haroonchoudery/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks)

- [Website](https://www.autoblocks.ai/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks)

- [Twitter](https://twitter.com/autoblocksai?utm_source=bensbites\&utm_medium=referral\&utm_campaign=startup-profile-autoblocks)

- [Email](mailto:support@autoblocks.ai)
