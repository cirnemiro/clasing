"use client"

import { fetchUsers } from "@/data/users";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Table = () => {

    const [order, setOrder] = useState<boolean>(false)


    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["user",order],
        queryFn: fetchUsers,
    });            

    if (order) {
        data?.results.sort((a:any, b:any) => a.location.state.localeCompare(b.location.state));
    }
      
    return(
        <div>
            <div>
                <button>Colorear filas</button>
                <button onClick={()=>{setOrder(!order)}}>Ordenar por país</button>
                <button>Resetear estado</button>
                <input type="text" />
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
                    data.results.map((user:any)=>{
                        return(
                            <tr>
                                <td><img src={user.picture.medium}/></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.state}</td>
                                <td><button>borrar</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Table