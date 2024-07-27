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
const btn = document.createElement("button");
btn.innerHTML = "Create";
btn.addEventListener("click", () => {
  modal.style.display = "flex";
});

get("http://localhost:3000/students").then((data) => {
  const dataArr1 = Array.from(data);
  const box = document.createElement("div");
  box.prepend(btn);
  const mainInner = (item) => {
    content.appendChild(btn);
    box.classList = "box";
    content.appendChild(box);
    const card = document.createElement("div");
    box.appendChild(card);
    card.classList = "card";
    if (item.accuracy >= 90) {
      card.innerHTML = `
                <h2>${item.name} ${item.surname}</h2>
                <p>Gender: ${item.gender}</p>
                <h3>Accuracy: ${item.accuracy}</h3>
                <h3>Group: ${item.group}</h3>`;
      const img = document.createElement("img");
      if (item.gender === "male") {
        img.src = "./img/man.png";
      } else {
        img.src = "./img/woman.png";
      }
      card.prepend(img);
    }
  };
  const studentInner = () => {
    get("http://localhost:3000/groups").then((data) => {
      const dataArr = Array.from(data);
      const undo = document.createElement("button");
      content.appendChild(undo);
      undo.innerHTML = "undo";
      dataArr.map((e) => {
        console.log(e.name);
        undo.addEventListener('click' , ()=>{
          const boxArr = Array.from(box.childNodes)
          console.log(boxArr);
          boxArr.map((element)=>{
            if(element.classList.value === 'card'){
              box.removeChild(element)
            }
          })
          group(e.name)
        })
        function group(el) {
          const div = document.createElement("div");
          content.appendChild(box);
          box.appendChild(div);
          div.classList = "group";
          div.id = el;
          div.innerHTML = el;

          div.addEventListener("click", (e) => {
            console.log(e.target.id);
            box.innerHTML = "";
            get("http://localhost:3000/students").then((data) => {
              const arrdata = Array.from(data);
              arrdata.map((item) => {
                if (e.target.id === item.group) {
                  const card = document.createElement("div");
                  box.appendChild(card);
                  card.classList = "card";

                  card.innerHTML = `
                        <h2>${item.name} ${item.surname}</h2>
                        <p>Gender: ${item.gender}</p>
                        <h3>Accuracy: ${item.accuracy}</h3>
                        <h3>Group: ${item.group}</h3>`;
                  const img = document.createElement("img");
                  if (item.gender === "male") {
                    img.src = "./img/man.png";
                  } else {
                    img.src = "./img/woman.png";
                  }
                  card.prepend(img);
                }
              });
            });
          });
        }
        group(e.name);
      });
    });
  };
  dataArr1.forEach((item) => {
    mainInner(item);
  });
  navArr.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      content.innerHTML = "";
      box.innerHTML = "";
      if (e.target.id === "main") {
        dataArr1.forEach((item) => {
          mainInner(item);
        });
      } else if (e.target.id === "students") {
        studentInner(item);
      }
    });
  });
});
const post = async (name, surname, gender, accuracy, group) => {
  try {
    const response = await fetch("http://localhost:3000/students/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        gender: gender,
        accuracy: accuracy,
        group: group,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};
get("http://localhost:3000/groups").then((data) => {
  const dataArr2 = Array.from(data);

  dataArr2.forEach((e) => {
    const opt = document.createElement("option");
    form.group.appendChild(opt);
    opt.value = e.name;
    opt.innerHTML = e.name;
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    modal.style.display = "none";
    form.cancel.addEventListener("click", () => {});
    post(
      form.name.value,
      form.surname.value,
      form.gender.value,
      form.accuracy.value,
      form.group.value
    );
  });
});
const out = document.getElementById('out')
out.addEventListener('click', (e)=>{
  e.preventDefault()
  window.open('../index.html' , '_self')
})