//Function to get user information
export async function getData() {
  try {
    const response = await fetch("https://api.github.com/users/FreddyGuapi");
    if (!response.ok) {
      throw new NetworkError();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

//Custom message for the error when losing the api
class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}

//Function to get the list of projects
export async function getList() {
  //We call the user's api and access the projects, passing the url as another api
  let url = "";
  await getData().then((list) => {
    url = list;
  });

  //We register the url of the api in a constant
  const res = url.repos_url;

  const response = await fetch(res);
  const list = await response.json();
  return list;
}
