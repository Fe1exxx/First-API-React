import { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!users.ok) {
          throw new Error('Не удалось подключится');
        }

        const textUsers = await users.json();
        setData(textUsers);
        setLoading(false);
      }
      catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchUsers();
  }, [])

  if (loading) return <p className='text-gray-200 text-center'>Загрузка...</p>
  if (error) return <p className='text-red-500 text-center'>Ошибка подключения.</p>

  return (
    <div className='grid h-screen place-items-center'>
      {data.map(el => {
        return (
          <div key={el.id} className='border text-center w-100'>
            <h1 className='text-3xl'>{el.name}</h1>
            <p>{el.email}</p>
            <p>{el.address?.city || '-'}</p>
          </div>
        )
      })}
    </div>
  )
}