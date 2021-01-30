const sgMail = require('@sendgrid/mail')

const sgApiKey = process.env.SEND_GRID_API_KEY

sgMail.setApiKey(sgApiKey)

const welcomeMessage = (email, name) => {
  sgMail.send({
    to: email,
    from: 'saadgfx97@gmail.com',
    subject: 'Wellcome on board',
    text: `Hi! ${name}, happy to see you on board.`,
  })
}

const farewellMessage = (email, name) => {
  sgMail.send({
    to: email,
    from: 'saadgfx97@gmail.com',
    subject: 'Farewell',
    text: `Sorry to see you going ${name}, hoping to see you next time.`,
  })
}

module.exports = { welcomeMessage, farewellMessage }
