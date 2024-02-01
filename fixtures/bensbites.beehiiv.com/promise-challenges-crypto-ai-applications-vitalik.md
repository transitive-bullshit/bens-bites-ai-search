# The promise and challenges of crypto + AI applications by Vitalik.

[Vitalik Buterin wrote a post on how AI and Crypto can come together.](https://vitalik.eth.limo/general/2024/01/30/cryptoai.html?utm_source=bensbites\&utm_medium=referral\&utm_campaign=the-promise-and-challenges-of-crypto-ai-applications-by-vitalik) Now, I’m neither an AI engineer nor a crypto expert. But I tried to highlight Vitalik’s points on what applications are possible, what are dangerous and general thoughts without going into the technical jargon.

- *In cryptography, open source is the only way to make something truly secure, but in AI, a model (or even its training data) being open greatly increases its vulnerability.*

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/ac813ea2-bcf3-49b2-9bbb-da3c0a6db37a/image.png?t=1706710021)

## How can AI interact with blockchains:

1. **AIs participating in human-designed systems (most possible)**

Vitalik gives examples of AI bots doing arbitrage or using AIs to make low-stakes predictions. The incentive to make one prediction right is not that high but the incentive to make generally right predictions is.

Hence, AI leaderboards should emerge. But instead of a centralized entity declaring which decisions made by these AIs are wrong or right, these leaderboards should be decentralized and governed by blockchains (for the proof of the process).

2. **AI as an interface to blockchain/crypto usage: (high potential but some risks are there)**

AI can explain what you’re doing on the blockchain in user-friendly terms. What kind of dapp you’re using, what are the results of this transaction, what does this smart contract really mean etc?

More advanced AIs combined with traditional safety check can explain if a scam was detected or whether a particular token is genuine.

The issue here is that if any wallet uses such AI, both good and bad actors have access to it, so the scams can be designed to not trigger the AI’s checks. So, it goes back to the cat and mouse game of cybersecurity in general. Again, using multiple safety-based AIs which are competing with each other to get better can help here.

3. **AI acting as a judge, as a part of a smart contract. (most risky)**

If a blockchain-based smart contract or a DAO needs to make a subjective decision, could you make an AI simply a part of the contract? There are two potential troubles in doing that:

*a) Computation overload of crypto + AI*could be much higher (and maybe not possible as of now). Much of the AIs are matrix multiplications and it’s likely that overhead would be low there but s small part of the system has non-linear layers, which are the greatest bottleneck.

*b) Attacks on the AI system* are very likely (even if the AI is a block box). To counter these kinds of black-box attacks, we can limit who or what can query the model and how much. Black boxes with unrestricted API access are not secure; black boxes with very restricted API access may be.

Also, we can hide the training data, while preserving confidence that the process used to create the training data is not corrupted. "DAOs to democratically govern AI" might actually make sense: we can create an on-chain DAO that governs the process of who is allowed to submit training data, who is allowed to make queries, and how many, and encrypt the entire pipeline from training input to each query’s final output. This DAO could also help with compensating people for submitting data.

4. **Creating a scalable decentralized private AI as the main goal. (ambitious)**

Why? To have democratic governance of systemically important AIs. From an AI safety perspective, this could create a decentralized AI that also has a natural kill switch, which could limit queries that seek to use the AI for malicious behaviour.

Also, we can also use crypto incentives (decentralized, secure, ZK verification) to incentivize making better AI without going down the full rabbit hole of using cryptography.

## Conclusion:

In general, use cases where the underlying mechanism continues to be designed roughly as before, but the individual players become AIs, allowing the mechanism to effectively operate at a much more micro scale, are the most immediately promising and the easiest to get right.

The most challenging to get right are applications that attempt to use blockchains and cryptographic techniques to create a "singleton": a single decentralized trusted AI that some applications would rely on for some purpose.
