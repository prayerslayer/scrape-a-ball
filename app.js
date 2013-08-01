var express = require( "express" ),
	_ = require( "underscore" ),
	moment = require( "moment" ),
	app = express();

app.configure( function() {
	app.use( express.compress() );
	app.use( express.methodOverride() );
	app.use( express.bodyParser() );
	app.use( express.favicon() );
	app.use( express.logger( 'dev' ) );
});

app.get("/", function( req, res ) {
	res.send( "welcome to scrapable" );
});


// ################ PLAYER ######################

app.get("/player/:id/?", function( req, res ) {
	res.json( req.params.id );
});

app.get("/player/:id/similarity/?", function( req, res ) {
	res.send( "Your request is valid.", 200 );
});

app.get("/player/:id/awards/:year?/?", function( req, res ) {
	// check year
	if ( req.params.year && !parseInt( req.params.year ) )
		res.send( "Invalid year format. Use a valid year or leave it out for career values.", 400 );
	// check that year is not in the future
	var current_date = new Date();
	if ( current_date.getFullYear() < parseInt( req.params.year ) )
		res.send( "Year is in the future.", 400 );
	// check that year is not before first season
	if ( parseInt( req.params.year ) < 1947 )
		res.send( "Year is before first NBA season.", 400 );
	res.send( "Your request is valid.", 200 );
});

app.get("/player/:id/teams/:year?/?", function( req, res ) {
	// check year
	if ( req.params.year && !parseInt( req.params.year ) )
		res.send( "Invalid year format. Use a valid year or leave it out for career values.", 400 );
	// check that year is not in the future
	var current_date = new Date();
	if ( current_date.getFullYear() < parseInt( req.params.year ) )
		res.send( "Year is in the future.", 400 );
	// check that year is not before first season
	if ( parseInt( req.params.year ) < 1947 )
		res.send( "Year is before first NBA season.", 400 );
	res.send( "Your request is valid.", 200 );
});

// outputs player statistics
app.get("/player/:id/stats/:stat_type?/:calc_type?/:year?/?", function( req, res ) {
	if ( req.params.year && !parseInt( req.params.year ) )
		res.send( "Invalid year format. Use a valid year or leave it out for career values.", 400 );
	// check that year is not in the future
	var current_date = new Date();
	if ( current_date.getFullYear() < parseInt( req.params.year ) )
		res.send( "Year is in the future.", 400 );
	// check that year is not before first season
	if ( parseInt( req.params.year ) < 1947 )
		res.send( "Year is before first NBA season.", 400 );
	// check format of stat types
	if ( req.params.stat_type ) {
		var validStatTypes = [ "season", "playoffs", "allstar", "all" ];
		if ( !_.contains( validStatTypes, req.params.stat_type ) )
			res.send( "Invalid stat type. Use 'season', 'playoffs', 'allstar' or 'all' for a combination of season and playoffs." );
	}
	if ( req.params.calc_type ) {
		var validCalcTypes = [ "total", "pergame", "per36", "per48" ];
		if ( !_.contains( validCalcTypes, req.params.calc_type ) )
			res.send( "Invalid stat calculation type. Use 'total', 'pergame', 'per36' or 'per48'.", 400 );
	}

	res.send( "Your request is valid.", 200 );
});

// ################ GAME ######################

// simple game boxscores
app.get("/game/:away/:home/?", function( req, res ) {
	// check if there is a date
	if ( !req.query[ "date" ])
		res.send( "Date parameter missing", 400);
	// check teams
	if ( !req.params.home )
		res.send( "Home team missing", 400 );
	if ( !req.params.away )
		res.send( "Away team missing", 400 );

	// check date format

	// call database

	// return result as json

	res.send( "Your request is valid.", 200);
});

// ################ TEAM ######################

app.get("/team/:id/?", function( req, res ) {
	res.send( "YOur request is valid.", 200 );
});

app.get("/team/:id/history/?", function( req, res ) {
	res.send( "YOur request is valid.", 200 );
});

app.get("/team/:id/roster/:year?/?", function( req, res ) {
	if ( req.params.year && !parseInt( req.params.year ) )
		res.send( "Invalid year format. Use a valid year or leave it out for career values.", 400 );
	// check that year is not in the future
	var current_date = new Date();
	if ( current_date.getFullYear() < parseInt( req.params.year ) )
		res.send( "Year is in the future.", 400 );
	// check that year is not before first season
	if ( parseInt( req.params.year ) < 1947 )
		res.send( "Year is before first NBA season.", 400 );
	res.send( "YOur request is valid.", 200 );
});

app.get("/team/:id/stats/:stat_type?/:calc_type?/:year?/?", function( req, res ) {
	if ( req.params.year && !parseInt( req.params.year ) )
		res.send( "Invalid year format. Use a valid year or leave it out for career values.", 400 );
	// check that year is not in the future
	var current_date = new Date();
	if ( current_date.getFullYear() < parseInt( req.params.year ) )
		res.send( "Year is in the future.", 400 );
	// check that year is not before first season
	if ( parseInt( req.params.year ) < 1947 )
		res.send( "Year is before first NBA season.", 400 );
	// check format of stat types
	if ( req.params.stat_type ) {
		var validStatTypes = [ "season", "playoffs", "allstar", "all" ];
		if ( !_.contains( validStatTypes, req.params.stat_type ) )
			res.send( "Invalid stat type. Use 'season', 'playoffs', 'allstar' or 'all' for a combination of season and playoffs." );
	}
	if ( req.params.calc_type ) {
		var validCalcTypes = [ "total", "pergame", "per36", "per48" ];
		if ( !_.contains( validCalcTypes, req.params.calc_type ) )
			res.send( "Invalid stat calculation type. Use 'total', 'pergame', 'per36' or 'per48'.", 400 );
	}
	res.send( "YOur request is valid.", 200 );
});

app.listen( 3333 );