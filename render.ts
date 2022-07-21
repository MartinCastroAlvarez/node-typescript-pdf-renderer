// ----------------------------------------------------------------
// Purpouse:
// This script is responsible for parsing the CLI arguments
// and calling other classes and functions.
//
// Reference:
// - http://pdfkit.org/docs/getting_started.html
// ----------------------------------------------------------------

const { ArgumentParser } = require('argparse')

import { Command } from './src/command'

const parser = new ArgumentParser({
    description: 'Book rendering with Node & Typescript'
})
 
// Each command renders a single book.
parser.add_argument('-t', '--title', {
    help: 'Book title such as "crypto".',
    required: true,
})

// Each book shall support multiple languages.
parser.add_argument('-l', '--language', {
    help: 'Language such as "en" or "es".',
    default: 'en',
    required: true,
})

let args = parser.parse_args()

const command: Command = new Command()
command.renderBook({
    title: args.title,
    language: args.language,
})
