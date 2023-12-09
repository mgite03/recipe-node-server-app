import * as dao from "./dao.js";
function RecipeRoutes(app) {
    
    const getRecipeList = async (req, res) => {
        const size = req.params.size;
        const tags = req.params.tags;
        const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=${size}&tags=${tags}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.APIKEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        fetchApi = await fetch(url, options)
        recipes = await fetchApi.json
        res.json(recipes);
    };

    app.get(url, getRecipeList);
} export default RecipeRoutes;
