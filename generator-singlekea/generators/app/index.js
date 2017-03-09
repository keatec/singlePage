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
            message: 'Do you want to add GITHUB Infos?',
            default: false
        }, {
            type: 'input',
            name: 'devport',
            message: 'Which port do you want to use for grunt Server?',
            default: '9011'
        }, {
            type: 'input',
            name: 'html',
            message: 'Please provide a name for your first html site?',
            default: 'sample'
        }
        
        ]).then((answers) => {
            this.options.appname = answers.name;
            this.options.git = answers.git;
            this.options.devport = answers.devport;
            this.options.html = answers.html;
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
                appname: ''+this.options.appname,
                devport: ''+this.options.devport
            }
        );
        this.fs.copyTpl(
            this.templatePath('default_bower.json'),
            this.destinationPath('bower.json'), {
                appname: ''+this.options.appname,
                devport: ''+this.options.devport
            }
        );
        this.fs.copyTpl(
            this.templatePath('default.js'),
            this.destinationPath('js/'+this.options.appname+'.js'), {
                appname: ''+this.options.appname,
                devport: ''+this.options.devport
            }
        );
        this.fs.copyTpl(
            this.templatePath('default.css'),
            this.destinationPath('css/'+this.options.appname+'.css'), {
                appname: ''+this.options.appname,
                devport: ''+this.options.devport
            }
        );
        this.fs.copyTpl(
            this.templatePath('default.html'),
            this.destinationPath(''+this.options.html+'.html'), {
                appname: ''+this.options.appname,
                devport: ''+this.options.devport
            }
        );
        [
            'gruntfile.js',
            '.gitignore'
        ].map(function (obj) {
            this.fs.copyTpl(
                this.templatePath(obj),
                this.destinationPath(obj), {
                    appname: ''+this.options.appname,
                    devport: ''+this.options.devport
                }
            );

        }.bind(this));
    }

    install() {
        this.installDependencies({
            npm: true,
            bower: false
        })    
    }
    end() {
        this.log('Done');
        this.log('If you have grunt Installed, you may run the server just by typing "grunt"');
    }

};