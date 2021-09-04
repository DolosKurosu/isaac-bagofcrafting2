"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlParser = void 0;
const convert = require("xml-js");
class XmlParser {
    static loadPools(xml) {
        let json = convert.xml2js(xml, { compact: true, ignoreCdata: true, ignoreComment: true, ignoreDeclaration: true, ignoreDoctype: true, ignoreInstruction: true, alwaysArray: true });
        return json.ItemPools[0].Pool.map((e) => ({
            name: e._attributes.Name,
            items: e.Item.map((i) => ({
                id: Number(i._attributes.Id),
                weight: Number(i._attributes.Weight)
            }))
        }));
    }
    static loadMeta(xml) {
        let json = convert.xml2js(xml, { compact: true, ignoreCdata: true, ignoreComment: true, ignoreDeclaration: true, ignoreDoctype: true, ignoreInstruction: true, alwaysArray: true });
        let qualities = json.items[0].item.map((e) => ({
            id: Number(e._attributes.id),
            quality: Number(e._attributes.quality),
        }));
        return qualities.reduce((h, i) => (h.set(i.id, i.quality), h), new Map());
    }
    static loadItems(xml) {
        let json = convert.xml2js(xml, { compact: false, ignoreCdata: true, ignoreComment: true, ignoreDeclaration: true, ignoreDoctype: true, ignoreInstruction: true, alwaysArray: true });
        let items = json.elements[0].elements
            .map((e) => ({ type: e.name, name: e.attributes.name, id: Number(e.attributes.id) }));
        items = items.filter(i => i.type == "active" || i.type == "passive" || i.type == "familiar");
        return items.reduce((h, i) => (h.set(i.id, i), h), new Map());
    }
}
exports.XmlParser = XmlParser;
//# sourceMappingURL=XmlParser.js.map