// our lambda will trigger after the user answered all questions.


exports.handler = (event, context, callback) => {
    callback(null, {
      "sessionAttributes": JSON.stringify(event.slots),
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": "We booked your reservation yo!"
        }
      }
    });
  };