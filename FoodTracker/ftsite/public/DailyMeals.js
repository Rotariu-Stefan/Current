let foodEntriesSets = document.querySelectorAll(".mealsArea .foodEntries");

const addLabel = (element, labelText, labelClass) => {
    const label = element.appendChild(document.createElement("label"));
    label.innerText = labelText;
    label.classList = labelClass;
};

const addFoodEntry = (mealIndex, amount, name_brand, macro, macroRes) => {
    const foodEntry = document.createElement("div");
    foodEntry.classList = "foodEntry lineDown";
    addLabel(foodEntry, amount, "amount");
    addLabel(foodEntry, name_brand, "name_brand");
    addLabel(foodEntry, macro, "macro");
    addLabel(foodEntry, macroRes, "macroRes");

    foodEntriesSets[mealIndex].appendChild(foodEntry);
};

const addButton = document.querySelector(".searchEntry .ftButton");
addButton.addEventListener("click",
    () => addFoodEntry(foodEntriesSets.length - 1, "1", "avocado", "1/1/1", "11/11/11"));

const mealToggleView = (mealIndex) => {
    foodEntriesSets[mealIndex].classList.toggle("hidden");
}

const dropThings = document.querySelectorAll(".mealTitle img");
dropThings.forEach((x, i) => x.addEventListener("click", () => mealToggleView(i)));

const mealsArea = document.querySelector(".mealsArea");
const addDefaultMeal = () => {
    const mealArea = mealsArea.appendChild(document.createElement("div"));
    mealArea.classList = "mealArea boxShow";

    const mealTitle = mealArea.appendChild(document.createElement("div"));
    mealTitle.classList = "mealTitle lineDown";
    mealTitle.innerText = "Meal" + (foodEntriesSets.length + 1);
    const dots = mealTitle.appendChild(document.createElement("img"));
    dots.setAttribute("src", "PLACEHOLDER IMAGE");
    dots.setAttribute("alt", "...");

    const note = mealArea.appendChild(document.createElement("div"));
    note.classList = "note lineDown";
    const notei = note.appendChild(document.createElement("img"));
    notei.setAttribute("src", "SitePics/star.png");
    notei.setAttribute("alt", "[STAR]");
    const notel = note.appendChild(document.createElement("label"));
    const notels = notel.appendChild(document.createElement("span"));
    notels.innerText = "Meal Note Title";
    notel.appendChild(document.createTextNode("Note Text asd asd dsa"));

    const foodEntries = mealArea.appendChild(document.createElement("div"));
    foodEntries.classList = "foodEntries lineDown";

    const mealTotal = mealArea.appendChild(document.createElement("div"));
    mealTotal.classList = "mealTotal";
    let someText = mealTotal.appendChild(document.createElement("span"));
    someText.innerText = "Meal Total";
    someText = mealTotal.appendChild(document.createElement("label"));
    someText.innerText = "0/0/0";

    let WTF = foodEntriesSets.length;
    dots.addEventListener("click", () => mealToggleView(WTF));

    foodEntriesSets = document.querySelectorAll(".mealsArea .foodEntries");
};

document.querySelector(".newMeal").addEventListener("click",
    () => addDefaultMeal());