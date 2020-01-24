/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import UpdateForm from './components/UpdateForm';

function App() { 
 const [devs, setDevs] = useState([]);

 const [actualDev, setActualDev ] = useState('');
 const [editMode, setEditMode ] = useState(false);



 async function loadDevs() {
  const response = await api.get('/devs');
  setDevs(response.data.reverse())
}

useEffect(() => {
  loadDevs()
}, [])

async function handleSubmit(data) {
  const response = await api.post('/devs', data)

  setDevs([response.data, ...devs])
}

  async function handleDelete(data) {
    await api.delete(`/devs/${data._id}`)

    const filterDevs = devs.filter( dev => dev._id !== data._id)
    setDevs(filterDevs); 
  }

  async function handleUpdate(data) {
    await api.put(`/devs/${actualDev._id}`, data)

    loadDevs();
    setMode();
  }

  function loadMode() {
    if (editMode) {
      return (
        <aside>
          <strong> </strong>
          <UpdateForm onUpdateForm={handleUpdate} onCalcel={setMode} dev={actualDev} />
        </aside>
      )
    } else {
      return (
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleSubmit} />
        </aside>
      )
    }
  }
  


  function setMode(data) {
    if (!editMode) {
      setEditMode(true)
      setActualDev(data)
    } else {
      setEditMode(false)
    }
  }
  
  return (
     <div id="app"> 
      {loadMode()}
       <main> 
         <ul> 
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} onDeleteForm={handleDelete} onUpdateClick={setMode} />
            ))}
    
         </ul>
       </main>
     </div>
  );
}

export default App;
