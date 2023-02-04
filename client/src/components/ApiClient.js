const baseUrl = "http://localhost:4000";

// FOR LOGIN 

export const login = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    console.log('help Im stuck in the api service')
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    });
    const data = await response.json;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// FOR CHARACTER INTERACTION 

export const startDialogue = async (character) => {
  try {
    const response = await fetch(`${baseUrl}/character`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({character : character})
    })
    return response.json()
  }
   catch (err) {
  console.log(err)
  return false
}
}

export const createDialogue = async (dialogue) => {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dialogue),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

