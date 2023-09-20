# Microsoft researchers accidentally exposed 38TB of private data

[Microsoft researchers accidentally exposed 38TB of private data](https://www.wiz.io/blog/38-terabytes-of-private-data-accidentally-exposed-by-microsoft-ai-researchers?utm_source=bensbites\&utm_medium=referral\&utm_campaign=microsoft-researchers-accidentally-exposed-38tb-of-private-data), includingpersonal computer backups of Microsoft employees. It contains secrets, passwords, and**30,000 internal messages**. The culprit?**Misconfiguring access controls**when publishing open-source training data on GitHub.

## What's going on here?

Microsoft researchers accidentally leaked private data while trying to share open AI models on GitHub.

![](https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/a811c2f6-feae-428e-9bc8-501619a3f07e/1695041345-04-teams.jpeg)

## What does this mean?

Microsoft's AI team published some open-source AI code on GitHub and told people to download training data from a link. But that link accidentally gave access to 38TB of private Microsoft data, including employee computer backups with passwords, keys, Teams chats, etc. This happened because the link used a feature called SAS tokens, which can share Azure storage data. The researchers configured the token wrong, so it shared too much. This shows how AI teams now have extra security risks as they work with so much data.

## Why I should care?

This example shows new data security risks as companies use more AI. Sharing lots of data for AI training can lead to leaks if security teams don't guide researchers properly. Also, AI models themselves can be hacked if they aren't reviewed well, which can spread malware. As AI spreads, security teams need to work closer with researchers to prevent issues like this leak.
