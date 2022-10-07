import NextHead from "next/head";
import { DefaultSeo } from "next-seo";
import seoConfig from "../../lib/config/seo.json"

export default function Head() {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="mateonunez" />
      </NextHead>
    </>
  );
}
