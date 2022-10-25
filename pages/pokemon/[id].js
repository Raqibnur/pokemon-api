import Link from "next/link";
import style from "../../styles/pokeman.module.css"
import Head from "next/head";


export async function getStaticPaths(){
    const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`)
    const pokemon = await resp.json()

    return{
        paths: pokemon.map((pokemon)=>({
            params: {id: pokemon.id.toString()},
        })),
        fallback: false,
    }
}

export async function getStaticProps({params}){
    const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)
    return{
        props:{
            pokemon: await resp.json()
        }
    }
}

export default function details({pokemon}){
    return(
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <Link href={'/'}>
                    <a>Go Back Home</a>
            </Link>
            <div className={style.card}>
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} />
                <h1>{pokemon.name}</h1>
                <div>{pokemon.type.join(", ")}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                {pokemon.stats.map(({name, value})=>(
                    <tr key={name}>
                        <td>{name}</td>
                        <td>{value}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}