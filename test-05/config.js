const fs = require('fs');

const config = {
	maxFileSize: '50mb',
	apiVersion: 'v1',
	serverPort: 5000,
	dataBaseName: 'pafZOO',

	dir: {
		logs: 'logs',
		publicAccess: 'assets',
		view: 'view'
	},

	counterId: {
		animal: 'animalCode',
		keeper: 'keeperCode',
	},

	appCodes: {
		animal: 'animalID',
		keeper: 'keeperID',
	},
};

function init() {
	for(let prop in config.dir) {
		if (!fs.existsSync(config.dir[prop])){
	    fs.mkdirSync(config.dir[prop]);
		}

		config.dir[prop] = `${__dirname}/${config.dir[prop]}`;
	}

	config.dir.project = __dirname;
}


init();

module.exports = config;
