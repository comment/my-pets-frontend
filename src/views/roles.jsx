import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";

export default function Roles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState({});

    useEffect(() => {
        getRoles();
    }, [])

    const onDeleteClick = role => {
        if (!window.confirm("Are you sure you want to delete this role?")) {
            return
        }
        axiosClient.delete(`/roles/${role.id}`)
            .then(() => {
                getRoles()
            })
    }

    const getRoles = () => {
        setLoading(true);
        axiosClient.get('roles')
            .then(({ data }) => {
                setLoading(false);
                setRoles(data.data);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    return(
        <div>
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                <h1>Roles</h1>
                <Link className="btn-add" to="/roles/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
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
                        {roles.map(r => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.name}</td>
                                <td>{r.slug}</td>
                                <td>
                                    <Link className="btn-edit" to={'/roles/' + r.id}>Edit</Link>
                                    &nbsp;
                                    <button className="btn-delete" onClick={ev => onDeleteClick(r)}>Delete</button>
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