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
      <meta name="description" content="Get updates" />
    </Head>
    <Container>
      <Form />
    </Container>
  </>
);

// Export the component as default
export default Home;