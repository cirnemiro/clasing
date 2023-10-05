"use client"
import styles from './table.module.scss'
import { fetchUsers } from "@/data/users";
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDebounce } from "react-use";
import 'react-loading-skeleton/dist/skeleton.css'

const Table = () => {

    const [results, setResults] = useState<any>(null)
    const [color, setColor] = useState<boolean>(false)
    const [order, setOrder] = useState<boolean>(false)
    const [querySearch, setQuerySearch] = useState<string>("")
    const [searchString, setSearchString] = useState<string>("")


     const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["user",order,querySearch,{staleTime:60}],
        queryFn: fetchUsers,
    });  

    useDebounce(() => setQuerySearch(searchString), 400, [searchString]);

    console.log(results);
    

    useEffect(()=>{
        if (data) {
            let filteredData = data.results
            if (order) {
                filteredData = filteredData.sort((a:any, b:any) => a.location.state.localeCompare(b.location.state))
            }
            if (querySearch !== "") {
                console.log(filteredData.filter((user:any) => user.location.state.toLowerCase().startsWith(querySearch)));
                
                filteredData = filteredData.filter((user:any) => user.location.state.toLowerCase().startsWith(querySearch))
            }
            setResults(filteredData)
        }
    },[data])  


    const removeUser = (index:any) => {
        setResults([
            ...results.slice(0, index),
            ...results.slice(index + 1, results.length)
        ]);
    }

    const resetUsers = () => {
        let filteredData = data.results
        if (order) {
            filteredData = filteredData.sort((a:any, b:any) => a.location.state.localeCompare(b.location.state))
        }
        if (querySearch !== "") {
            console.log(filteredData.filter((user:any) => user.location.state.toLowerCase().startsWith(querySearch)));
            
            filteredData = filteredData.filter((user:any) => user.location.state.toLowerCase().startsWith(querySearch))
        }
        setResults(filteredData)
    }

    let skeletonCount = [];
    for (let i = 0; i <= 20; i++) {
        skeletonCount.push(
        <tr>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <td><Skeleton height={72} width={70}/></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><Skeleton /></td>
                <td><button disabled>borrar</button></td>
            </SkeletonTheme>
        </tr>);
    }

    return(
        <div className={styles.tableComponent}>
            <div className={styles.tableComponent__filters}>
                <button onClick={()=>{setColor(!color)}}>{color ? "Descolorear filas":"Colorear filas"}</button>
                <button onClick={()=>{setOrder(!order)}}>{order ? "No ordenar por país":"Ordenar por país"}</button>
                <button onClick={()=>{resetUsers()}}>Resetear estado</button>
                <input type="text" placeholder='fitlra por país' onChange={(e)=>{setSearchString(e.target.value)}}/>
            </div>
            <table className={`${styles.table} ${color && styles.colorfullTable}`}>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th className={styles.tableComponent__stateFilter} onClick={()=>{setOrder(!order)}}>País{order?" 🔽":""}</th>
                    <th>Acciones</th>
                </tr>
                {
                    isLoading ?
                       <>{skeletonCount}</> 
                   
                    :
                    results?.length !== 0 ?
                    results?.map((user:any,index:number)=>{
                        return(
                            <tr key={user.cell}>
                                <td aria-colSpan={2}><Image alt="avatar" src={user.picture.medium} width={70} height={70}/></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.state}</td>
                                <td><button onClick={()=>{removeUser(index)}}>borrar</button></td>
                            </tr>
                        )
                    }):
                    <tr className={styles.tableComponent__noResults}>
                        <td colSpan={5} >sin resultados</td>
                    </tr>
                }
            </table>
        </div>
    )
}

export default Table