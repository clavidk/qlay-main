import { Answer } from "@/components/Answer/Answer";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Form } from "@/components/Form";
import { PiperChunk } from "@/types";
import { IconArrowRight, IconExternalLink, IconSearch } from "@tabler/icons-react";
import endent from "endent";
import Head from "next/head";
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
      question: "What's your least favorite food?",
      answer:
        "I don't like expensive fancy food",
      passages: [
        {
          article_title: "Title 1",
          article_date: "Date 1",
          article_url: "https://www.desiringgod.org",
          content: "passage content 1",
        },
        {
          article_title: "Title 2",
          article_date: "Date 2",
          article_url: "https://www.desiringgod.org",
          content: "passage content 2",
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

      <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <div className="mx-auto flex mt-32 w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
          <h1 className="text-4xl font-bold mb-4">Ask Pastor JohnGPT</h1>
          {(
            <div className="relative w-full mt-4">
              <IconSearch className="absolute top-3 w-6 left-3 h-6 rounded-full opacity-50 text-gray-400" />

              <input
                ref={inputRef}
                className="h-11 w-full rounded-full border border-gray-300 pr-12 pl-11 focus:outline-none focus:ring-0 focus:border-gray-300 text-base sm:h-11 sm:py-0 sm:pr-16 sm:pl-16 sm:text-lg shadow-hover"
                type="text"
                placeholder="What's your favorite food?"
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
                <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Featured Questions</h3>
                <div className="flex flex-wrap justify-center space-x-2">
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

                <div className="font-bold text-lg mt-6">Related Resources</div>
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
                  <div className="font-bold text-xl text-gray-800">Related Resources</div>

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
              <div className="mt-6 text-center text-lg text-gray-400">{`Note: Answers may not reflect the actual opinions or thoughts of John Piper`}</div>
            )}
          </div>
        </div>
        <Footer show={showFooter} />
      </div>
    </>
  );
}
