import Head from "next/head"
import Hero from "../components/Hero"

const HomePage = () => {
  return (
    <main lang='en'>
      <Head>
        <title>Apex Weather</title>
      </Head>
      <Hero />
    </main>
  )
}

export default HomePage
