const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/DEMO';
const recipesContainer = document.querySelector('#recipes');

const state = {
    recipes: [],
}

const getRecipes = async () => {
    try {
        const response = await fetch(`${API_URL}/recipes`);
        const recipes = await response.json();

        return recipes.data;
    } catch (e) {
        console.error(`Failed to fetch recipes.`, e);

        return [];
    }
}

const deleteRecipe = async (id) => {
    try {
        await fetch(`${API_URL}/recipes/${id}`, {
            method: 'DELETE',
        });
        await renderPage();
    } catch (e) {
        console.error(`Failed to delete recipe with ID: ${id}`, e);
    }
};

const createRecipeItem = (recipe) => {
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('recipe_item');

    const recipeImg = document.createElement('img');
    recipeImg.src = recipe.imageUrl;
    const recipeHeader = document.createElement('h4');
    recipeHeader.textContent = recipe.name;
    const recipeSteps = document.createElement('p');
    recipeSteps.textContent = recipe.description;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Recipe';
    deleteButton.addEventListener('click', () => {
        deleteRecipe(recipe.id);
    });

    recipeContainer.append(recipeHeader, recipeImg, recipeSteps, deleteButton);

    return recipeContainer;
};

async function renderPage() {
    while (recipesContainer.children.length) {
        const child = recipesContainer.firstChild;
        recipesContainer.removeChild(child);
    }

    const recipes = await getRecipes();

    state.recipes = recipes;

    state.recipes.forEach((recipe) => {
        const recipeContainer = createRecipeItem(recipe);

        recipesContainer.appendChild(recipeContainer);
    });
}

renderPage();
