import type { AppProps } from 'next/app'
import '../styles/global.css'
import Layout from '../components/layout'
import { Authenticator } from '../components/authenticator'
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Authenticator>
      <Component {...pageProps} />
    </Authenticator>
  </Layout>
}