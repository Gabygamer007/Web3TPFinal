
const applyStyles = iframe => {
	let styles = {
		fontColor : "#000",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false,
		inputBackgroundColor : "orange",
		inputFontColor : "blue",
		height : "240px",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "white"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 100);
}
