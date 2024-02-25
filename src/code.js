var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let section, preview, promptText = null;
let setupCanvas = () => {
    promptText = figma.createText();
    promptText.characters = "Prompt";
    preview = figma.createFrame();
    preview.name = "▶️ Preview";
    preview.resize(512, 512);
    preview.locked = true;
};
setupCanvas();
figma.showUI(__html__, { visible: false });
let sendMessages = () => __awaiter(this, void 0, void 0, function* () {
    // convert drawing to base 64
    let duplicate = section.clone();
    duplicate.x = -999;
    duplicate.y = -999;
    let prvw = duplicate.findOne((n) => n.type === "FRAME");
    if (prvw) {
        prvw.visible = false;
    }
    const bytes = yield duplicate.exportAsync({
        format: "JPG",
        constraint: { type: "SCALE", value: 1 },
    });
    duplicate.remove();
    // convert uint8array to base64
    let base64 = figma.base64Encode(bytes);
    base64 = "data:image/jpeg;base64," + base64;
    figma.ui.postMessage({
        type: "drawingUpdated",
        drawing: base64,
        prompt: section.name,
    });
});
sendMessages();
figma.on("documentchange", (event) => {
    for (const change of event.documentChanges) {
        // check if change id is inside of the drawing node
        // recursively check the parent.id of the node
        let nodeID = change.id;
        let node = figma.getNodeById(nodeID);
        if (node === null || node.id === preview.id) {
            return;
        }
        let parent = node.parent;
        while (parent) {
            if (parent.id === section.id || nodeID === section.id) {
                sendMessages();
                break;
            }
            parent = parent.parent;
        }
    }
});
figma.ui.onmessage = (msg) => {
    if (msg.type === "renderImage") {
        let base64 = msg.image.replace("data:image/jpeg;base64,", "");
        let hash = figma.base64Decode(base64);
        let image = figma.createImage(hash);
        preview.backgrounds = [
            { type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" },
        ];
    }
};
