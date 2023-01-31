interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return(
    <>
      <h1>{props.count}</h1>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get count of pools
  const response = await fetch('http://localhost:3333/pools/count');
  const data = await response.json()

  // By returning { props: { count } }, the Home component
  // will receive `count` as a prop at build time
  return {
    props: {
      count: data.count,
    },
  }
}