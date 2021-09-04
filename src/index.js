"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const { toString } = require("lodash");
const BagOfCrafting_1 = require("./BagOfCrafting");
const XmlParser_1 = require("./XmlParser");
let pools = XmlParser_1.XmlParser.loadPools(fs.readFileSync('assets/itempools.xml', 'utf8'));
let meta = XmlParser_1.XmlParser.loadMeta(fs.readFileSync('assets/items_metadata.xml', 'utf8'));
let bc = new BagOfCrafting_1.BagOfCrafting(pools, meta);
let wrongRecipes = BagOfCrafting_1.BagOfCrafting.JsIncorrectRecipes;
let tableOfRecipes = new Set();

let list = "";
for (let a = 1; a <= 18; a++) {
    let count = 0;
    if (a != 17) {
        for (let b = 1; b <= 22; b++) {
            if (b != 17) {
                for (let c = 1; c <= 22; c++) {
                    if (c != 17) {
                        for (let d = 1; d <= 22; d++) {
                            if (d != 17) {
                                for (let e = 1; e <= 22; e++) {
                                    if (e != 17) {
                                        for (let f = 1; f <= 22; f++) {
                                            if (f != 17) {
                                                for (let g = 1; g <= 22; g++) {
                                                    if (g != 17) {
                                                        for (let h = 1; h <= 22; h++) {
                                                            if (h != 17) {
                                                                let components = [a, b, c, d, e, f, g, h].sort(function(x,y){return x-y});
                                                                if (!tableOfRecipes.has(toString(components)) && !wrongRecipes.has(toString(components))) {
                                                                    let weight = bc.getTotalWeight(components);
                                                                    if (weight < 36) {
                                                                        let itemIdForRecipe = bc.calculate(components);
                                                                        count++;
                                                                        tableOfRecipes.add(toString(components));
                                                                        let recipeList = bc.getComponentList(components);
                                                                        list += `Recipe ID ${count} = ${itemIdForRecipe} with weight of ${weight} using components${recipeList}.\n`;
                                                                        if (count == 100000) {
                                                                            fs.writeFileSync('src/bag_of_crafting_recipes.txt', list);
                                                                            console.log("file written");
                                                                            return;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}