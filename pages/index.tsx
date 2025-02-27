// Import the necessary modules
import { FC } from 'react';
import Head from 'next/head';
import Container from '../components/Container';

// Define the component
const Home: FC = () => (
  <>
    <Head>
      <title>Qlay Labs</title>
      <meta name="description" content="Tools for the sojourner life" />
    </Head>
    <Container>
      <div className="my-8 text-center">
        <h1 className="text-5xl font-light font-serif mb-4 items-center text-white">QLAY LABS</h1>
      </div>
      <div className="my-8 text-center">
      </div>
      <div className="my-8 text-center font-serif text-gray-500">
        contact: founders at qlaylabs dot com
      </div>
    </Container>
  </>
);

// Export the component as default
export default Home;
