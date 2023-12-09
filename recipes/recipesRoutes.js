import * as dao from "./recipesDao.js"

function RecipeRoutes(app) {
    
    const getRecipeList = async (req, res) => {
        // const size = req.params.size;
        // const tags = req.params.tags;
        // const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=${size}&tags=${tags}`;
        const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': "bdca2962e7msh49217335710b68fp1052c1jsn504f42d54e5e",
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        const fetchApi = await fetch(url, options)
        console.log(fetchApi)
        const recipes = await fetchApi.json
        console.log(recipes)
        res.json(recipes);
    };

    app.get('/api/recipes', getRecipeList);
} export default RecipeRoutes;
