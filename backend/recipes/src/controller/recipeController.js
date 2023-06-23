import { Recipe } from "../models/recipe.js";


/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Finds a recipe by its id
 *     description: Retrieves the recipe for a given id from the database
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the receipt to get
 *     responses:
 *       '200':
 *         description: Recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 name:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: 4 eggs, salt, pepper
 *                 imagePath:
 *                   type: string
 *                   example: ../images/scrambled_eggs.jpg
 *                 ingredientIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [100001, 100002, 100003]
 *                 ingredientAmountsInGram:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [50, 1400, 360]
 *       '204':
 *         description: No recipe for the given ID was found
 */
export const getRecipe = (req, res) => {
    const id = req.params['id'];

    Recipe.findById(id)
        .then(recipe => {
            if (recipe) {
                console.log('Recipe found: ', recipe['name']);
                return res.status(200).json({ recipe: recipe });
            }
            else {
                console.log('Recipe not found.');
                res.status(204).json('Recipe does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching recipe: ',error);
        });
};


/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Add a recipe
 *     description: Add a recipe to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Scrambled Eggs
 *               desc:
 *                 type: string
 *                 example: 4 eggs, salt, pepper
 *               imagePath:
 *                 type: string
 *                 example: ../images/scrambled_eggs.jpg
 *               ingredientIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [100001, 100002, 100003]
 *               ingredientAmountsInGram:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [50, 1400, 360]
 *     responses:
 *       '201':
 *         description: The created recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 name:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: 4 eggs, salt, pepper
 *                 imagePath:
 *                   type: string
 *                   example: ../images/scrambled_eggs.jpg
 *                 ingredientIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [100001, 100002, 100003]
 *                 ingredientAmountsInGram:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [50, 1400, 360]
 */
export const createRecipe = async (req, res) => {
    //console.log(Object.keys(req));

    const newRecipe = new Recipe({
        name: req.body['name'],
        desc: req.body['desc'],
        imagePath: req.body['imagePath'],
        ingredientIds: req.body['ingredientIds'],
        ingredientAmountsInGram: req.body['ingredientAmountsInGram']
    });

    // check if recipe already exist

    try {
        const savedRecipe = await newRecipe.save();

        console.log('Recipe saved: ', savedRecipe);
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.error('Error saving recipe: ', error);
    }
};


/**
 * @swagger
 * /recipes/{recipeId}:
 *   patch:
 *     summary: Update a recipe
 *     description: Update the information of an existing recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the receipt to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               imagePath:
 *                 type: string
 *                 example: ../images/scrambled_eggs.jpg
 *               ingredientIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [100001, 100002, 100003]
 *               ingredientAmountsInGram:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [50, 1400, 360]
 *     responses:
 *       '200':
 *         description: The updated recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 name:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: 4 eggs, salt, pepper
 *                 imagePath:
 *                   type: string
 *                   example: ../images/scrambled_eggs.jpg
 *                 ingredientIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [100001, 100002, 100003]
 *                 ingredientAmountsInGram:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [50, 1400, 360]
 */
export const updateRecipe = async (req, res) => {
    const recipeId = req.params['id'];

    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, {
            name:                   req.body['name'],
            desc:                    req.body['desc'],
            imagePath:               req.body['imagePath'],
            ingredientIds:           req.body['ingredientIds'],
            ingredientAmountsInGram: req.body['ingredientAmountsInGram']
        }, { new: true });

        console.log('Recipe updated: ', recipe);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error updating recipe: ', error);
    }
};

/**
 * @swagger
 * /recipes/{recipeId}:
 *     delete:
 *       summary: Delete a recipe
 *       description: Delete a recipe from the database
 *       parameters:
 *         - in: path
 *           name: recipeId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the receipt to delete
 *       responses:
 *         '200':
 *           description: The deleted recipe object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6486e12e1848915af487e38d
 *                   name:
 *                     type: string
 *                     example: Scrambled Eggs
 *                   desc:
 *                     type: string
 *                     example: 4 eggs, salt, pepper
 *                   imagePath:
 *                     type: string
 *                     example: ../images/scrambled_eggs.jpg
 *                   ingredientIds:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     minItems: 1
 *                     example: [100001, 100002, 100003]
 *                   ingredientAmountsInGram:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     minItems: 1
 *                     example: [50, 1400, 360]
 */
export const deleteRecipe = async (req, res) => {
    const recipeId = req.params['id'];

    try {
        const recipe = await Recipe.findByIdAndDelete(recipeId);

        console.log('Recipe deleted: ', recipe);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error deleting recipe: ', error);
    }
};