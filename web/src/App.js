import React from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() { 
  return (
     <div id="app"> 
       <aside> 
         <strong>Cadastrar</strong>
         <form>
           <div className="input-block">
             <label htmlFor="github_username"> Usuário do GitHub</label>
             <input name="github_username" id="github_username" required />
           </div>
           <div className="input-block">
             <label htmlFor="techs">Tecnologias</label>
             <input name="techs" id="techs" required />
           </div>

           <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required />
            </div>  
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required />
            </div>   
           </div>
           <button type="submit">Salvar</button>
         </form>
       </aside>
       <main> 
         <ul> 
           <li className="dev-item">
             <header> 
               <img src="https://avatars1.githubusercontent.com/u/50254416?s=460&v=4" alt="Alexandre Junior"/>
               <div className="user-info"> 
                 <strong>Alexandre Junior</strong>
                 <span>NodeJs, ReactJs e React Native</span>
               </div>
             </header>
             <p> 
             Developer Full-Stack systems Analysis and Development student (Fatec Rio Preto). I love to create and learn new things.
             </p>
             <a href="https://github.com/ItsJuniorDias">Acessar perfil no GitHub</a>
           </li>
           <li className="dev-item">
             <header> 
               <img src="https://avatars1.githubusercontent.com/u/50254416?s=460&v=4" alt="Alexandre Junior"/>
               <div className="user-info"> 
                 <strong>Alexandre Junior</strong>
                 <span>NodeJs, ReactJs e React Native</span>
               </div>
             </header>
             <p> 
             Developer Full-Stack systems Analysis and Development student (Fatec Rio Preto). I love to create and learn new things.
             </p>
             <a href="https://github.com/ItsJuniorDias">Acessar perfil no GitHub</a>
           </li>
           <li className="dev-item">
             <header> 
               <img src="https://avatars1.githubusercontent.com/u/50254416?s=460&v=4" alt="Alexandre Junior"/>
               <div className="user-info"> 
                 <strong>Alexandre Junior</strong>
                 <span>NodeJs, ReactJs e React Native</span>
               </div>
             </header>
             <p> 
             Developer Full-Stack systems Analysis and Development student (Fatec Rio Preto). I love to create and learn new things.
             </p>
             <a href="https://github.com/ItsJuniorDias">Acessar perfil no GitHub</a>
           </li>
           <li className="dev-item">
             <header> 
               <img src="https://avatars1.githubusercontent.com/u/50254416?s=460&v=4" alt="Alexandre Junior"/>
               <div className="user-info"> 
                 <strong>Alexandre Junior</strong>
                 <span>NodeJs, ReactJs e React Native</span>
               </div>
             </header>
             <p> 
             Developer Full-Stack systems Analysis and Development student (Fatec Rio Preto). I love to create and learn new things.
             </p>
             <a href="https://github.com/ItsJuniorDias">Acessar perfil no GitHub</a>
           </li>
         </ul>
       </main>
     </div>
  );
}

export default App;
