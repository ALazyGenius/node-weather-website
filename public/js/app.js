const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

const serviceCall = (address) => {
  const url = `/weather?address=${address}`;
  const promise = fetch(url);
  promise.then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = "Loading...";
  message2.textContent = "";
  serviceCall(search.value);
});
