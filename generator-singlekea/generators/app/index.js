"use strict";
var Generator = require('yeoman-generator');

module.exports = class extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.argument('appname', {
            type: String,
            required: true
        });
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    prompting() {
        this.log('Install to ' + this.destinationRoot() + ', from ' + this.contextRoot + ', using ' + this.sourceRoot());
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.options.appname // Default to current folder name
        }, {
            type: 'confirm',
            name: 'git',
            message: 'Do you want to add GITHUB Infos?'
        }]).then((answers) => {
            this.options.appname = answers.name;
            this.options.git = answers.git;
        });
    }

    intializing() {
        var done = this.async();
        setTimeout(function () {
            done();
            this.log('Init ' + this.options.appname);
        }.bind(this), 1000);
    }

    writing() {
        this.log('Init ' + this.options.appname);
        this.fs.copyTpl(
            this.templatePath(''+(this.options.git ? 'git' : 'default')+'_package.json'),
            this.destinationPath('package.json'), {
                appname: ''+this.options.appname
            }
        );
    }

    install() {
        /*
        this.installDependencies({
        npm: true,
        bower: true
        });*/
    }
    end() {
        this.log('Done');
    }

};