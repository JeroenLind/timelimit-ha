# Mail (server) black- and whitelist

## mail server blacklist

### Problem

- some mail servers don't accept mails due to their spam filter
- users blame timelimit for it although their bad mail service is the problem

### Solution

- (external) monitoring
- the blacklist

### Description

The mail server blacklist is a list of servers to which no sign up mails are sent.
But instead of doing nothing, the client is informed about that so that it can tell
the user that this mail service is not supported and that he should use a mail address
at an other mail service.

## mail (server) whitelist

### Problem

- some users do run private server instances
- they do not want that someone else can use their instance

### Solution

- the whitelist

### Description

The whitelist contains mail servers and/ or mail addresses which should be allowed.
Users of mail addresses which are not in the whitelist are informed about that
so that they know that it is a private instance and that they can not use it.
