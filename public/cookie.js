const input = document.querySelector("input[name='name']");
const setBtn = document.querySelector("#set-js-cookie");
const getBtn = document.querySelector("#get-js-cookie");
const cookieVal = document.querySelector("#cookie-val");

setBtn.addEventListener("click", (e) => {
  const val = input.value;
  Cookies.set("name", val);
  e.preventDefault();
});

getBtn.addEventListener("click", () => {
  console.log(Cookies.get("name"));
  cookieVal.innerHTML = Cookies.get("name");
});
