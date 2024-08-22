// import './App.css'

function App() {

    return (
        <>
            <body>
                <div className="panelSend">
                    <select className="methodSelect" id="method">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </select>
                    <input className="inputUrl" type="text" name="inputUrl" id="inputUrl" />
                    <button className="sendButton" type="submit" id="sendButton">Send</button>
                </div>
                <script src="src/App.tsx"></script>
            </body>
        </>
    )
}

export default App