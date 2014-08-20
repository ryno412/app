module.exports = function(grunt) {
    var glog = grunt.log.write;
    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    namespace: "templates",
                    amd : true,
                    processName: function(filePath) { // input:  templates/_header.hbs
                        //just use the view name as template key
                        var pieces = filePath.split("/");
                        var input = pieces[pieces.length - 1];
                        var output = input.substr(0, input.lastIndexOf('.')) || input;
                        glog('compiling template-- ' + output + ' ').ok();
                        return output;
                    }
                },
                files: {
                    'public/js/templates.js': "client/templates/*.hbs"
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./client/scripts/",
                    mainConfigFile: "./client/scripts/main.js",
                    useStrict: true,
                    name: "main",
                    optimize : 'none',
                    out: "public/js/main.js",
                    done: function(done, output) {
                        try {
                            var duplicates = require('rjs-build-analysis').duplicates(output);

                            if (duplicates.length > 0) {
                                grunt.log.subhead('Duplicates found in requirejs build:');
                                grunt.log.warn(duplicates);
                                done(new Error('r.js built duplicate modules, please check the excludes option.'));
                            }
                            done();
                        }
                        catch (e) {
                            grunt.log.warn('something when wrong with require',e);
                        }

                    }
                }
            }
        },
        bowercopy: {
            options: {
                // Task-specific options go here
            },
            // Javascript
            libs: {
                options: {
                    destPrefix: 'public/js/libs'
                },
                files: {
                    'jquery.js': 'jquery/jquery.js',
                    'require.js': 'requirejs/require.js',
                    'handlebars.js': 'handlebars/handlebars.js',
                    'backbone.js': 'backbone/backbone.js'
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        watch: {
            options: {
                livereload: false,
                reload: true
            },
            scripts: {
                files: ['client/scripts/*.js', 'server.js', 'client/templates/*.hbs', 'client/styles/*.scss'],
                tasks: ['handlebars','compass','requirejs'],
                options: {
                }
            },
            express: {
                files:  [ 'server.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
                }
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: 'client/styles/',
                cssDir: 'public/css'
            },
            dist: {

            },
            server: {
                options: {
                    //debugInfo: true
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');


    grunt.registerTask('server', ['handlebars:compile', 'compass', 'requirejs','express:dev','watch']);
    grunt.registerTask('default', 'YO.', function() {
        grunt.log.write('Yo what are you doing?...Get to work').ok();
    });

};