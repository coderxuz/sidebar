const navigation = document.querySelector(".navigation");
const navArr = Array.from(navigation.children);
const main = document.querySelector("main");

const get = async (resurs) => {
  const request = await fetch(resurs);
  const data = await request.json();
  return data;
};
get("http://localhost:3000/groups").then((data) => {
  console.log(data);
  console.log(typeof(data));
  const dataArr =Array.from(data)
  dataArr.forEach((item)=>{
    
  })
});
const mainInner = () => {
  main.innerHTML = ``;
};

const studentInner = () => {
  main.innerHTML = "student";
};

navArr.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id === "main") {
      mainInner();
    } else if (e.target.id === "students") {
      studentInner();
    }
  });
});
