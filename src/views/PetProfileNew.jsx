import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Стили
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AvatarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const Avatar = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 75px;
  object-fit: cover;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Input = styled.input`
  border-radius: 10px;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContainerTitle = styled.div`
  text-align: center;
`;

const NewsFeed = styled.div`
  flex: 2;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NewsItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const ProfilePage = () => {
    const [avatar, setAvatar] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [petType, setPetType] = useState('');
    const [petSubtype, setPetSubtype] = useState('');
    const [age, setAge] = useState('');
    const [about, setAbout] = useState('');
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Загрузка данных питомца и новостей
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.example.com/petProfile');
                const newsResponse = await axios.get('https://api.example.com/news');
                const { data } = response;
                setUniqueId(data.uniqueId);
                setPetType(data.type);
                setPetSubtype(data.subtype);
                setAge(data.age);
                setAbout(data.about);
                setAvatar(data.avatar);
                setNews(newsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                // Здесь можно добавить код для загрузки изображения на сервер
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveInfo = async () => {
        try {
            await axios.put('https://api.example.com/petProfile', {
                uniqueId,
                type: petType,
                subtype: petSubtype,
                age,
                about,
                avatar
            });
            alert('Информация сохранена!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <Wrapper>
            <AvatarContainer>
                <ContainerTitle>
                    <h2>Кракен</h2>
                </ContainerTitle>

                <Avatar src={avatar || 'https://via.placeholder.com/150'} alt="Pet Avatar" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </AvatarContainer>
            <NewsFeed>
                <ContainerTitle>
                    <h3>Последние новости</h3>
                </ContainerTitle>

                {news.map((item, index) => (
                    <NewsItem key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </NewsItem>
                ))}
            </NewsFeed>
            <InfoContainer>
                <ContainerTitle>
                    <h3>Персональная информация</h3>
                </ContainerTitle>

                <Input
                    placeholder="Уникальный ID"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                />
                <Input
                    placeholder="Тип питомца"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                />
                <Input
                    placeholder="Подтип питомца"
                    value={petSubtype}
                    onChange={(e) => setPetSubtype(e.target.value)}
                />
                <Input
                    placeholder="Возраст"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <Input
                    placeholder="О питомце"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
                <Button onClick={handleSaveInfo}>Сохранить информацию</Button>
            </InfoContainer>
        </Wrapper>
    );
};

export default ProfilePage;