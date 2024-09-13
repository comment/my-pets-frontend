import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";

export default function Pets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState({});

    useEffect(() => {
        getPets();
    }, [])

    const onDeleteClick = pet => {
        if (!window.confirm("Are you sure you want to delete this pet?")) {
            return
        }
        axiosClient.delete(`/pets/${pet.id}`)
            .then(() => {
                getPets()
            })
    }

    const getPets = () => {
        setLoading(true);
        axiosClient.get('pets')
            .then(({ data }) => {
                setLoading(false);
                setPets(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Pets</h1>
                <Link className="btn-add" to="/pets/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Identifier</th>
                        <th>Nickname</th>
                        <th>Birthday</th>
                        <th>About</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                        {pets.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.identifier}</td>
                                <td>{p.nickname}</td>
                                <td>{p.birthday}</td>
                                <td style={{whiteSpace: 'pre-wrap'}}>{p.about}</td>
                                <td>
                                    <Link className="btn-edit" to={'/pets/' + p.id}>Edit</Link>
                                    &nbsp;
                                    <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}