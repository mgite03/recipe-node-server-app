import * as dao from "./dao.js";
function RecipeRoutes(app) {
    
    const getRecipeList = async (req, res) => {
        const size = req.params.size;
        const tag = req.params.tag;
        const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'bdca2962e7msh49217335710b68fp1052c1jsn504f42d54e5e',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        fetchApi = await fetch(url, options)
        recipes = await fetchApi.json
        res.json(recipes);
    };

    app.get(url, getRecipeList);
} export default RecipeRoutes;
