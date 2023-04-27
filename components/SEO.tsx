// components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
    title: string;
    description: string;
    imageUrl?: string;
    }

    const SEO: React.FC<SEOProps> = ({ title, description, imageUrl }) => {
    const defaultImageUrl = '/og-img.jpg'; // Default Open Graph image in public folder
    const ogImageUrl = imageUrl || defaultImageUrl;

    return (
        <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
        </Head>
    );
};

export default SEO;
