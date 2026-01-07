const html = `<aero-resizable-box id="rb" resize-bottom resize-right resizer-color="#C5D89D">
	<div style="background-color: #F6F0D7; width: 10px; height: 10px;"></div>
	<div style="background-color: #C5D89D; width: 10px; height: 10px;"></div>
	<div style="background-color: #9CAB84; width: 10px; height: 10px;"></div>
</aero-resizable-box>`;

const css = `aero-resizable-box {
	display: flex;
	justify-content: center;

	width: 300px;
	height: 50px;
	border: 1px solid #ccc;
}`;

const js = `const rb = document.getElementById('rb')
rb.addEventListener("aero-resize-start", (e) => {
	console.log("[resize-start] width: ", e.detail.width, " height: ", e.detail.height, " edge: ", e.detail.edge);
})
rb.addEventListener("aero-resize", (e) => {
	console.log("[resize] width: ", e.detail.width, " height: ", e.detail.height);
})
rb.addEventListener("aero-resize-end", (e) => {
	console.log("[resize-end] width: ", e.detail.width, " height: ", e.detail.height);
})
`;

export const aeroResizableBox = {
	html: html,
	css: css,
	js: js,
};
