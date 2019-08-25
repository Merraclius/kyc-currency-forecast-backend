let path = require('path');

global.__base = __dirname;
global.__bin = path.join(__dirname, 'bin');
global.__controllers = path.join(__dirname, 'controllers');
global.__modules = path.join(__dirname, 'modules');
global.__tests = path.join(__dirname, 'tests');
