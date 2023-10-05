"use client"

import { fetchUsers } from "@/data/users";
import { useQuery } from "@tanstack/react-query";

const Table = () => {
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUsers,
      });

      console.log(data,isLoading,isFetching,error);
      
    return(
        <div>
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