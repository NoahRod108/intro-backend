const form = document.getElementById("form");
const data = document.getElementById("data");
const getData = document.getElementById("get-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  //Username and password array
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/users/login",
      formObj,
    );

    localStorage.setItem("token", res.data.token);
    console.log("User signed up!");
  } catch (error) {
    localStorage.removeItem("token");
  }
});

getData.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:4000/api/v1/users/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data.innerHTML = `<h1>Hello, ${res.data.message}</h1>`;
  } catch (error) {
    data.innerHTML = `<h1>${error.response.data.message}</h1>`;
  }
});
