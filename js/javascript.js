
const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false,
		inputBackgroundColor : "red",
		inputFontColor : "blue",
		height : "240px",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "white"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 100);
}
