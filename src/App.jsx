import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxUsers, setMaxUsers] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadingBd = async () => {
      try {
        const userBD = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!userBD.ok) {
          throw new Error("Ошибка подключение");
        }

        const userJSON = await userBD.json();

        setUsers(userJSON);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadingBd();
  }, []);

  if (loading) return <h1>Загрузка</h1>;
  if (error) return <h1>Ошибка</h1>;

  const userSlice = users.slice(0, maxUsers);

  const addingUsers = () => {
    setMaxUsers((el) => Math.min(el + 5, users.length));
  };

  return (
    <div className="text-center w-200 m-auto">
      {userSlice.map((el) => {
        return (
          <div className="border p-3 m-3">
            <h1>Имя: {el.name}</h1>
            <p>{}</p>
          </div>
        );
      })}
      {maxUsers < users.length && (
        <button className="border p-3 rounded-2xl" onClick={addingUsers}>
          Добавить пользователей
        </button>
      )}
    </div>
  );
}
