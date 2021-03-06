/**
 * Posts a message to a Webex Teams space via a Bot account
 *
 * Prep work:
 *      from a ssh session, type the commands below:
 *      > xConfiguration HttpClient Mode: On
 *      > xConfiguration HttpClient AllowInsecureHTTPS: True
 *
 */
 
const xapi = require('xapi');

function push(msg, cb) {

  // Replace with your bot token
  const token = "YTJkZDlmZjAtMGM3NS00MDUxLWIzNzItNmU0M2I2MDE0ZGRmODcwMTExZGUtNzU0"
  // replace with a space your bot is part of
  const roomId = "Y2lzY29zcGFyazovL3VzL1JPT00vYmEzlkNDktZmI5NTAxNDlhODVl"
  
  // Post message
  let payload = {
    "markdown": msg,
    "roomId": roomId
  }
  xapi.command(
    'HttpClient Post',
    {
      Header: ["Content-Type: application/json", "Authorization: Bearer " + token],
      Url: "https://api.ciscospark.com/v1/messages",
      AllowInsecureHTTPS: "True"
    },
    JSON.stringify(payload))
    .then((response) => {
      if (response.StatusCode == 200) {
        console.log("message pushed to Webex Teams")
        if (cb) cb(null, response.StatusCode)
        return
      }
            
      console.log("failed with status code: " + response.StatusCode)
      if (cb) cb("failed with status code: " + response.StatusCode, response.StatusCode)
    })
    .catch((err) => {
      console.log("failed with err: " + err.message)
      if (cb) cb("Could not post message to Webex Teams")
    })
}

push('Hi, this is Steve! I am performing well so far...', console.log)
