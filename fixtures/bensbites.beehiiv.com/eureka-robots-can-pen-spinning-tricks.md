# Eureka, the robots can do pen spinning tricks

[Nvidia has developed a new AI agent, Eureka](https://eureka-research.github.io/?utm_source=bensbites\&utm_medium=referral\&utm_campaign=eureka-the-robots-can-do-pen-spinning-tricks), to teach robots complex skills like pen-spinning. Eureka allows robots to learn skills similar to humans by writing customized reward algorithms for trial-and-error reinforcement learning.

## What’s going on here?

The Eureka AI system can rapidly teach real-world skills to robots by writing automated reward functions.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/3194a0e5-c599-47b4-8dcc-be41a5b8105f/image.png)

## What does this mean?

Eureka uses GPT-4 to write automated reward functions. Without needing specialized prompting or templates, Eureka can generate reward functions that outperformed human-written ones over 80% of the time, improving robot performance by over 50% on average.

Leveraging GPU-accelerated simulation in Nvidia’s Issac Gym, the system can swiftly test reward algorithms and constantly refine based on results. Eureka can be used to teach a diverse set of skills, like opening cabinets, tossing balls, and dexterous pen-spinning tricks to all types of robots, from robot arms to humanoids.

## Why should I care?

Reward functions are chocolates for doing the right thing. They help researchers in steering the AI model’s behaviour to meet a desired goal. But writing good reward functions is hard. Eureka’s auto-generated programs could replace tedious and suboptimal human coding, making it far easier to train robots to perform complex real-world tasks.

Another highlight is that a lot of work can be done by combining the emerging tech in different fields (for eg: simulation labs, robotics and LLMs in Eureka’s case).
