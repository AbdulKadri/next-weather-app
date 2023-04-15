import Head from "next/head"
import Hero from "../components/Hero"
import NotablePlaces from "../components/NotablePlaces"
import ClimateChange from "../components/ClimateChange"

const HomePage = () => {
  return (
    <main lang='en'>
      <Head>
        <title>Apex Weather</title>
      </Head>
      <Hero />
      <NotablePlaces />
      <ClimateChange />
    </main>
  )
}

export default HomePage
