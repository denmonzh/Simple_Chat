import React, {Component} from 'react';
import './App.css';
import openSocket from "socket.io-client";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            message: '',
            messages: []
        };

        this.socket = openSocket('http://192.168.1.5:8000');

        this.socket.on("RECEIVE_MESSAGE", data =>{
            this.addMessage(data)
        })

    }

    componentDidMount() {
      this.socket.on("POST_HISTORY", history => {
          this.setState({messages: history})
      })
    }


    addMessage = data =>{
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages)
    };


    handleChange = (e) => (
        this.setState({
            [e.target.name]: [e.target.value]
        })
    );


    handleSendMessage = (e) => {
        e.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        });
        this.setState({message:''})
    };


    render() {

        const {messages} = this.state;

        return (
            <div className="App">
                <div>
                    <label>Author</label>
                    <input
                        value={this.state.username}
                        name='username'
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label>Message</label>
                    <input
                        value={this.state.message}
                        name='message'
                        onChange={this.handleChange}
                    />
                </div>

                <button
                    onClick={this.handleSendMessage}
                >
                    Send
                </button>
                {
                    messages.map((item, index) =>(
                        <div key={index}>
                            <span>{item.author} : {item.message}</span>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default App;
