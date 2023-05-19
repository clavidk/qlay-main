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
      <h1 className="text-5xl font-bold mb-4 items-center">QLAY</h1>
      <Form />
    </Container>
  </>
);

// Export the component as default
export default Home;