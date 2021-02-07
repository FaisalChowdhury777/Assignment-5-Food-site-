
const searchFoods = () => {
    const txtSearch = document.getElementById('search-food').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${txtSearch}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.meals);
            displayfoods(data.meals);
        })
        .catch(error => displayError('The Food you are finding is not available'));
}


const displayfoods = foods => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    foods.forEach(food => {
        const foodDiv = document.createElement('div');
        const ingredients = food.strInstructions.replace(/(\r\n|\r|\n)/g, '<br>');
        console.log(ingredients);
        // console.log(food.strInstructions)
        foodDiv.className = 'single-result col-md-3 foodImg align-items-center my-3 p-3';
        foodDiv.innerHTML = `
        <div onclick="getdet('${food.strMeal}','${food.idMeal}', '${food.strMealThumb}', '${ingredients}')">
            
        <div class="cardInside">
        <div class="">
        <div class="d-flex justify-content-center">
        <img src=${food.strMealThumb} class="card-img-top" alt="...">
        </div>
        <div class="card-body text-center">
        <b class="card-text">${food.strMeal}</b>
</div>
</div>
    
        </div>
        <div class="col-md-3 text-md-right text-center">
        </div>
        
            </div>

        `;
        foodContainer.appendChild(foodDiv);
    })
}
const getdet = async (strMeal, idMeal, strMealThumb, ingredients) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaydets(idMeal, strMeal, strMealThumb, ingredients);
    }
    catch (error) {
        displayError('No details found sorry')
    }
}


const displaydets = (dets, strMeal, strMealThumb, ingredients) => {
    const detsDiv = document.getElementById('food-container');
    detsDiv.innerHTML = `<div  class=" mx-auto py-4">
    <div class="ingredients">
    <img src="${strMealThumb}" alt=""> <br>
        <h4 align=left>${strMeal}</h4>       
        <p align=left>${ingredients}</p>       
        
    </div>
    
    
`;
    // displayfoods(false);
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}