#!/usr/bin/env node
import path from 'path';
import { Command } from "commander";
import genDiff from '../src/genDiff.js';

const program = new Command()

program
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .helpOption('-h, --help', 'display help for command')
    .action((filepath1, filepath2, options) => {
    const fullPath1 = path.resolve(process.cwd(), filepath1);
    const fullPath2 = path.resolve(process.cwd(), filepath2);

    const result = genDiff(fullPath1, fullPath2, options.format);
    console.log(result);
  });
    
program.parse(process.argv)