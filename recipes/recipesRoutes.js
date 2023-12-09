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
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            res.json(result)
        } catch (error) {
            console.error(error);
        }
        
        
    };

    app.get('/api/recipes', getRecipeList);
} export default RecipeRoutes;
