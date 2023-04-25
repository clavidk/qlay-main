import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>clayte</title>
      </Head>
      <div className="text-9xl font-serif tracking-wide text-gray-300">
        clayte
      </div>
    </div>
  );
};

export default Home;
