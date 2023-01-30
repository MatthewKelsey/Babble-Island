const root = "http://localhost:4000/";


export const login = async (user) => {
  try {
    const response = await fetch(root + "login", {
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
    const response = await fetch(root + "register", {
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
    const response = await fetch(root + "logout", {
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

