import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"
// import "./Editor.scss"
import 'react-mde/lib/styles/css/react-mde-all.css'

const Editor = ({ currentText, updateText }) => {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  
   

    return (
        <div className="editor">
            <ReactMde
                value={currentText}
                onChange={updateText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    )
}

export default Editor