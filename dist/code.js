/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/***/ (function() {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let section, preview = null;
let setupCanvas = () => {
    preview = figma.createFrame();
    preview.name = "▶️ Preview";
    preview.resize(512, 512);
    preview.locked = true;
    section = figma.createSection();
    section.name = "a sunset at a tropical beach with palm trees";
    section.fills = [];
    section.resizeWithoutConstraints(512, 512);
};
setupCanvas();
figma.showUI(__html__, { visible: false });
let sendMessages = () => __awaiter(this, void 0, void 0, function* () {
    // convert drawing to base 64
    let duplicate = section.clone();
    duplicate.x = -999;
    duplicate.y = -999;
    let prvw = duplicate.findOne(n => n.type === "FRAME");
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
            if (parent.id === section.id ||
                nodeID === section.id) {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/code.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHlCQUF5QjtBQUMvQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYyx5REFBeUQ7QUFDdkU7QUFDQTtBQUNBOzs7Ozs7OztVRTNFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1yZWFjdC8uL3NyYy9jb2RlLnRzIiwid2VicGFjazovL3dlYnBhY2stcmVhY3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLXJlYWN0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly93ZWJwYWNrLXJlYWN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmxldCBzZWN0aW9uLCBwcmV2aWV3ID0gbnVsbDtcbmxldCBzZXR1cENhbnZhcyA9ICgpID0+IHtcbiAgICBwcmV2aWV3ID0gZmlnbWEuY3JlYXRlRnJhbWUoKTtcbiAgICBwcmV2aWV3Lm5hbWUgPSBcIuKWtu+4jyBQcmV2aWV3XCI7XG4gICAgcHJldmlldy5yZXNpemUoNTEyLCA1MTIpO1xuICAgIHByZXZpZXcubG9ja2VkID0gdHJ1ZTtcbiAgICBzZWN0aW9uID0gZmlnbWEuY3JlYXRlU2VjdGlvbigpO1xuICAgIHNlY3Rpb24ubmFtZSA9IFwiYSBzdW5zZXQgYXQgYSB0cm9waWNhbCBiZWFjaCB3aXRoIHBhbG0gdHJlZXNcIjtcbiAgICBzZWN0aW9uLmZpbGxzID0gW107XG4gICAgc2VjdGlvbi5yZXNpemVXaXRob3V0Q29uc3RyYWludHMoNTEyLCA1MTIpO1xufTtcbnNldHVwQ2FudmFzKCk7XG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgdmlzaWJsZTogZmFsc2UgfSk7XG5sZXQgc2VuZE1lc3NhZ2VzID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIC8vIGNvbnZlcnQgZHJhd2luZyB0byBiYXNlIDY0XG4gICAgbGV0IGR1cGxpY2F0ZSA9IHNlY3Rpb24uY2xvbmUoKTtcbiAgICBkdXBsaWNhdGUueCA9IC05OTk7XG4gICAgZHVwbGljYXRlLnkgPSAtOTk5O1xuICAgIGxldCBwcnZ3ID0gZHVwbGljYXRlLmZpbmRPbmUobiA9PiBuLnR5cGUgPT09IFwiRlJBTUVcIik7XG4gICAgaWYgKHBydncpIHtcbiAgICAgICAgcHJ2dy52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGJ5dGVzID0geWllbGQgZHVwbGljYXRlLmV4cG9ydEFzeW5jKHtcbiAgICAgICAgZm9ybWF0OiBcIkpQR1wiLFxuICAgICAgICBjb25zdHJhaW50OiB7IHR5cGU6IFwiU0NBTEVcIiwgdmFsdWU6IDEgfSxcbiAgICB9KTtcbiAgICBkdXBsaWNhdGUucmVtb3ZlKCk7XG4gICAgLy8gY29udmVydCB1aW50OGFycmF5IHRvIGJhc2U2NFxuICAgIGxldCBiYXNlNjQgPSBmaWdtYS5iYXNlNjRFbmNvZGUoYnl0ZXMpO1xuICAgIGJhc2U2NCA9IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIiArIGJhc2U2NDtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6IFwiZHJhd2luZ1VwZGF0ZWRcIixcbiAgICAgICAgZHJhd2luZzogYmFzZTY0LFxuICAgICAgICBwcm9tcHQ6IHNlY3Rpb24ubmFtZSxcbiAgICB9KTtcbn0pO1xuc2VuZE1lc3NhZ2VzKCk7XG5maWdtYS5vbihcImRvY3VtZW50Y2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGV2ZW50LmRvY3VtZW50Q2hhbmdlcykge1xuICAgICAgICAvLyBjaGVjayBpZiBjaGFuZ2UgaWQgaXMgaW5zaWRlIG9mIHRoZSBkcmF3aW5nIG5vZGVcbiAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2hlY2sgdGhlIHBhcmVudC5pZCBvZiB0aGUgbm9kZVxuICAgICAgICBsZXQgbm9kZUlEID0gY2hhbmdlLmlkO1xuICAgICAgICBsZXQgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVJRCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUuaWQgPT09IHByZXZpZXcuaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuaWQgPT09IHNlY3Rpb24uaWQgfHxcbiAgICAgICAgICAgICAgICBub2RlSUQgPT09IHNlY3Rpb24uaWQpIHtcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwicmVuZGVySW1hZ2VcIikge1xuICAgICAgICBsZXQgYmFzZTY0ID0gbXNnLmltYWdlLnJlcGxhY2UoXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiLCBcIlwiKTtcbiAgICAgICAgbGV0IGhhc2ggPSBmaWdtYS5iYXNlNjREZWNvZGUoYmFzZTY0KTtcbiAgICAgICAgbGV0IGltYWdlID0gZmlnbWEuY3JlYXRlSW1hZ2UoaGFzaCk7XG4gICAgICAgIHByZXZpZXcuYmFja2dyb3VuZHMgPSBbXG4gICAgICAgICAgICB7IHR5cGU6IFwiSU1BR0VcIiwgaW1hZ2VIYXNoOiBpbWFnZS5oYXNoLCBzY2FsZU1vZGU6IFwiRklMTFwiIH0sXG4gICAgICAgIF07XG4gICAgfVxufTtcbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9zcmMvY29kZS50c1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9