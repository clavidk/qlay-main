// Import the necessary modules
import { FC } from 'react';
import Head from 'next/head';
import Form from '../components/Form';
import Container from '../components/Container';

// Define the component
const Home: FC = () => (
  <>
    <Head>
      <title>Qlay</title>
      <meta name="description" content="Tools for the sojourner life" />
    </Head>
    <Container>
      <div className="my-8 text-center">
        <h1 className="text-5xl font-light font-serif mb-4 items-center text-white">QLAY</h1>
      </div>
      <div className="my-8 text-center">
        <Form />
      </div>
      <div className="my-8 text-center">
        <a href="https://pipergpt.qlay.xyz" className="text-blue-500">JohnPiperGPT</a>
      </div>
    </Container>
  </>
);

// Export the component as default
export default Home;
