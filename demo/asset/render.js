/* DOM-based rendering (Uses 3D when available, falls back on margin when transform not available) */
var render = (function() {
	
	var engine;
	if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
		engine = 'presto';
	} else if ('MozAppearance' in docStyle) {
		engine = 'gecko';
	} else if ('WebkitAppearance' in docStyle) {
		engine = 'webkit';
	} else if (typeof navigator.cpuClass === 'string') {
		engine = 'trident';
	}
	
	var vendorPrefix = {
		trident: 'ms',
		gecko: 'Moz',
		webkit: 'Webkit',
		presto: 'O'
	}[engine];
	
	var helperElem = document.createElement("div");
	
	var perspectiveProperty = vendorPrefix + "perspective";
	var transformProperty = vendorPrefix + "transform";
	
	if (helperElem.style[perspectiveProperty]) {
		
		return function(left, top, zoom) {
			content.style[perspectiveProperty] = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
		};	
		
	} else if (helperElem.style[transformProperty]) {
		
		return function(left, top, zoom) {
			content.style[transformProperty] = 'translate(' + (-left) + 'px,' + (-top) + 'px) scale(' + zoom + ')';
		};
		
	} else {
		
		return function(left, top, zoom) {
			content.style.marginLeft = left ? (-left) + 'px' : '';
			content.style.marginTop = top ? (-top) + 'px' : '';
			content.style.zoom = zoom || '';
		};
		
	}
})();

