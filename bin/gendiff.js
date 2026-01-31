#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import parse from '../src/parsing.js';
import { Command } from "commander";

const program = new Command()

program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'display help for command')

    program.action((filepath1, filepath2) => {
        const fullPath1 = path.resolve(process.cwd(), filepath1)
        const fullPath2 = path.resolve(process.cwd(), filepath1)

        const content1 = fs.readFileSync(fullPath1, 'utf-8')
        const content2 = fs.readFileSync(fullPath2, 'utf-8')

        const format1 = path.extname(filepath1).slice(1)
        const format2 = path.extname(filepath2).slice(1)

        const data1 = parse(content1, format1)
        const data2 = parse(content2, format2)

        console.log(data1, data2)
    })
    
program.parse(process.argv)