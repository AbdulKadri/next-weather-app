import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  weights: [400, 500, 600, 700],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
})

const App = ({ Component, pageProps }) => {
  return (
    <main className={quicksand.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}

export default App
