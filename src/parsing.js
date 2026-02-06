import yaml from 'js-yaml';

export default function parse (data, format)  {
    if (format === 'json') {
        return JSON.parse(data)
    } else if (format === 'yml' || format === 'yaml') {
        return yaml.load(data)
    } else {
        throw new Error(`Unknown format ${format}`)
    }
}