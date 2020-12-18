/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from "react";

import './styles.css';

import providers from '../../data/providers.json';

const InputPuzzleEmail = () => {

    //* ----------------------------------
    //* concernant le bonus, la solution est dans le code avec
    //* const inputEl = useRef(null);
    //* inputEl.current.focus();
    //* Mais cela se voit que lorsque l'input est vide
    //* et que l'on clique sur une des suggestions
    //* Car j'ai ajouté une class success lorsque le mail a un format correct
    //* ----------------------------------

    const regexEmail = /^[\w.=-]+@[\w.-]+\.[\w]{2,3}$/i;
    const regexAt = /@/;

    const initialProviderSuggestion =
    [
        providers[0],
        providers[1],
        providers[2]
    ];

    const [inputValue, setInputValue] = useState('');
    const [successClass, setSucessClass] = useState(false);
    const [providerSuggestion, setProviderSuggestion] = useState(initialProviderSuggestion);
    //! cela me permettra de donner le focus à mon input
    const inputEl = useRef(null);

    const handleChangeInputValue = (e) => {
        setSucessClass(false);
        setInputValue(e.target.value);
        //! pour filtrer mon tableau je recupère la valeur qu'il y a avant le point "." ==> p.substr(0, p.indexOf('.'))
        //! puis celle apres le "arobase" jusqu'au "." ==> .indexOf(e.target.value.substring(e.target.value.indexOf('@') + 1))
        //! je filtre en le comparant avec le nom du provider
        const filteredProviders = providers.filter((p) => p.substr(0, p.indexOf('.')).indexOf(e.target.value.substring(e.target.value.indexOf('@') + 1)) !== -1);
        e.target.value === '' && setProviderSuggestion(initialProviderSuggestion);
        //! Dès que la saisi du user contient un "@" => je remplace mon state de suggestion par le tableau filtré des fournisseurs
        e.target.value.substr(e.target.value.indexOf('@')).match(regexAt) && setProviderSuggestion([...filteredProviders]);
        e.target.value.match(regexEmail) && setProviderSuggestion([]);
    };

    const handleSetProviders = (prov) => {
        //! je donne le focus à mon input lorsque le user clique sur une des suggestions
        inputEl.current.focus();
        setProviderSuggestion([]);
        //! si l input value comporte un "@" j'enleve tout ce qu'il y apres le "@"
        inputValue.match(regexAt) ?
            setInputValue(inputValue.substring(0, inputValue.indexOf('@')) + '@' + prov) :
            //! sinon je prend la valeur de l'input que je concataine avec le reste
            setInputValue(inputValue + '@' + prov);
    };

    useEffect(() => {
        //! si la regex email match avec la value de l'input
        //! j'ajoute la class email
        const regexEmail = /^[\w.=-]+@[\w.-]+\.[\w]{2,3}$/i;
        inputValue.match(regexEmail) && setSucessClass(true);
    }, [inputValue])

    return(
      <div className="bloc-page">
            <input
                ref={inputEl}
                className={`input ${successClass && "success"}`}
                name="email"
                placeholder="Adress Email"
                type="text"
                value={inputValue}
                onChange={handleChangeInputValue}
            />
        <div className="suggestion-container">
        {providerSuggestion.map((prov, index) => {
            while(index < 3) {
                return(
                    <div
                      className="item-suggestion"
                      key={prov}
                      onClick={() => handleSetProviders(prov)}
                    >
                      @{prov}
                    </div>
                )
            }
        })}
        </div>
      </div>
    )
}

export default InputPuzzleEmail;
