const fs = require('fs');

class Storage
{	constructor( fileName )
	{	this.fileName = fileName;
		this.load( );

		process.on( 'exit', this.save );
		process.on( 'SIGINT', ( ) =>
		{
			this.save( );
			process.exit( );
		});
	}

	load( )
	{	try
		{	var data = fs.readFileSync( this.filePath( ) );
			this.data = JSON.parse( data.toString( ) );
		}
		catch( error )
		{	if( error.code == "ENOENT" );
				return this.reset( );
			throw error;
		}
	}

	reset( )
	{	this.data = {};
		this.save( );
	}

	save = ( ) =>
	{	 fs.writeFileSync( this.filePath( ), JSON.stringify( this.data ) );
	}

	filePath( )
	{	return `./${this.fileName}.json`;
	}
}

module.exports = Storage;


