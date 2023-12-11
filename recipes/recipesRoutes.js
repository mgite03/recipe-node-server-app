import * as dao from "./recipesDao.js"
import "dotenv/config";

function RecipeRoutes(app) {
    // API Key + host stuff here, This stays the same when doing any request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    // # of recipes we get per api request for a list of recipes
    const recipe_list_size = 10;

    // Hand in tags or not to get the list of recipes
    // Each recipe json has it's own id, thumbnail and maybe a video so check video_url
    const getRecipeList = async (req, res) => {
        const tags = req.params.tags; // &tags=<whatever tag you want>
        const ingredients = req.params.ingredients; // &q=<whatever ingredients>
        const detailsToRequest = req.body;
        let url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=${recipe_list_size}`
        if (tags !=  undefined) {
            console.log(tags)
            url += `&tags=${tags}`;
        } 
        if (ingredients != undefined) {
            console.log(ingredients)
            url += `&q=${ingredients}`;
        }
        if (detailsToRequest != undefined) {
            url += detailsToRequest
        }
        try {
            // Reponse is a 2d array with count (int) and the results (array with all the info about the recipe)
            const response = await fetch(url, options);
            const responseJson = await response.json(); 
            // Returns only the results data (the recipe data) of the api response
            res.json(responseJson.results) 
        } catch (error) {
            console.error(error);
        }
    };

    // Used to get more info but also instructions for the recipe.
    const getRecipeMoreInfo = async (req, res) => {
        const recipeId = req.params.recipeId; 
        const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`
        let options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        try {
            // Reponse consist of only the array of data.
            const response = await fetch(url, options);
            const result = await response.json(); 
            res.json(result)
        } catch (error) {
            console.error(error);
        }
    };

    // Front-End processes the data, follow recipes\recipesSchema.js when creating a recipe
    const saveRecipe = async (req, res) => {
        const recipe = await dao.createUser(req.body);
        res.json(recipe);
    };

    const getSavedUserRecipes = async (req, res) => {
        const { userId } = req.params
        const recipes = await dao.findUserRecipes(userId)
        console.log(recipes)
        res.json(recipes)
    }

    app.get('/api/recipes/:tags/:ingredients', getRecipeList);
    app.get('/api/recipes/:tags', getRecipeList);
    app.get('/api/recipes', getRecipeList); // Try to use this 
    app.get('/api/recipes/more-info/:recipeId', getRecipeMoreInfo)
    app.post('/api/recipes', saveRecipe)
    app.get('/api/recipes/user/:userId', getSavedUserRecipes)
} export default RecipeRoutes;
