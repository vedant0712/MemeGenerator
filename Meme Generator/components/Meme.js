import React from "react"

export default function Meme() {
    /**
     * Challenge: 
     * 1. Set up the text inputs to save to
     *    the `topText` and `bottomText` state variables.
     * 2. Replace the hard-coded text on the image with
     *    the text being saved to state.
     */
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "" ,
        isSubmit: false,
        topSave: "",
        bottomSave: ""
    })
    const [allMemeImages, setAllMemeImages] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))

    },[])
    
    function handleChange(event) {
        console.log(event.target)
        const {name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        if (meme.topText.length > 0 && meme.bottomText.length > 0) {
            setMeme(prevMeme => {
            const randomNumber = Math.floor(Math.random() * allMemeImages.length)
            const url = allMemeImages[randomNumber].url
            return (
                {...prevMeme,isSubmit:prevMeme.isSubmit ? prevMeme.isSubmit : !prevMeme.isSubmit,randomImage: url,topSave:prevMeme.topText, bottomSave:prevMeme.bottomText }
            )
            })
        } else {
            alert("Please enter First Name and Last Name!")
        }
    }
    

    return (
        <main>
            
            <form onSubmit={handleSubmit}>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
                </div>
            </form>
            
            {meme.isSubmit && <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topSave}</h2>
                <h2 className="meme--text bottom">{meme.bottomSave}</h2>
            </div>
            }
        </main>
    )
}