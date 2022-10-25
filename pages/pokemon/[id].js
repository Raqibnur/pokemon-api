import { useRouter } from "next/router"
import { useEffect , useState } from "react";
import Link from "next/link";
import style from "../../styles/pokeman.module.css"
import Head from "next/head";



export default function details({pokemon}){
    const [pokemon, setPokemon] = useState(null);

    useEffect(()=>{
        async function getPokemon(){
            const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
            setPokemon(await resp.json());
        }
        if(id){
            getPokemon()
        }
    }, [])

    const {query : {id} }= useRouter();
    
    if(!pokemon){
        return null;
    }

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