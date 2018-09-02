import React, { Component } from 'react';
import { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui';
import image from '../../assets/profile.jpg';
import './styles.scss';
export default class Home extends Component {
  state = {
    input: '',
    finalMessage: '',
    messages: [
      new Message({
        id: 1,
        message: 'Hello, how can I help you today?',
      }),
    ],
  };

  onChange = e => {
    const input = e.target.value;
    this.setState({
      input,
    });
  };
  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.submitMessage();
    }
  };
  async submitMessage() {
    const { input } = this.state;
    if (input === '') return;
    const message = new Message({
      id: 0,
      message: input,
    });
    let messages = [...this.state.messages, message];

    this.setState({
      messages,
      input: '',
    });
    const response = await Interactions.send('hollaMOBILEHUB', input);
    const responseMessage = new Message({
      id: 1,
      message: response.message,
    });
    console.log(response);
    messages = [...this.state.messages, responseMessage];
    this.setState({ messages });

    if (response.dialogState === 'Fulfilled') {
      if (response.intentName === 'hollaMOBILEHUB') {
        const {
          slots: { BookTripCheckInDate, BookTripLocation, BookTripNights, BookTripRoomType },
        } = response;
        const finalMessage = `Congratulations! Your trip to ${BookTripLocation}  with a ${BookTripRoomType} rooom on ${BookTripCheckInDate} for ${BookTripNights} days has been booked!!`;
        this.setState({ finalMessage });
      }
    }
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          <div>
            <img src={image} alt="Holla" />
            <p>Ali Alizada</p>
          </div>
          <div className="header-right">
            <i class="fas fa-phone-volume" />
            <i class="fas fa-user-plus" />
            <i class="fas fa-phone-volume" />
          </div>
        </header>
        <div className="chat-container">
          <h2>{this.state.finalMessage}</h2>
          <ChatFeed
            messages={this.state.messages}
            hasInputField={false}
            bubbleStyles={styles.bubbleStyles}
          />
        </div>
        <div className='input-container'>
          <input
            onKeyPress={this._handleKeyPress}
            onChange={this.onChange}
            className="text-input"
            value={this.state.input}
          />
          <i class="fas fa-location-arrow" />
        </div>
      </div>
    );
  }
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
  },
};
//     chatbubble: {
//       borderRadius: 30,
//       padding: 10,
//     },
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 22,
//   },
//   header: {
//     backgroundColor: 'rgb(0, 132, 255)',
//     padding: 20,
//     borderTop: '12px solid rgb(204, 204, 204)',
//   },
//   messagesContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     padding: 10,
//     alignItems: 'center',
//   },
//   input: {
//     fontSize: 16,
//     padding: 10,
//     outline: 'none',
//     width: 350,
//     border: 'none',
//     borderBottom: '2px solid rgb(0, 132, 255)',
//   },
// };
