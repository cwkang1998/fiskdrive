import Head from "next/head";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [router, isConnected]);

  return (
    <>
      <Head>
        <title>FiskDisk</title>
        <meta name="description" content="Cloud storage with Web3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Layout>
        <Hero
          title="Store and share your content on Web3!"
          subtitle="Completely decentralized, powered by FEVM & Lighthouse."
        />
      </Layout>
    </>
  );
}
