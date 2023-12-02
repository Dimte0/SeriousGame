/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"
import axios from 'axios'
import "./InitData.css"

export default function InitDataComp() {
    //state
    const [textValue, setTextValue] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [themeChoose, setThemeChoose] = useState('')
    const [selectedItemNiveau, setSelectedItemNiveau] = useState(null)
    const [isOpen, setIsOpen] = useState(false);
    const [listTheme, setListTheme] = useState([])
    const [selectedItemTheme, setSelectedItemTheme] = useState(null);
    const [listNiveau, setListNiveau] = useState([])
    //fonctions

    const ModifTexte = (event, id) =>{
        const newList = [...textValue]
        newList[id] = event.target.value;
        setTextValue(newList)
        ShowList(textValue)
    }

    const ChangeColor = (id) =>{
        setSelectedItemTheme(id)
    }

    const ChangeNiveau = (id)=>{
        setSelectedItemNiveau(id)
    }

    const ShowList = (liste) =>{
        liste.forEach(li=> {
            console.log(li);
        });
    }

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
        console.log(e.target.value)
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    const AllValide = () =>{
        console.log(textValue)
        textValue.forEach(tv=>{
            if(tv === ''){
                console.log(tv)
                console.log(tv==="")
                return false
            }
            
        })
        return true
    }

    const PostData = async (src, data) =>{
        try{
            
            const response = await axios.post(src, data, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            console.log("LA")
            console.log(response.data)
            return response.data
        }catch(error){
            console.log('Erreur de fou :', error)
        }
    }

    const SendRequest = async () =>{
        console.log(textValue.length)
        if(textValue.length == 6 && AllValide() && selectedOption != ''&& selectedItemTheme != null && selectedItemNiveau != null){
            console.log("Question :"+textValue[0])
            console.log("Réponse1 :"+textValue[1])
            console.log("Réponse2 :"+textValue[2])
            console.log("Réponse3 :"+textValue[3])
            console.log("FeedBack1 :"+textValue[4])
            console.log("Feedback2 :"+textValue[5])
            console.log("Réponse Valide :"+selectedOption)
            console.log("Thème :"+listTheme[selectedItemTheme-1].themeIntitule)
            console.log("Niveau :"+listNiveau[selectedItemNiveau-1].niveauIntitule)
            //Créer la question
            let Q_ID = await PostData('http://127.0.0.1:5000/api/question_route/'+selectedItemTheme+'/'+selectedItemNiveau+'/',
            {questionIntitule :textValue[0], questionImage:null})
            //Créer la réponse
            alert(Q_ID  )
            let pas = 4
            for(let i = 1; i < 4; i++){
                let correct; let feed;
                if(selectedOption == i){
                    correct = true
                    feed = null
                }else{
                    correct = false
                    feed = textValue[pas]
                    pas = pas + 1
                }

                PostData('http://127.0.0.1:5000/api/answer_route/'+Q_ID.questionID+'/',
                {reponseIntitule:textValue[i],
                reponseisCorrecte:correct,
                reponseFeedback:feed})
            }
            
        }else{
            alert("Tu dois selectionner toutes les champs obligatoires ainsi que la checkbox présentée ainsi que le thème")
        }
    }

    const GetData = async (src) =>{
        try{
            const response = await fetch(src)
            const data = await response.json()
            return data
        } catch(e){
            console.log("HAHAHADDDDD")
            return []
        }
    }

    useEffect(async () => {
        const listTheme = await GetData('http://127.0.0.1:5000/api/theme_route/')
        setListTheme(listTheme)
        const listNiveau =await GetData('http://127.0.0.1:5000/api/level_route/')
        setListNiveau(listNiveau)
    }, []);

    //render
  return (
    <div id="page_initData">
        <div id="top">
            <div className={`panelReponse ${isOpen ? '' : 'open'}`}>
                <div className="proposition">
                    <p>Thème</p>
                    <ul>
                    {listTheme.map((theme) => (
                        <li key={theme.themeID}
                            style={{
                                color : selectedItemTheme === theme.themeID ? 'orange' : 'black',
                                cursor : "pointer"
                            }}
                            onClick={()=>ChangeColor(theme.themeID)}
                        >
                            {theme.themeIntitule}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="proposition">
                    <p>Niveau</p>
                    <ul>
                    {listNiveau.map((niveau) => (
                        <li key={niveau.niveauID}
                            style={{
                                color : selectedItemNiveau === niveau.niveauID ? 'orange' : 'black',
                                cursor : "pointer"
                            }}
                            onClick={()=>ChangeNiveau(niveau.niveauID)}
                        >
                            {niveau.niveauIntitule}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>

            {/* Bloque pour les images */}


            <div className={`panelReponse ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleMenu}>Menu</button>
                <div className="proposition">
                    <p>Question</p>
                    <div className="border_TA">
                    <textarea onChange={(e)=>ModifTexte(e, 0)}></textarea>
                    </div>
                </div>
                
                <div className="proposition">
                    <p>Réponse1</p>
                    <div className="border_TA">
                    <textarea onChange={(e)=>ModifTexte(e, 1)}></textarea>
                    <input
                        type="radio"
                        name="options"
                        value="1"
                        checked={selectedOption === '1'}
                        onChange={handleRadioChange}
                    />
                    </div>
                </div>
                <div className="proposition">
                    <p>Réponse2</p>
                    <div className="border_TA">
                    <textarea onChange={(e)=>ModifTexte(e, 2)}></textarea>
                    <input
                        type="radio"
                        name="options"
                        value="2"
                        checked={selectedOption === '2'}
                        onChange={handleRadioChange}
                    />
                    </div>
                </div>
                <div className="proposition">
                    <p>Réponse3</p>
                    <div className="border_TA">
                    <textarea onChange={(e)=>ModifTexte(e, 3)}></textarea>
                    <input
                        type="radio"
                        name="options"
                        value="3"
                        checked={selectedOption === '3'}
                        onChange={handleRadioChange}
                    />
                    </div>
                </div>
                <div className="proposition">
                    <p>FeedBack1</p>
                    <div className="border_TA">
                    <textarea onChange={(e)=>ModifTexte(e, 4)}></textarea>
                    </div>
                </div>
                <div className="proposition">
                    <p>Feedback2</p>
                    <div className="border_TA">
                    <textarea onChange={(e)=>ModifTexte(e, 5)}></textarea>
                    </div>
                </div>
                
            </div>
        </div>

        <div id="bottom">
            <div className="sender">
                <button onClick={SendRequest}>
                    Envoyer la Requête
                </button>
            </div>
        </div>

    </div>
  )
}
