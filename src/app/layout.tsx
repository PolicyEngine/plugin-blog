import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://policyengine.org';
const PATH = '/plugin-blog/';
const TITLE = 'How We Turned Claude into a Policy Expert — PolicyEngine';
const DESCRIPTION =
  'The story of how PolicyEngine built a Claude Code plugin with 24 skills and 21 agents to turn a general-purpose AI into a domain expert for tax and benefit policy analysis.';
const OG_DESCRIPTION =
  'The story of building AI-powered policy analysis — from first experiments to 24 skills and 21 agents.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'PolicyEngine' }],
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
  openGraph: {
    type: 'article',
    title: TITLE,
    description: OG_DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    siteName: 'PolicyEngine',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESCRIPTION,
    site: '@ThePolicyEngine',
  },
};

export const viewport: Viewport = {
  themeColor: '#2C6496',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,400;8..144,600;8..144,700&family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
