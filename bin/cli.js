#!/usr/bin/env node
var scrape = require('../index.js').scrape,
    optimist = require('optimist'),
    argv = optimist
            .usage('Usage: $0 -h -s [selector] -i [url|file|html]...')
            .boolean('h')
            .alias('h', 'help')
            .describe('h', 'Display usage')
            .alias('s', 'selector')
            .describe('s', 'Scrape HTML from each page using this selector')
            .boolean('i')
            .alias('i', 'inline')
            .describe('i', 'If set, anchor/image URLs are to be inserted inline')
            .argv;

function readStdin() {
    var data = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) { data += chunk; });
    process.stdin.on('end', function () { scrape(argv, data); });
}

if (argv.help) {
    optimist.showHelp();
    process.exit();
}

if (argv._.length === 0) {
    readStdin();
} else {
    scrape(argv);
}
