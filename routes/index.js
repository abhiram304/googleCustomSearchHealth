
/*
 * GET home page.
 */

exports.healthReq = function(req, res){

	var sentence = req.param("sentence");
	var google = require('google');
	var jsdom = require("jsdom");
	var bodypart = req.param("bodypart");

	google.resultsPerPage = 25;
	var nextCounter = 0;

	google('how to fix '+bodypart, function (err, res2){
		if (err){ console.error(err);}

		//console.log(res2.body);
		

		jsdom.env(
				res2.body,
				["http://code.jquery.com/jquery.js"],
				function (err, window) {
					console.log("contents of a.the-link:", window.$("._o0d").text());
					var resMessage = window.$("._o0d").text();
					
					if(resMessage.length === 0 || !resMessage.trim()){
						res.send({resCode: "4", status: "failure"});
					}
					else{
						res.send({status: "success", resMessage: resMessage});
						}
					
					
				}
		);

		/*for (var i = 0; i < 1; ++i) {
			var link = res.links[i];
			console.log("0000000000000000000000");
			console.log(res);
			console.log("-----------------------");
			console.log(link.title + ' - ' + link.href);
			console.log(link.description + "\n");
		}*/

		/*if (nextCounter < 4) {
			nextCounter += 1
			if (res.next) res.next()
		}*/
	})

};