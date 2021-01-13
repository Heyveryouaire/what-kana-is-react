import {useState, useRef, useEffect } from "react"
import kana from "../lib/kana"

export default function MainWindow({ height, width = 0 }) {

    const kanaInput = useRef()
    
    const getRandom = () => {
        return kana[Math.floor(Math.random() * kana.length)]
    }
    
    const [currentKana, setCurrentKana] = useState(getRandom())
    const [error, setError ] = useState(false)

    const checkKana = () => {
        setError(false)
        const letter = kanaInput.current.value
        kanaInput.current.style.color = "black"

        const getKana = kana.find(kana => kana.kana === currentKana.kana)
        if(getKana.romaji === letter){
            kanaInput.current.value = ""
            kanaInput.current.focus()
            setCurrentKana(getRandom())
        }else{
            setError(true)
            kanaInput.current.focus()
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            checkKana()
        }
    }

    const helpKana = () => {
        const input = kanaInput.current
        input.value = currentKana.romaji
        input.style.color = "red"
        input.focus()
    }

    useEffect(() => { 
       kanaInput.current.focus()
    }, [kanaInput])

    return (
        <div>
            <div className="window" style={{ height, width }}>
                <div className="title-bar">
                    <div className="title-bar-text">What kana is ?</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body column">
                    <div className="row">
                        <div className="field-row">
                            <label htmlFor="text21"><h3 style={{marginRight: "18px"}} >{currentKana.kana}</h3></label>
                            <input id="text21" type="text" ref={kanaInput} onKeyPress={handleKeyPress}/>
                        </div>
                    </div>
                    <div className="row spaceEvenly">
                        <button onClick={checkKana}>Click me</button>
                        <button onClick={helpKana}>Aide</button>
                    </div>
                    { error && (
                        <span style={{color: "#d9534f"}}>
                            Faux
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}