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
let tableOfStoredItems = new Array();
const componentConvenienceIndex = {1: 1, 2: 8, 3: 12, 4: 15, 5: 2, 6: 21, 7: 9, 8: 22, 9: 18, 10: 23, 11: 3, 12: 4, 13: 6, 14: 11, 15: 7, 16: 19, 17: 5, 18: 10, 19: 13, 20: 14, 21: 16}
let ItemCounter = new Array();
for (let d = 1; d <= 729; d++) {
    ItemCounter[d] = 0;
}

for (let k = 1; k <= 729; k++) {
    tableOfStoredItems[k] = new Array();
}

for (let a = 1; a <= 7; a++) {
    for (let b = 1; b <= 7; b++) {
        for (let c = 1; c <= 8; c++) {
            for (let d = 1; d <= 8; d++) {
                for (let e = 1; e <= 8; e++) {
                    for (let f = 1; f <= 21; f++) {
                        for (let g = 1; g <= 21; g++) {
                            for (let h = 1; h <= 21; h++) {
                                let components = [componentWeightedIndex[a], componentWeightedIndex[b], componentWeightedIndex[c], componentWeightedIndex[d], componentWeightedIndex[e], componentWeightedIndex[f], componentWeightedIndex[g], componentWeightedIndex[h]].sort(function(x,y){return x-y});
                                if (!tableOfRecipes.has(toString(components)) && !wrongRecipes.has(toString(components))) {
                                    let weight = bc.getTotalWeight(components);
                                    if (weight < 41) {
                                        let itemIdForRecipe = bc.calculate(components);
                                        let recipeList = bc.getComponentList(components)
                                        tableOfStoredItems[itemIdForRecipe][ItemCounter[itemIdForRecipe]] = {value: weight, string: recipeList};
                                        tableOfRecipes.add(toString(components));
                                        ItemCounter[itemIdForRecipe] += 1;
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

for (let i = 1; i <= 729; i++) {
    if (tableOfStoredItems[i]) {
        tableOfStoredItems[i].sort(function(x, y){return x.value - y.value});
    }
}

let list = "";
let count = 0;
for (let i = 1; i <= 729; i++) {
    if (tableOfStoredItems[i]) {
        for (let j = 0; j <= Math.min(3, tableOfStoredItems[i].length - 1); j++) {
            list += `Recipe ${j + 1} of Item ID ${i} has a weight of ${tableOfStoredItems[i][j].value} and is made with${tableOfStoredItems[i][j].string}.\n`;
            count++;
        }
    }
}
fs.writeFileSync(`src/bag_of_crafting_recipes.txt`, list);
console.log(`file written with ${count} recipes. hoorah!!!`);

