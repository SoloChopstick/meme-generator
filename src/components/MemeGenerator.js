import React from "react"

class MemeGenerator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "",
            allMemeImgs: []
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({
                    allMemeImgs: memes
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        let num = Math.floor(Math.random() * this.state.allMemeImgs.length);
        console.log(num)
        let url = this.state.allMemeImgs[num].url
        this.setState({
            randomImage: url,
        })
    }

    render() {
        const {topText, bottomText, randomImage, allMemeImgs} = this.state;

        return (
            <div>
                <form className="meme-form">
                    <input type="text" name="topText" value={topText} onChange={this.handleChange}></input>
                    <input type="text" name="bottomText" value={bottomText} onChange={this.handleChange}></input>
                    <button onClick={this.handleClick}>Gen</button>
                </form>
                <div className="meme">
                    <img src={randomImage} alt=""/>
                    <h2 className="top">{topText}</h2>
                    <h2 className="bottom">{bottomText}</h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator