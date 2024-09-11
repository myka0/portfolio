import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import { Flex } from "@/once-ui/components";
import classNames from "classnames";
import { Header, Footer } from "@/app/components";
import { Inter } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mykamayer.com"),
  title: "Myka Mayer",
  openGraph: {
    title: `Myka Mayer's Portfolio`,
    description: "Portfolio website showcasing my work.",
    url: "https://mykamayer.com",
    siteName: `Myka Mayer's Portfolio`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      as="html"
      lang="en"
      fillHeight
      background="page"
      data-neutral="gray"
      data-brand="indigo"
      data-accent="magenta"
      data-solid="contrast"
      data-solid-style="flat"
      data-theme="dark"
      data-border="playful"
      data-surface="translucent"
      data-transition="all"
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        code.variable,
        "root",
      )}
    >
      <Flex
        style={{ minHeight: "100vh" }}
        as="body"
        fillWidth
        margin="0"
        padding="0"
        direction="column"
      >
        <Header />
        <Flex flex={1} direction="column">
          {children}
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
}
