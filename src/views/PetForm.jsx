import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function PetForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        id: null,
        identifier: '',
        nickname: '',
        date_of_birth: '',
        about: '',
        user_id: '9d007644-821d-4260-92d6-b06af4c04e2b',
        type_id: '9d007644-8559-42c0-865b-66afcfc189ef',
        sub_type_id: '9d007644-9486-49b7-8520-5668f701ae62',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`http://127.0.0.1:80/api/v1/pets/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setPet(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (pet.id) {
            axiosClient.put(`/pets/${pet.id}`, pet)
                .then(() => {
                    navigate('/pets')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/pets', pet)
                .then(() => {
                    navigate('/pets')
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
            {pet.id && <h1>Update Pet: {pet.name}</h1>}
            {!pet.id && <h1>New Pet</h1>}
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
                        <input value={pet.identifier} onChange={ev => setPet({ ...pet, identifier: ev.target.value })}
                               placeholder="Identifier"/>
                        <input value={pet.nickname} onChange={ev => setPet({ ...pet, nickname: ev.target.value })}
                               placeholder="Nickname"/>
                        <input value={pet.about} onChange={ev => setPet({ ...pet, about: ev.target.value })}
                               placeholder="About"/>
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}