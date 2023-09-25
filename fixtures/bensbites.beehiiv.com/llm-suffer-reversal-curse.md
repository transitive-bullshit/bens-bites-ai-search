# LLM suffer from the Reversal Curse

Does a language model trained on “A is B” generalize to “B is A”? E.g. When trained only on “George Washington was the first US president”, can models automatically answer “Who was the first US president?”

[A new paper](https://paperswithcode.com/paper/the-reversal-curse-llms-trained-on-a-is-b?utm_source=bensbites\&utm_medium=referral\&utm_campaign=llm-suffer-from-the-reversal-curse) by a team from Oxford University shows they cannot! It’s a serious failure in large language models like GPT-4 that claim to be a reasoning engine.

## What's going on here?

LLMs cannot reverse causal statements they are trained on.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/6010bce6-2436-46ef-aa99-95a641220f0c/image.png)

## What does this mean?

The researchers found that when LLMs are trained on statements like "A is B" (e.g. "Tom Cruise's mother is Mary Lee Pfeiffer"), they fail to deduce the reverse "B is A" (e.g. "Mary Lee Pfeiffer's son is Tom Cruise"). This inability to make basic logical inferences is dubbed the "Reversal Curse". On 1,500 real-world examples of celebrities and parents, GPT-4 answered only 33% of reversed questions correctly versus 79% for forward ones.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/7efcec26-73c6-4bbd-b3aa-834a7307bb21/image.png)

## Why should I care?

[Andrej Karpathy reacted](https://twitter.com/karpathy/status/1705322159588208782?utm_source=bensbites\&utm_medium=referral\&utm_campaign=llm-suffer-from-the-reversal-curse) to this by saying that LLM knowledge is a lot more "patchy" than you'd expect. He still doesn't have great intuition for it. LLMs learn anything in the specific "direction" of the context window of that occurrence and may not generalize when asked in other directions. The "reversal curse" (cool name) is in his opinion a special case of this.

The reversal curse exposes a fundamental flaw in LLMs' training and inference capabilities. If they fail at simple logical deduction, how can we trust their reasoning on more complex issues? It indicates over-reliance on statistical patterns rather than causal understanding. We need to test LLMs in diverse ways to expose their weaknesses.
