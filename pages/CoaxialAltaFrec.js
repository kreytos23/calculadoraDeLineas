import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import CoaxialAltaFrec from '../components/coaxialAltasFrec'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CoaxialAltaFrec/>
    </div>
  )
}