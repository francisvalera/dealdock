export default function Head() {
  return (
    <>
      {/* Only keep these if you actually use remote images (e.g., Unsplash).
          Remove if all media is local to avoid needless connections. */}
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      {/* Theme color for Lighthouse PWA tint */}
      <meta name="theme-color" content="#000000" />
    </>
  );
}
