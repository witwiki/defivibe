import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
import Table from 'react-bootstrap/Table';

// Instantiate CoinGecko Client
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  
  const { data } = props.result;
  // console.log(data);
  
  // Formats Numbers to Percentages
  const formatToPercent = number =>
    `${new Number(number).toFixed(2)}%`

  // Formats to Currency
  const formatToCurrency = (currency, maximumSignificantDigits) =>
    new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maximumSignificantDigits
      }
    ).format(currency);

  return (
    <div className={styles.container}>
    <Head>
    <title>DeFi Vibe</title>
    <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <h1>
    DeFi Vibe
    </h1>
    
    <Table striped bordered hover align="center">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>24Hr Delta</th>
          <th>Price</th>
          <th>MarCap</th>
        </tr>
      </thead>

      <tbody>
        {data.map(coin => (
            <tr key={coin.id}>
              <td> 
                <img 
                  src={coin.image}
                  style={{height: 25, width: 25, margin: 10}} 
                />
                <b>{coin.symbol.toUpperCase()}</b> 
              </td>
              <td> {coin.name} </td>
              <td> 
                <span
                  className={coin.price_change_percentage_24h > 0 ? (
                    'text-success' ): 'text-danger'
                }>
                  {formatToPercent(coin.price_change_percentage_24h)} 
                </span>
              </td>
              <td> {formatToCurrency(coin.current_price, 20)} </td>
              <td> {formatToCurrency(coin.market_cap, 12)} </td>
            </tr>
          ))}
      </tbody>
    </Table>
    
    {/* <main className={styles.main}>
    <h1 className={styles.title}>
    Welcome to <a href="https://nextjs.org">Next.js!</a>
    </h1>
    
    <p className={styles.description}>
    Get started by editing{' '}
    <code className={styles.code}>pages/index.js</code>
    </p>
    
    <div className={styles.grid}>
    <a href="https://nextjs.org/docs" className={styles.card}>
    <h3>Documentation &rarr;</h3>
    <p>Find in-depth information about Next.js features and API.</p>
    </a>
    
    <a href="https://nextjs.org/learn" className={styles.card}>
    <h3>Learn &rarr;</h3>
    <p>Learn about Next.js in an interactive course with quizzes!</p>
    </a>
    
    <a
    href="https://github.com/vercel/next.js/tree/master/examples"
    className={styles.card}
    >
    <h3>Examples &rarr;</h3>
    <p>Discover and deploy boilerplate example Next.js projects.</p>
    </a>
    
    <a
    href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    className={styles.card}
    >
    <h3>Deploy &rarr;</h3>
    <p>
    Instantly deploy your Next.js site to a public URL with Vercel.
    </p>
    </a>
    </div>
    </main>
    
    <footer className={styles.footer}>
    <a
    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
    >
    Powered by{' '}
    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
    </a>
  </footer> */}
  </div>
  )
}

export async function getServerSideProps(context) {
  
  //  Schema
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  
  //  Fetches all prices in the market
  const result = await coinGeckoClient.coins.markets();
  
  return {
    props: {
      result
    }
  }
}
