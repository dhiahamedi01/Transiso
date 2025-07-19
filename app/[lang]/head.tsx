// app/[lang]/head.tsx
export default function Head({ params }: { params: { lang: string } }) {
    const canonicalUrl = `https://www.transisologistic.com/${params.lang}`;
  
    return (
      <>
        <title>Transiso Logistic</title>
        <meta name="description" content="Bienvenue sur Transiso Logistic, votre solution logistique fiable." />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonicalUrl} />
      </>
    );
  }
  