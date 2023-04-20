import os
import openai

openai.api_key = ""
response = openai.Embedding.create(
    model="text-embedding-ada-002",
    input="Title: How Does Your Uncommon View on Divorce Affect Your Ministry to Those In Your Church?; Excerpt: And I simply looked them right in the eye, and I said, "We at the church do not have one mind on this, not even the elders. What do you do? You cannot in the church discipline people single-handedly. That's not what church discipline is. Church discipline is when the church acts. So if a church doesn't have a mind of something, it can't act. It can't put somebody out of the church for an act that the church is divided in half over. So we have to find who we are as a church." So what we did is come up with a statement that I and all the elders could agree on. We went as far biblically as we could find one mind together, and then that functions as the way we hold each other accountable. Now, emotionally it's awkward. It is.",
)

embeddings = response["data"][0]["embedding"]

# response = openai.Embedding.create(
#     input="Title: How Does Your Uncommon View on Divorce Affect Your Ministry to Those In Your Church?; Excerpt: Your view on divorce and remarriage is narrower than many other Christians even in your church. How does this affect your ministry to them? Well that's true, and it might be good to just clarify what that means. My understanding is that Christ's ideal for marriage is one man and one woman in covenant as long as they both shall live, so that if a divorce happens that does not free a person to remarry as long as the spouse is living. That's a very minority view. It's not one that is shared by, I suppose, a lot of Christians. But that's where I am. That's my understanding of all the texts in the Gospels, as well as Paul in 1 Corinthians 7, 15 and Romans 7. The way it affects my people is that I preached a series of messages on marriage, and two of them were on this issue.",
#     model="text-embedding-ada-002"
# )

print(response)
print(embeddings)
