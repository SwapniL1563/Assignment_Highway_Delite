import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface Note {
  _id: string;
  note: string;
}

interface User {
  name: string;
  email: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState(""); // <-- added for input
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return navigate("/");

        const resUser = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resUser.data);

        const resNotes = await axios.get(`${API_BASE_URL}/api/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(resNotes.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCreateNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/notes/create`,
        { note: newNote }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([...notes, res.data]);
      setNewNote(""); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="flex items-center gap-8">
          <img src="/logo-only.png" alt="Logo" className="w-8 h-8" />
          <h1 className="font-semibold text-lg">Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      <main className="flex-1 p-4 flex flex-col items-center">
       <div className="max-w-md  w-full border border-gray-300 p-4 rounded-lg shadow-md">
         <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg  mb-4">
          <p className="text-lg font-medium">
            Welcome, <span className="font-bold">{user?.name}</span> !
          </p>
          <p className="text-sm text-gray-500">Email: {user?.email}</p>
        </div>

        <div className="w-full max-w-md flex gap-2 mb-6">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your note"
            className="flex-1 border border-gray-300 rounded p-2"
          />
          <button
            onClick={handleCreateNote}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
       </div>

        <div className="w-full max-w-md space-y-3 mt-3">
          <h2 className="font-semibold mb-2">Notes</h2>
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center p-3 border border-gray-300 rounded shadow-md"
            >
              <span>{note.note}</span>
              <button onClick={() => handleDeleteNote(note._id)}>
                <Trash2 className="text-red-500 w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
