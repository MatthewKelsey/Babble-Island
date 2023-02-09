

const player = require("play-sound")();
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const client = new textToSpeech.TextToSpeechClient();

exports.synthesizeSpeech = async (req,res)=>{

  const client = new textToSpeech.TextToSpeechClient();
console.log(req.body.text, 'life is beautiful')
  const request = {
    input: { text: req.body.text },
    voice: { languageCode: "es-ES", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const buffer = Buffer.from(response.audioContent)
console.log(buffer)
res.set({ 'Content-Type': 'application/octet-stream' });
res.send(buffer)
// Return the binary data in the response

  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile("output4.mp3", response.audioContent, "binary");
  // console.log("Audio content written to file: output.mp3");
  // player.play(response.audioContent);
}
