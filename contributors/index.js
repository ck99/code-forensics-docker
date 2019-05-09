const {chunksToLinesAsync, chomp} = require('@rauschma/stringio');
const { spawn } = require('child_process');
const addrs = require("email-addresses");
let contributors = {};
let normalizeContributor = (contributorString) => {
    let c = JSON.parse(contributorString);

    let parsed = addrs.parseOneAddress(c.email.toLowerCase());
    if(!parsed) {
        return undefined;
    }

    return {
        name: c.name,
        email: parsed
    }
};

async function main() {
    const source = spawn(
        'git',
        ['log', '--pretty=format:{"name":"%aN","email":"%aE"}'],
        {
            cwd: (process.argv.length > 2) ? process.argv[2] : '/git',
            stdio: ['ignore', 'pipe', process.stderr]
        }
    );

    await echoReadable(source.stdout);
    console.log(contributors);
}
main();

async function echoReadable(readable) {
    for await (const line of chunksToLinesAsync(readable)) {
        let c = normalizeContributor(chomp(line));
        if(!c) {
            console.error("Rejecting " + chomp(line));
            continue;
        }
        if(!contributors[c.email.address]) {
            contributors[c.email.address] = [c.name];
        } else {
            if(contributors[c.email.address].indexOf(c.name) < 0) {
                contributors[c.email.address].push(c.name);
            }
        }
    }
}