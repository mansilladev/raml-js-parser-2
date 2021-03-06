console.log('RAML 1.0 JS Parser Test');

var path = require("path");
var raml1Parser = require('../src/raml1Parser');
var XMLHttpRequestConstructor = require("xmlhttprequest").XMLHttpRequest;
var fs = require("fs")

raml1Parser.loadApiAsync("https://raw.githubusercontent.com/raml-apis/XKCD/production/api.raml",{
	
	expandTraitsAndResourceTypes: false,
	fsResolver: {
		content: function(path){ return fs.readFileSync(path).toString(); },
		list: function(path){ return fs.readDirSync(path); }
	},
	httpResolver:{
		getResource: function(path){
			var xhr = buildXHR( );
			xhr.open("get", path, false);
			xhr.send();
			var response = toResponse(xhr);			
			return ;
		},
		getResourceAsync: function(path){
			var xhr = buildXHR( );
			return new Promise(function(resolve, reject){
				xhr.open("get", path, true);
				xhr.onload = function() {
					var response = toResponse(xhr);
	                resolve(response);
	            };
	            xhr.onerror = function() {
	                reject({errorMessage:"Network Error"});
	            };
	            xhr.send();
			});
		}
	}
}).then( function(api){
	console.log('GOT api')
	if(api.errors()){
		console.log('GOT ERRORS')
	}
    api.errors().forEach(function(x){
        console.log(JSON.stringify({
            code: x.code,
            message: x.message,
            path: x.path,
            start: x.start,
            end: x.end,
            isWarning: x.isWarning
            },null,2));
        });

    console.log( "Some method name: " + api.resources()[0].methods()[0].method() );
    console.log(JSON.stringify(raml1Parser.toJSON(api), null, 2));
},function(err){
	console.log(err);
});

function toResponse(xhr){
	var status = xhr.status;
	if(status>300&&status<400){
		response = { errorMessage: "Redirect is not supported in thes implementation of HttpResolver" }
    }
	else if(status>399){
		var msg = "Network error";
		if(xhr.statusText){
			msg += ": " + xhr.statusText;
		}
		response = { errorMessage: msg }
	}
	else{
		response = { content: xhr.responseText };
	}
	return response;
}

function buildXHR( ){
    var x = new XMLHttpRequestConstructor;
    return x
}
