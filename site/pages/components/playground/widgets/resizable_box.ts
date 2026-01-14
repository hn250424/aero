const html = `<aero-resizable-box id="rb" resize-right resizer-color="#C5D89D">
	<div>
		<span style="background-color: #F6F0D7;"></span>
		<p>Moby-Dick — Herman Melville</p>
	</div>
	<div>
		<span style="background-color: #C5D89D;"></span>
		<p>Jane Eyre — Charlotte Brontë</p>
	</div>
	<div>
		<span style="background-color: #9CAB84;"></span>
		<p>The Brothers Karamazov — Fyodor Dostoevsky</p>
	</div>
</aero-resizable-box>`;

const css = `html, body {
	height: 100%;
}

div {
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 0 10px;
}

span {
	flex-shrink: 0;
	width: 7px;
	height: 7px;
	border-radius: 50%;
}

p {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0;
	font-size; 0.9rem;
}

aero-resizable-box {
	display: block;
	width: 300px;
	height: 90%;
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
