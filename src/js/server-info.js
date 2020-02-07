//const server = "http://95.216.175.5/cohort6";
const server = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort6' : 'https://praktikum.tk/cohort6';
const token = "c66b50f5-8822-4a68-8668-3460b8d083f5";
const ownerId = "dd8250e77aa5d43ee5755cb3";

export {server, token, ownerId};