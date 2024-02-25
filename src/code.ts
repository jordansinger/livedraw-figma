let preview,
  promptLayer = null;

var promptText = "a sunset at a tropical beach with palm trees";

let setupCanvas = async () => {
  let autolayout = figma.createFrame();
  autolayout.x = figma.viewport.center.x - 256;
  autolayout.y = figma.viewport.center.y - 256;
  autolayout.name = "🖼️ Image";
  autolayout.fills = [];

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  promptLayer = figma.createText();
  promptLayer.y -= 100;
  promptLayer.characters = promptText;
  promptLayer.fontSize = 24;
  promptLayer.textAlignHorizontal = "CENTER";
  preview = figma.createRectangle();
  preview.name = "▶️ Preview";
  preview.resize(512, 512);
  preview.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  preview.locked = true;

  autolayout.appendChild(preview);
  autolayout.appendChild(promptLayer);
  autolayout.layoutMode = "VERTICAL";
  autolayout.primaryAxisSizingMode = "AUTO";
  autolayout.counterAxisSizingMode = "AUTO";
  autolayout.itemSpacing = 20;

  promptLayer.layoutSizingHorizontal = "FILL";

  figma.currentPage.selection = [promptLayer];
};

setupCanvas();

figma.showUI(__html__, { visible: false });

let sendMessages = async () => {
  console.log("sending messages");
  console.log(promptText);
  figma.ui.postMessage({
    type: "drawingUpdated",
    prompt: promptText,
  });
};

sendMessages();

figma.on("documentchange", async (event) => {
  for (const change of event.documentChanges) {
    // check if change id is the text prompt layer id
    let nodeID = change.id;
    let node = figma.getNodeById(nodeID);
    if (node != null && node.id === promptLayer.id) {
      await figma.loadFontAsync(promptLayer.fontName);
      promptText = promptLayer.characters;
      console.log("promptText", promptText);
      sendMessages();
    }
  }
});

figma.ui.onmessage = (msg) => {
  console.log("received message");
  if (msg.type === "renderImage") {
    console.log(msg);
    let image = figma.createImage(msg.image);
    preview.fills = [
      { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
      { type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" },
    ];
  }
};
