import { Answer } from "@/components/Answer/Answer";
import { Footer } from "@/components/Footer";
import { PiperChunk } from "@/types";
import { IconArrowRight, IconExternalLink, IconSearch } from "@tabler/icons-react";
import endent from "endent";
import Head from "next/head";
import Image from "next/image";
import { KeyboardEvent, useRef, useState } from "react";


export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [chunks, setChunks] = useState<PiperChunk[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"search" | "chat">("chat");
  const [showFooter, setShowFooter] = useState<boolean>(false); 

  const sampleQAs = [
    {
      question: "Your favorite novels?",
      answer:
        "As a lover of literature, I have many favorite novels. All the Light We Cannot See by Anthony Doerr is a beautifully written book about World War II and the interweaving of lives of a young blind girl during the bombing of the Germans on France. A Man at Arms by Steven Pressfield is also a contemporary novel that tells the dramatic story of a young speechless girl carrying the Corinthian correspondence to Corinth, Paul’s letters to Corinth, and a man at arms who steps up to be her protector. If I had to pick a classic, it would be Crime and Punishment by Dostoevsky, just because the power of the description of the tormented soul of Raskolnikov is unparalleled. As a Christian, I also spend a lot of time reading the Bible. My favorite, most frequently used Bible app is Logos Bible software. It is an excellent tool for studying the Bible and has helped me to deepen my understanding of God's Word. I believe that reading is a valuable and enriching experience, and I encourage everyone to read as much as they can. Even in my seventies, I am constantly discovering new books and authors that I have never read before. I recently read The Warmth of Other Suns, a Pulitzer prize-winning narrative history that is just knocking me over with sadness because of what I was involved in in those days and the horrors of the background of African Americans in this country. I also just finished listening to Leland Ryken’s new biography of J. I. Packer. In other words, I try to listen to fiction if somebody has given me a really good recommendation of something contemporary or if I want to get back into something historic that I haven’t even done.",
      passages: [
        {
          article_title: "John Piper's Favorite Things",
          article_date: "2023-01-01",
          article_url: "https://www.desiringgod.org/interviews/john-pipers-favorite-things",
          content: "All the Light We Cannot See by Anthony Doerr, a contemporary — that is, in the last ten years — is a beautifully written book about World War II and the interweaving of lives of a young blind girl during the bombing of the Germans on France. All the Light We Cannot See. A Man at Arms by Steven Pressfield is also contemporary — written in the last five years, probably. It’s a dramatic telling of a young speechless girl carrying the Corinthian correspondence to Corinth, Paul’s letters to Corinth. And a man at arms steps up to be her protector. Amazing book. And then historically, if I had to pick a classic, it would be Crime and Punishment by Dostoevsky, just because the power of the description of the tormented soul of Raskolnikov is unparalleled. Your favorite, most frequently used Bible app? Logos. Logos Bible software? Yes.",
        },
        {
          article_title: "C.J. Mahaney Interviews John Piper",
          article_date: "2016-10-24",
          article_url: "https://www.desiringgod.org/interviews/c-j-mahaney-interviews-john-piper",
          content: "Given that high price you’re paying. Right. I’m listening to Gulliver’s Travels. Why? In all seriousness, why? Because I’m a lit major and I never read it. Evidently it’s supposed to be good because it’s a classic and I want to know. I just finished Moby Dick. I’ve never read Moby Dick. Whoa. What did you study then as a lit major? This is an easy question to answer. I’ve skipped all the novels courses because they’re too long. Seriously, I couldn’t read it all. They give you a stack of eight or ten novels to read in a semester. There’s no way I can read I can read maybe one novel in a semester, but eight? I never took these courses — ever. I took 17th century poetry. Little teeny sonnet.",
        },
        {
          article_title: "How Do You Use Your iPhone and iPad in Christian Growth?",
          article_date: "2016-03-31",
          article_url: "https://www.desiringgod.org/interviews/how-do-you-use-your-iphone-and-ipad-in-christian-growth",
          content: "And, at the same time, I am listening to a narrative history of the great migration of African Americans from the South to the North called The Warmth of Other Suns, a Pulitzer prize-winning narrative history that is just knocking me over with sadness because of what I was involved in in those days and the horrors of the background of African Americans in this country. And at the same time I am listening to Leland Ryken’s new biography of J. I. Packer. So I have got three audio books going at the same time, just listening according to what I feel like in the moment. And I just finished listening, last year, to The Brothers Karamazov. In other words, I try to listen to fiction if somebody has given me a really good recommendation of something contemporary or if I want to get back into something historic that I haven’t even done.",
        },
      ]
    },
    {
      question: "What's your favorite food?",
      answer:
        "My favorite breakfast is a layer of Grape Nuts and a layer of Mini Shredded Wheats, and my favorite soft drink alternates between Diet Dr. Pepper and Diet Coke. At home, my wife's spaghetti is hands down my favorite dinner. As for restaurants, my wife says I can't say Chick-fil-A or Chipotle, but Olive Garden is a bona fide restaurant that I enjoy. However, I believe that the more expensive the restaurant, the weirder the food tastes.",
      passages: [
        {
          article_title: "John Piper's Favorite Things",
          article_date: "2023-01-01",
          article_url: "https://www.desiringgod.org/interviews/john-pipers-favorite-things",
          content: "Favorite restaurant? Well, we talked about that one, and she said, “You can’t say Chick-fil-A, and you can’t say Chipotle, because he doesn’t mean fast foods. He means real bona fide restaurants.” And so I said, “Well, how about, then, Olive Garden?” And she said, “Well, that would work.” When our sons were growing up, we didn’t very often go out to eat, and when we did, we went to the places I like, like Chick-fil-A. And then, if we stepped it up, we would go to Olive Garden. And they thought Olive Garden was fine dining. It is. Why would you want to go any higher than that? Food tastes weird if you go higher than that. The more expensive the restaurant, the weirder the food",
        },
        {
          article_title: "Grape Nuts — Hot or Cold?",
          article_date: "2017-01-27",
          article_url: "https://www.desiringgod.org/interviews/grape-nuts-hot-or-cold",
          content: "What is your preference?” I am only willing to answer this question because I know who asked it, and she is a woman of substance, you might say, like Grape Nuts — though that probably does not sound like a compliment. The answer is no. Soggy is not good. And dry crunchy is not good. But cold, milk crunchy, mingled with mini shredded wheats and Great Harvest, non-crunchy granola well-timed so that you don’t have squishy minis or warm milk: now that is the right kind of crunchy. But, really, there is another secret that makes this breakfast unsurpassed in pleasure and has kept me coming back for about thirty years and gets me out of bed in the morning with hope and beckons me home while I am jogging and makes me want to go to bed early at night, so that the morning will come faster with breakfast",
        },
      ]
    },
    {
      question: "Is my depression biological or spiritual?",
      answer:
        "Depression can have both biological and spiritual components. It is important to recognize that our bodies and souls are intertwined, and physical remedies can be a gift from God's hand. Medication can be helpful in stabilizing physical symptoms of depression, allowing for progress in counseling and spiritual growth. However, we should also be cautious and not rely solely on medication as a first course of action. We should also consider natural strategies such as diet, exercise, sleep, and environment, which can affect our psychological and spiritual condition. Ultimately, we need to talk to ourselves and ask why we are downcast, and turn to God's promises for comfort and hope.",
      passages: [
        {
          article_title: "What's Your Take on Christians Using Antidepressants?",
          article_date: "2009-09-28",
          article_url: "https://www.desiringgod.org/interviews/whats-your-take-on-christians-using-antidepressants",
          content: "So we apply this principle that we all use to depression, and then the fact that the body is included in depression. Whether we should use the terms &quot;chemical imbalances&quot;—I've read both sides on that. Some people say that there is no scientific evidence for such a thing and others say that it is a given. Whatever. Everybody knows that there are physical dimensions to depression. If that physical dimension could be helped by medicine—in the short run especially, sometimes long term—then I think, in God's grace and mercy, we should take it as a gift from his hand.",
        },
        {
          article_title: "Anti-Depressants, Sleep, Diet, and Exercise",
          article_date: "2016-10-24",
          article_url: "https://www.desiringgod.org/interviews/anti-depressants-sleep-diet-and-exercise",
          content: "This is huge to me and I think I am still learning about it. It relates to ADD; it relates to anxiety and panic attacks; it relates to the issue of whether there is sin or sickness or a mixture. It might be helpful to lay out just a little bit of what I have learned about making the physical remedies, or strategies, spiritual. And that is the way I think about it: What makes the use of a physical strategy in coping or flourishing with ADD, or with anxiety attacks, or with any other problem for that matter, spiritual? What makes a Christian experience “Christian” or “spiritual” when they use the things that the world would use? We all know that our spiritual condition is affected by physical aspects of life. Our souls are woven together with our bodies and our environment in ways that are complex and inevitable. God made us that way. We are souls with bodies. We always will be souls with bodies.",
        },
        {
          article_title: "Anxiety: Sin, Disorder, or Both?",
          article_date: "2014-02-19",
          article_url: "https://www.desiringgod.org/interviews/anxiety-sin-disorder-or-both",
          content: "What we eat and drink and how we sleep and exercise and how we deal with the weather we live in, like is it dark in February? Will the sun ever come out? Will the temperature ever get, you know, above zero? The lighting that we have at work, the sounds that we are surrounded with — a chirping bird versus a whirring freeway — all of these things affect our psychological and our spiritual condition, which simply means that there may be extreme cases that require special physical efforts, including medication, that provide a kind of equilibrium where the more natural strategies can have their best effects. In other words, medication may bring a person to the point where they can avail themselves more effectively of God-given natural strategies and maybe later we could talk about how these work. I have ideas about how to sanctify these natural strategies. But for now I just want to emphasize that, Yes, we ought not to be anxious. And, Yes, we are all anxious. And, Yes, God has provided wonderful resources both spiritually in his promises and physically with steps like Get enough sleep in order to have the resources that he provides to be content.",
        },
      ]
    }
    // Add more sample Q&As here
  ];
  
  
  const handleSampleQuestion = (
    sampleQuestion: string,
    sampleAnswer: string,
    samplePassages: PiperChunk[]
  ) => {
    setQuery(sampleQuestion);
    setAnswer(sampleAnswer);
    setChunks(samplePassages);

    // Show the footer after a 3-second delay
    setTimeout(() => {
      setShowFooter(true);
    }, 3000);

  };  
  

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setAnswer("");
    setChunks([]);

    setLoading(true);

    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!searchResponse.ok) {
      setLoading(false);
      throw new Error(searchResponse.statusText);
    }

    const results: PiperChunk[] = await searchResponse.json();

    setChunks(results);

    setLoading(false);

    inputRef.current?.focus();

    return results;
  };

  const handleAnswer = async () => {
    if (!query) {
      alert("Please enter a query.");
      return;
    }

    setAnswer("");
    setChunks([]);

    setLoading(true);

    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!searchResponse.ok) {
      setLoading(false);
      throw new Error(searchResponse.statusText);
    }

    const results: PiperChunk[] = await searchResponse.json();

    setChunks(results);

    const prompt = endent`
    Use the following passages to provide an answer to the query: "${query}"
    ${results?.map((d: any) => d.content).join("\n\n")}
    `;

    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!answerResponse.ok) {
      setLoading(false);
      throw new Error(answerResponse.statusText);
    }

    const data = answerResponse.body;

    if (!data) {
      return;
    }

    setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
    }

    // Show the footer after a 3-second delay
    setTimeout(() => {
      setShowFooter(true);
    }, 3000);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (mode === "search") {
        handleSearch();
      } else {
        handleAnswer();
      }
    }
  };

  return (
    <>
      <Head>
        <title>John Piper GPT</title>
        <meta
          name="description"
          content={`AI-powered Q&A for John Piper.`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-auto">
        <div className="mx-auto flex mt-32 w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
          <h1 className="text-5xl font-bold mb-4 items-center">Ask Pastor <span className="inline-flex">J<span className="relative"><Image src="/img/piper-icon.png" alt="Custom O" width="50" height="50"/></span>hnGPT</span></h1>
          {(
            <div className="relative w-full mt-4">
              <IconSearch className="absolute top-3 w-6 left-3 h-6 rounded-full opacity-50 text-gray-400" />

              <input
                ref={inputRef}
                className="h-11 w-full rounded-full border border-gray-300 pr-12 pl-11 focus:outline-none focus:ring-0 focus:border-gray-300 text-base sm:h-11 sm:py-0 sm:pr-16 sm:pl-16 sm:text-lg shadow-hover"
                type="text"
                placeholder="Ask any question"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button>
                <IconArrowRight
                  onClick={mode === "search" ? handleSearch : handleAnswer}
                  className="absolute right-2 top-1.5 h-6 w-6 rounded-full bg-red-600 p-1 hover:cursor-pointer hover:bg-red-700 sm:right-3 sm:top-2 sm:h-8 sm:w-8 text-white"
                />
              </button>

              <div className="mt-2 space-y-2 text-center">
                <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-500">Featured Questions</h3>
                <div className="flex flex-wrap justify-center space-x-2 gap-y-2">
                  {sampleQAs.map((sampleQA, index) => (
                    <button
                      key={index}
                      className="flex items-center bg-white text-gray-600 px-2 py-1 rounded-full border border-gray-300 hover:border-gray-400 focus:outline-none text-base"
                      onClick={() => handleSampleQuestion(sampleQA.question, sampleQA.answer, sampleQA.passages)}
                    >
                      <IconSearch className="w-4 h-4 text-gray-400 mr-2" />
                      {sampleQA.question}
                    </button>
                  ))}
                </div>
              </div>

              </div>
            )}

            {loading ? (
              <div className="mt-6 w-full">
                {mode === "chat" && (
                  <>
                    <div className="font-bold text-xl text-gray-800">Answer</div>
                    <div className="animate-pulse mt-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                      <div className="h-4 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </>
                )}

                <div className="font-bold text-lg mt-6">Related Resources from <a href="https://www.desiringgod.org/" className="text-red-700 underline">Desiring God</a></div>
                <div className="animate-pulse mt-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                </div>
              </div>
            ) : answer ? (
              <div className="mt-6">
                <div className="font-bold text-xl text-gray-800 mb-2">Answer</div>
                <Answer text={answer} />

                <div className="mt-6 mb-16">
                  <div className="font-bold text-xl text-gray-800">Related Resources from <a href="https://www.desiringgod.org/" className="text-red-700 underline">Desiring God</a></div>

                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <a
                            className="hover:opacity-50"
                            href={chunk.article_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                        <div className="mt-4 border border-gray-300 p-4">
                          <div className="flex justify-between">
                            <div>
                              <div className="font-bold text-lg text-gray-800">{chunk.article_title}</div>
                              <div className="mt-1 text-xs text-gray-400">
                                {new Date(chunk.article_date).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                }).toUpperCase()}
                              </div>
                            </div>
                            
                          </div>
                          <div className="mt-2 text-sm text-gray-500 italic">... {chunk.content}</div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : chunks.length > 0 ? (
              <div className="mt-6 pb-16">
                <div className="font-bold text-2xl">Passages</div>
                {chunks.map((chunk, index) => (
                  <div key={index}>
                    <div className="mt-4 border border-gray-300 p-4">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-bold text-lg text-gray-800">{chunk.article_title}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            {new Date(chunk.article_date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            }).toUpperCase()}
                          </div>
                        </div>
                        <a
                          className="hover:opacity-50 ml-2"
                          href={chunk.article_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <IconExternalLink />
                        </a>
                      </div>
                      <div className="mt-2 text-xs text-gray-700">{chunk.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 text-center text-md text-gray-400">{`Disclaimer: Answers may not reflect the actual opinions or thoughts of John Piper`}</div>
            )}
          </div>
        </div>
        <Footer show={showFooter} />
      </div>
    </>
  );
}
