import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../axiosClient";

export default function PetForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState({
        id: null,
        identifier: '',
        nickname: '',
        date_of_birth: '',
        about: '',
        user_id: '',
        type_id: '',
        sub_type_id: '',
    });

    const [users, setUsers] = useState([]);
    const [petTypes, setPetTypes] = useState([]);
    const [petSubTypes, setPetSubTypes] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if (id) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    setLoading(true)

                    const petResponse = await axiosClient.get(`/pets/${id}`);
                    setPet(petResponse.data.data);

                    const usersResponse = await axiosClient.get('/users');
                    setUsers(usersResponse.data.data);

                    const petTypesResponse = await axiosClient.get('/pet_types');
                    setPetTypes(petTypesResponse.data.data);

                    const petSubTypesResponse = await axiosClient.get('/pet_sub_types');
                    setPetSubTypes(petSubTypesResponse.data.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, []);
    }

    const handleTypeChange = async (event) => {
        const type_id = event.target.value;
        setPet({...pet, type_id});

        try {
            const petResponse = await axiosClient.get(`/get_sub_types/${type_id}`);
            setPetSubTypes(petResponse.data.data);
        } catch (error) {
            console.error('Ошибка при загрузке подтипов:', error);
        }
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        try {
            if (pet.id) {
                await axiosClient.put(`/pets/${pet.id}`, pet);
                navigate('/pets');
            } else {
                await axiosClient.post('/pets', pet);
                navigate('/pets');
            }
        } catch (err) {
            const response = err.response;
            setErrors(response.data.errors);

        }
    };

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
                        <input value={pet.identifier} onChange={ev => setPet({...pet, identifier: ev.target.value})}
                               placeholder="Identifier"/>
                        <input value={pet.nickname} onChange={ev => setPet({...pet, nickname: ev.target.value})}
                               placeholder="Nickname"/>
                        <input value={pet.about} onChange={ev => setPet({...pet, about: ev.target.value})}
                               placeholder="About"/>
                        <div>
                            <select
                                id="user"
                                value={pet.user_id}
                                onChange={(e) => setPet({...pet, user_id: e.target.value})}
                            >
                                <option value="">Select user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                id="pet-type"
                                value={pet.type_id}
                                onChange={handleTypeChange}
                            >
                                <option value="">Select pet type</option>
                                {petTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                id="pet-sub-type"
                                value={pet.sub_type_id}
                                onChange={(e) => setPet({...pet, sub_type_id: e.target.value})}
                            >
                                <option value="">Select pet sub type</option>
                                {petSubTypes.map((subType) => (
                                    <option key={subType.id} value={subType.id}>
                                        {subType.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    )
}
