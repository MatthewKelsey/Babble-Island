const baseUrl = 'http://localhost:4000';
// const texToSpeech = require('@google-cloud/text-to-speech')
// const fs = require('fs')
// const util = require('util')
// const client = new textToSpeech.TextToSpeechClient()
// const text = 'hello world'
// const outputFile = './'


// const request = {
//   input:{text: text},
//   voice:{languageCode: 'en-US', ssmlGender: 'FEMALE'},
//   audioConfig: {audioEncoding: 'MP3'},
// };
// export async function reader(){
// const [response]= await client.synthesizeZpeech(request)
// const writeFile= util.promisify(fs.writeFile);
// await writeFile(outputFile, response.audioContent, 'binary')
// console.log('Audio content written to file')}
// // FOR LOGIN

export const login = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (user) => {
  try {
    console.log('help Im stuck in the api service');
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${baseUrl}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(),
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// FOR CHARACTER INTERACTION

export const fetchCharacters = async () => {
  try {
    const res = await fetch(`${baseUrl}/character`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const startDialogue = async (character) => {
  try {
    const response = await fetch(`${baseUrl}/character`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character: character }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createDialogue = async (dialogue) => {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dialogue),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// USER  STARS

export const fetchUserStars = async () => {
  try {
    const res = await fetch(`${baseUrl}/user`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
export const updateStars = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const translateWord = async (word) => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?q=${word}&target=en&source=es&format=text&key=AIzaSyD56Mw8C84FywZbeclWpYNzjNopb1rjqgc`,
      {
        method: 'POST',
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const defineWord = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/es/${word}`,
      {
        method: 'GET',
      }
    );
    return response.json();
  } catch (error) {}
};

export const getBookCollection = async () => {
  try {
    console.log('Im in get book');
    const response = await fetch(`${baseUrl}/stories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const textToSpeech = async (text) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer AIzaSyD56Mw8C84FywZbeclWpYNzjNopb1rjqgc`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: text },
        voice: { languageCode: 'es-ES', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
      }),
    };

    const response = await fetch(
      'https://texttospeech.googleapis.com/v1/text:synthesize',
      requestOptions
    );
    const { audioContent } = await response.json();

    const audioElement = new Audio(`data:audio/mp3;base64,${audioContent}`);
    audioElement.play();
  } catch (error) {
    console.error(error);
  }
};

export const refreshUser = async () => {
  try {
    const response = await fetch(`${baseUrl}/refresh`, {
      credentials: 'include',
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
