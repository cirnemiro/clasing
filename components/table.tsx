"use client"

import { fetchUsers } from "@/data/users";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const Table = () => {

    const [results, setResults] = useState<any>(null)
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

    return(
        <div>
            <div>
                <button>Colorear filas</button>
                <button onClick={()=>{setOrder(!order)}}>Ordenar por país</button>
                <button onClick={()=>{resetUsers()}}>Resetear estado</button>
                <input type="text" onChange={(e)=>{setSearchString(e.target.value)}}/>
            </div>
            <table>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>País</th>
                    <th>Acciones</th>
                </tr>
                {
                    isLoading ?
                    <tr>
                        <td>loading...</td>
                        <td>loading...</td>
                        <td>loading...</td>
                        <td>loading...</td>
                        <td>loading...</td>
                    </tr>
                    :
                    results?.length !== 0 ?
                    results?.map((user:any,index:number)=>{
                        return(
                            <tr>
                                <td><img src={user.picture.medium}/></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.state}</td>
                                <td><button onClick={()=>{removeUser(index)}}>borrar</button></td>
                            </tr>
                        )
                    }):
                    <>sin resultados</>
                }
            </table>
        </div>
    )
}

export default Table