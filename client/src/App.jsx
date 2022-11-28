import { useState, useEffect, useTransition } from "react";
import { Icon } from "@iconify/react";

function AddUserPopUp({ setData, setAddUserPopup }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addUser = () => {
    if (name && age && email && phone) {
      fetch("http://localhost:3001/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          age,
          email,
          phone
        })
      })
        .then(response => response.json())
        .then(json => { setData(json); setAddUserPopup(false) })
    }
  }

  return <div className="fixed bg-white p-6 w-1/2 rounded-lg shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl">Add User</h2>
      <button onClick={() => setAddUserPopup(false)}>
        <Icon icon="uil:multiply" />
      </button>
    </div>
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Age
        </label>
        <input value={age} onChange={(e) => setAge(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="87" />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="johndoe@thecodeblog.net" />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone
        </label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="phone" placeholder="0123456789" />
      </div>
    </div>
    <button onClick={addUser} className="bg-amber-500 w-full text-center py-4 mt-6 text-white rounded-md shadow-md">Submit</button>
  </div>
}

function App() {
  const [data, setData] = useState([]);
  const [addUserPopUp, setAddUserPopup] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      // send a fetch request to the url
      fetch("http://localhost:3001/users/list")
        // parse the response as json
        .then(response => response.json())
        // set the data to the response
        .then(json => setData(json));
    } else {
      fetch(`http://localhost:3001/users/search?q=${query}`)
        .then(response => response.json())
        .then(json => setData(json));
    }
  }, [query])

  const deleteUser = (id) => {
    fetch(`http://localhost:3001/users/delete/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => setData(json));
  }

  return (
    <div className="App w-full bg-slate-100 text-slate-700 flex flex-col py-32 items-center relative">
      <div className="flex w-3/4 flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl">Contact List</h1>
            <p className="text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p>
          </div>
          <button onClick={() => setAddUserPopup(true)} className="bg-amber-500 flex items-center gap-1 px-4 pr-5 py-3 rounded-md text-white shadow-md hover:bg-amber-600 transition-all">
            <Icon icon="uil:plus" className="stroke stroke-white" />
            Add user
          </button>
        </div>
        <div className="flex items-center gap-4 border-b-2 py-4 rounded-md">
          <Icon icon="uil:search" className="w-6 h-6 text-slate-500" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search user..." className="placeholder-slate-500 w-full focus:outline-none bg-transparent" />
        </div>
        <table className="min-w-0">
          <thead className="border-b border-slate-500">
            <tr>
              <th className="py-3 px-8 text-left">Name</th>
              <th className="py-3 px-8 text-left">Title</th>
              <th className="py-3 px-8 text-left">Status</th>
              <th className="py-3 px-8 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length ? data.map(user => (
              <tr key={user.id}>
                <td className="px-8 py-4 text-left flex items-center gap-4">
                  <img src={user.avatar} className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    {user.name}
                    <span className="text-sm text-slate-400 block">{user.email}</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-left">
                  {user.jobTitle}
                  <span className="text-sm text-slate-400 block">{user.jobArea}</span>
                </td>
                <td className="px-8 py-4 text-left text-slate-700">
                  <span className={`text-sm w-[5rem] flex justify-center py-1 rounded-full ${{"active": "bg-green-200 text-green-500", "offline":"bg-rose-200 text-rose-500", "idle": "bg-amber-200 text-amber-500"}[user.status]}`}>{user.status}</span>
                </td>
                <td className="px-8 py-4 text-left text-slate-700">
                  {user.jobType}
                </td>
                <td className="px-8 py-4 pt-5">
                  <button onClick={() => deleteUser(user.id)}>
                    <Icon icon="uil:trash-alt" className="!text-rose-500 w-5 h-5" />
                  </button>
                </td>
              </tr>
            )) : <tr>
              <td colspan="5" className="text-center text-slate-500 pt-8">
                No results found.
              </td>
            </tr>}
          </tbody>
        </table>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-slate-400">Made with 💖 by MRGA. All rights reserved.</div>
      {addUserPopUp && (
        <AddUserPopUp setData={setData} setAddUserPopup={setAddUserPopup} />
      )}
    </div>
  )
}

export default App
