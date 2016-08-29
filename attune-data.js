/**
 * 
 */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function() {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		if (typeof global === 'object') {
			// Browserify. The calling object `this` does not reference window.
			// `global` and `this` are equivalent in Node, preferring global
			// adds support for Browserify.
			root = global;
		}
		module.exports = factory(root);
	} else {
		// Browser globals (root is window)
		root.ATTUNE = factory(root);
	}
}(this, function() {
	var Data = function() {
		this.source = "js-tiq",
		this.version = "1.0.1",
		this.location = window.location.href,
		this.clientTime = new Date().valueOf(),
		this.environment = "",
		this.siteId = "",
		this.vistorId = "",
		this.customerId = "",
		this.event = "",
		this.pageUrl = "",
		this.userAgent = "",
		this.campaign_name = "",
		this.campaign_id = "",
		this.campaign_source = "",
		this.campaign_medium = "",
		this.campaign_term = "",
		this.campaign_content = "",
		this.categoryId = "",
		this.subCategoryId = "",
		this.orderId = "",
		this.orderTotal = "0.0",
		this.discount = "0.0",
		this.shipping = "0.0",
		this.currency = "USD",
		this.location_zipcode = "",
		this.location_city = "",
		this.location_country = "",

		this.productIds = [],
		this.skuIds = [],
		this.unitPrices = [],
		this.quantities = []
	},
	_method = "POST",
	_endpoint = "https://data-api.attune.co/js/v1/event",
	_timeout = 500,
	_newData = function() {
		return new Data();
	},
	_send = function(data) {
		json = JSON.stringify(data);
		if (typeof XDomainRequest === "undefined") {
			var xhr = new XMLHttpRequest();
			xhr.open(_method, _endpoint, true);
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						// console.log(xhr.responseText);
					} else {
						if (xhr.status === 410) {
							console.error("Version no longer supported");
						} else {
							console.error("Attune http not successful: "+xhr.statusText);
						}
					}
				}
			};
			xhr.onerror = function(e) {
				console.error("Attune error: "+xhr.statusText);
			};
			xhr.send(json);
		} else { // Older IE versions.  no error handling
			var xdr = new XDomainRequest();
			xdr.timeout = _timeout;
			xdr.onload = function() {
				
			};
			xdrResult = xdr.open(_method, _endpoint);
			xdrResult = xdr.send(json);
		}
	},
	_sendWithImage = function(data) {
		var img = new Image();
		img.src = _endpoint + encodeURIComponent(data);
	}
	return {
		send : _send,
		data : _newData
	};
}));
