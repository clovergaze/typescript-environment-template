"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: [
                    "src/scripts/*.ts",
                    "test/*.ts"
                ]
            }
        },
        ts: {
            default: {
                options: {
                    verbose: false
                },
                tsconfig: true
            }
        },
        copy: {
            default: {
                expand: true,
                cwd: "src",
                src: ["index.html", "template.min.js"],
                dest: "dist/"
            }
        },
        uglify: {
            default: {
                files: {
                    "src/template.min.js": [
                        "src/scripts/Abstract.js",
                        "src/scripts/Template.js"
                    ]
                }
            }
        },
        clean: {
            development: {
                src: [
                    "src/template.min.js",
                    "src/scripts/*.js*",
                    "test/*.js*"
                ]
            },
            release: {
                src: [
                    "dist"
                ]
            },
            other: {
                src: [
                    ".tscache"
                ]
            }
        },
        watch: {
            config: {
                files: ["Gruntfile.js"],
                options: {
                    reload: true
                }
            },
            default: {
                files: [
                    "tslint.json",
                    "tsconfig.json",
                    "src/scripts/*.ts",
                    "test/*.ts"
                ],
                tasks: ["build"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("build", ["tslint", "clean:development", "ts", "uglify"]);
    grunt.registerTask("release", ["clean:release", "copy"]);

    grunt.registerTask("default", ["build"]);
};
