const navigation = document.querySelector(".navigation");
const navArr = Array.from(navigation.children);
const main = document.querySelector("main");
const content = document.querySelector(".content");
const modal = document.querySelector(".modal");
const form = document.querySelector("form");
const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  return data;
};
get("http://localhost:3000/groups").then((data) => {
  const dataArr1 = Array.from(data);
  dataArr1.forEach((item) => {
    const btn = document.createElement("button");
    const mainInner = () => {
      const box = document.createElement("div");
      content.appendChild(btn);
      box.innerHTML=''
      box.classList = "box";
      content.appendChild(box);
      btn.innerHTML = "Create";
      btn.addEventListener("click", () => {
        modal.style.display = "flex";
      });
      console.log(item);
      const card = document.createElement("div");
      box.appendChild(card);
      card.classList = "card";
      card.innerHTML = `
              <h2>${item.name} ${item.surname}</h2>
              <p>Gender: ${item.gender}</p>
              <h3>Accuracy: ${item.accuracy}</h3>`;
      const img = document.createElement("img");
      if (item.gender === "male") {
        img.src = "./img/man.png";
      } else {
        img.src = "./img/woman.png";
      }
      card.prepend(img);
    };
    const studentInner = () => {
      content.innerHTML = "student";
    };
    navArr.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.id === "main") {
          console.log(e.target.id);
          mainInner();
        } else if (e.target.id === "students") {
          studentInner();
        }
      });
    });
  });
});
const post = async (name, surname, gender, accuracy) => {
  try {
    const response = await fetch("http://localhost:3000/groups/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        gender: gender,
        accuracy: accuracy,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.style.display = "none";
  form.cancel.addEventListener("click", () => {
    modal.style.display = "none";
  });
  post(
    form.name.value,
    form.surname.value,
    form.gender.value,
    form.accuracy.value
  );
});
