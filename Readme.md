# TLS-Certificate Checker

## Why this application ?

I wanted to learn more about how TLS Certificate interacts with node clients when we make any web-application or do web surfing in general.The purpose was to curate a tool which can ensure you can get the essential details of any host that you want to.


## How can we start this application ?

Well I started to create it as a full-stack project with a lot of features but halfway I realised the people who would want to use such an application are definitely on the Command Line more than the Graphical Interface and it does make sense too.

Just perform the following function 

`npx tls-checker <"hostname">  <"port">`

If you don't specifically write a port , the application logic assumes it's 443 , standard HTTPS.

## What more do I plan to do ?

Well what i've built right now , was something that i wanted to explore about. Exploration never ends and so does innovative Ideas.

- [ ] Certificate Score Functionality
- [ ] Cipher Suggestions for the current host.
- [ ] Batch domain via .txt files

Moving forward I would love to add these features in the later versions.