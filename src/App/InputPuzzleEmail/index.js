/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef } from "react";

import './styles.css';

import providers from '../../data/providers.json';

const InputPuzzleEmail = () => {

    //* ----------------------------------
    //* concernant le bonus, la solution est dans le code avec
    //* const inputEl = useRef(null);
    //* inputEl.current.focus();
    //* Mais elle ne se voit pas car j'ai ajouté une class success
    //* J'espère ne pas faire un hors sujet :(
    //* ----------------------------------

    const regexEmail = /^[\w.=-]+@[\w.-]+\.[\w]{2,3}$/i;
    const regexAt = /@/;

    //! tableau à refaire plus proprement
    const initialProviderSuggestion =
    [
        providers[0],
        providers[1],
        providers[2]
    ];

    const [inputValue, setInputValue] = useState('');
    const [successClass, setSucessClass] = useState(false);
    const [providerSuggestion, setProviderSuggestion] = useState(initialProviderSuggestion);
    const inputEl = useRef(null);

    const handleChangeInputValue = (e) => {
        setSucessClass(false);
        setInputValue(e.target.value);
        //! pour filtrer mon tableau je recupere la valeur qu'il y avant le point. ==> p.substr(0, p.indexOf('.'))
        //! puis celle apres le point jusqu'au arobase ==> .indexOf(e.target.value.substring(e.target.value.indexOf('@') + 1))
        //! je filtre en comparant avec le nom du provider
        const filteredProviders = providers.filter((p) => p.substr(0, p.indexOf('.')).indexOf(e.target.value.substring(e.target.value.indexOf('@') + 1)) !== -1);
        e.target.value === '' && setProviderSuggestion(initialProviderSuggestion);
        //!
        console.log('e.target.value.substr(e.target.value.indexOf(@))', e.target.value.substr(e.target.value.indexOf('@')))
        e.target.value.substr(e.target.value.indexOf('@')).match(regexAt) && setProviderSuggestion([...filteredProviders]);
        e.target.value.match(regexEmail) && setProviderSuggestion([]);
    };

    const handleSetProviders = (prov) => {
        inputEl.current.focus();
        setProviderSuggestion([]);
        //! si l input value comporte un arobase j'enleve tout ce qu'il y apres le arobose
        inputValue.match(regexAt) ?
            setInputValue(inputValue.substring(0, inputValue.indexOf('@')) + '@' + prov) :
            //! sinon je prend la valeur de l'input que je concataine avec le reste
            setInputValue(inputValue + '@' + prov);
    };

    useEffect(() => {
        //! si le regex email match avec la value de l'input
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
