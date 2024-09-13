import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function RoleForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState({
        id: null,
        name: '',
        slug: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/roles/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setRole(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (role.id) {
            axiosClient.put(`/roles/${role.id}`, role)
                .then(() => {
                    navigate('/roles')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/roles', role)
                .then(() => {
                    navigate('/roles')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {role.id && <h1>Update Role: {role.name}</h1>}
            {!role.id && <h1>New Role</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={role.name} onChange={ev => setRole({ ...role, name: ev.target.value })}
                               placeholder="Name"/>
                        <input value={role.slug} onChange={ev => setRole({ ...role, slug: ev.target.value })}
                               placeholder="Slug"/>
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}