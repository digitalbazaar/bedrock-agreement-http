/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
/* jshint node: true */

'use strict';

var helpers = require('./helpers');

var data = {};
module.exports = data;

var identities = data.identities = {};
var userName;

// identity with permission to access its own agreements
userName = 'regularUser';
identities[userName] = {};
identities[userName].identity = helpers.createIdentity(userName);
identities[userName].identity.sysResourceRole.push({
  sysRole: 'bedrock-agreement-http.test',
  generateResource: 'id'
});
identities[userName].keys = helpers.createKeyPair({
  userName: userName,
  userId: identities[userName].identity.id,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqv8gApfU3FhZx1gyKmBU\n' +
    'czZ1Ba3DQbqcGRJiwWz6wrr9E/K0PcpRws/+GPc1znG4cKLdxkdyA2zROUt/lbaM\n' +
    'TU+/kZzRh3ICZZOuo8kJpGqxPDIm7L1lIcBLOWu/UEV2VaWNOENwiQbh61VJlR+k\n' +
    'HK9LhQxYYZT554MYaXzcSRTC/RzHDTAocf+B1go8tawPEixgs93+HHXoLPGypmqn\n' +
    'lBKAjmGMwizbWFccDQqv0yZfAFpdVY2MNKlDSUNMnZyUgBZNpGOGPm9zi9aMFT2d\n' +
    'DrN9fpWMdu0QeZrJrDHzk6TKwtKrBB9xNMuHGYdPxy8Ix0uNmUt0mqt6H5Vhl4O0\n' +
    '0QIDAQAB\n' +
    '-----END PUBLIC KEY-----\n',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpQIBAAKCAQEAqv8gApfU3FhZx1gyKmBUczZ1Ba3DQbqcGRJiwWz6wrr9E/K0\n' +
    'PcpRws/+GPc1znG4cKLdxkdyA2zROUt/lbaMTU+/kZzRh3ICZZOuo8kJpGqxPDIm\n' +
    '7L1lIcBLOWu/UEV2VaWNOENwiQbh61VJlR+kHK9LhQxYYZT554MYaXzcSRTC/RzH\n' +
    'DTAocf+B1go8tawPEixgs93+HHXoLPGypmqnlBKAjmGMwizbWFccDQqv0yZfAFpd\n' +
    'VY2MNKlDSUNMnZyUgBZNpGOGPm9zi9aMFT2dDrN9fpWMdu0QeZrJrDHzk6TKwtKr\n' +
    'BB9xNMuHGYdPxy8Ix0uNmUt0mqt6H5Vhl4O00QIDAQABAoIBAQCpA3yXM42AsY8j\n' +
    'mwgSnJ48NqJaF5L8P7+UhHi6KMZ+fSYydl0zCevge4bzFD3JrNuZ8VD1b57AxejT\n' +
    'Ec2so/9vVxjJi1AK6WR3FA608rumGJLQJd4Vd2ojfxabTeWOKOo642R/LSFpPzVE\n' +
    'T0toqxqiA53IhxhAc2jDLO+PLIvrao0Y8bWWq36tbxsAplrv8Gms6ZRwfKoX5P32\n' +
    'azBpJOqneNdSMRPHky6t2uiYyuPeG9pbuaClkD7Ss9lpH0V1DLQmAAlP9I0Aa06B\n' +
    'a9zPFPb3Ae8F0HO/tsf8gIvrlT38JvLe5VuCS7/LQNCZguyPZuZOXLDmdETfm1FD\n' +
    'q56rCV7VAoGBANmQ7EqDfxmUygTXlqaCQqNzY5pYKItM6RFHc9I+ADBWsLbuKtfP\n' +
    'XUMHQx6PvwCMBpjZkM7doGdzOHb0l3rW8zQONayqQxN9Pjd7K+dkSY6k0SScw46w\n' +
    '0AexDQSM/0ahVAHfXXi1GbKwlonM0nn/7JHz7n/fL9HwV8T3hAGClbPDAoGBAMk0\n' +
    'K5d+Ov55sKW0ZatZ0vTnfBCSrVEfG6FkcyK7uiSsMdWo2/De0VtJF7od2DM5UyP6\n' +
    'Y/DSVk4oPepbug5oGdu8t1Q3jbS61A7i/dssirQC4hEFAtoTGsVfaH8wu4AKyWd7\n' +
    '0rUmSrnyqNr4mfQBjdaXByvWO9rdEfZcZqaSQ4/bAoGAKy/CR7Q8eYZ4Z2eoBtta\n' +
    'gPl5rvyK58PXi8+EJRqbjPzYTSePp5EI8TIy15EvF9uzv4mIXhfOLFrJvYsluoOK\n' +
    'eS3M575QXEEDJZ40g9T7aO48eakIhH2CfdReQiX+0jVZ6Jk/A6PnOvokl6vpp7/u\n' +
    'ZLZoBEf4RRMRSQ7czDPwpWMCgYEAlNWZtWuz+hBMgpcqahF9AprF5ICL4qkvSDjF\n' +
    'Dpltfbk+9/z8DXbVyUANZCi1iFbMUJ3lFfyRySjtfBI0VHnfPvOfbZXWpi1ZtlVl\n' +
    'UZ7mT3ief9aEIIrnT79ezk9fM71G9NzcphHYTyrYi3pAcAZCRM3diSjlh+XmZqY9\n' +
    'bNRfU+cCgYEAoBYwp0PJ1QEp3lSmb+gJiTxfNwIrP+VLkWYzPREpSbghDYjE2DfC\n' +
    'M8pNbVWpnOfT7OlhN3jw8pxHWap6PxNyVT2W/1AHNGKTK/BfFVn3nVGhOgPgH1AO\n' +
    'sObYxm9gpkNkelXejA/trbLe4hg7RWNYzOztbfbZakdVjMNfXnyw+Q0=\n' +
    '-----END RSA PRIVATE KEY-----\n'
});

// second identity with permission to access its own agreements
userName = 'regularUserB';
identities[userName] = {};
identities[userName].identity = helpers.createIdentity(userName);
identities[userName].identity.sysResourceRole.push({
  sysRole: 'bedrock-agreement-http.test',
  generateResource: 'id'
});
identities[userName].keys = helpers.createKeyPair({
  userName: userName,
  userId: identities[userName].identity.id,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAziShM5ASttPagRCLz6Go\n' +
    'cA1pl/3Uq/3J4s5BluVjwa8K/e/XnhqqgtNKhnu1s3fWPU4orncG83ZEE8Q4mYjA\n' +
    'VSxq4I+fdDBTmbfuSLA1tLxmDuU3WsAlcCI0V4XKIh+IzElJw0emcKSTfEmVMqM/\n' +
    '7NEc1yzV5wpn1Jh7ER3k+zGrRMmVOjjkzZOjbUaSsstzRIq5XXxqkHfQYlnPDUqd\n' +
    'gTKx2Pj3tkG5lV4F0bsKKD77uWmVceJBMzexYjIvTwm8hcCIiF7XVwxquw/tGqLA\n' +
    'NOSFRsqAjvOhOlEiE951ZbpcU6sN6nfNf7d3aykSK5DPGSCLVAFuAHIbpLtSI4ZU\n' +
    'gwIDAQAB\n' +
    '-----END PUBLIC KEY-----\n',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpAIBAAKCAQEAziShM5ASttPagRCLz6GocA1pl/3Uq/3J4s5BluVjwa8K/e/X\n' +
    'nhqqgtNKhnu1s3fWPU4orncG83ZEE8Q4mYjAVSxq4I+fdDBTmbfuSLA1tLxmDuU3\n' +
    'WsAlcCI0V4XKIh+IzElJw0emcKSTfEmVMqM/7NEc1yzV5wpn1Jh7ER3k+zGrRMmV\n' +
    'OjjkzZOjbUaSsstzRIq5XXxqkHfQYlnPDUqdgTKx2Pj3tkG5lV4F0bsKKD77uWmV\n' +
    'ceJBMzexYjIvTwm8hcCIiF7XVwxquw/tGqLANOSFRsqAjvOhOlEiE951ZbpcU6sN\n' +
    '6nfNf7d3aykSK5DPGSCLVAFuAHIbpLtSI4ZUgwIDAQABAoIBAQDMlgnudKQ+Es+e\n' +
    'm99F97iFTKppkB9Lepqsn+r0aUCx7plIIIqrfOeQ40XpZkmUjfBv82voinS5l7xE\n' +
    'qc9KgS/w2B5SM/gahgPSYXr5ZPhIIVpgmhhv1pbRTQEJg9xyNT29EVdFmYyT6qH9\n' +
    'DcIm+WHuFDM9UmAP5oHZumMZP8QLjxyB+i/+8Cjo8iu8YYnJjepb98qRywWf+KXe\n' +
    '0AwFpQIW73NiWcYz3lUpbP3XfvR8JOuJ3Ld7wPF+BtVEpDSFnDUNuDcvnCkWHkck\n' +
    'TR/ALUxOSgfRAfo1SLJxFzyVenQM9C8TcpwyrL7gcNRwRDfqCJ882n8O83eHzaVj\n' +
    'al6xC9UxAoGBAPhCa5o+VV6obr0xB28rHUIJjWu1aOc//xa5JY6ZcgtYnfCH695u\n' +
    'uBamGaSSwoesHRi3oOsvh9nxdkOhkeVjo4+tRp1bvYuvTRqNpR7SIeJ4ufQBtzC/\n' +
    '9p5DfiGL9KCxjw9/i9LFjYKC8WRZ9yZPNpGJ7E+ouoCmnp5JEVsR5QAHAoGBANSS\n' +
    'Cof611jMiNRjQSM3/LTTCpC14pFywJqFp7x3doU3qlKdobeDPEyrCpJtY0iLOZsY\n' +
    'O7r0GPe9mBKnXA8YEaUQiNMIN68pfE2b4bOp1aLU6fyLCoelegBuJZQ0KS1p8dXp\n' +
    'A9yvWn3x62xCNdlCND74c5gGC45NI9U0HeSqtDClAoGALkGZ8PRaTbfOYlvnSbRb\n' +
    '0Dkda4syj5vh+Kbos4gtsqWBUBbTQO+aR0YNkxdxPXw5M6jLR+bkRhxyb6mEGJyX\n' +
    'Ficv+BPm3kb8c80ejf6TJ7Jc23USX/f0iIqEztVX8DUFNdsK/2ulsUKanZsRrMan\n' +
    'oTh0mmcS0PO6rD1rCW/tHjMCgYEAocYTJbGNOhNO/vQamob9V1BVdhQ2PaMrWW3m\n' +
    'XdQ86t2WThGRBWxm86IoBZAiQw9R4+rpajpi1ggAOBIOSZ5zrz+KIbDbT/8ujpHX\n' +
    'jzftUmLfQEdA2ELjOniZONUJkXpThgwz2DvLjpYSKO2qtZFg2ZuTvVq8aKvkXVmw\n' +
    'dlpDj9ECgYAYZTyCLWj6tmy/VWqW7308FJHXXQRvKmN+t7ZMlBu+HTmIiW6f/myT\n' +
    'Mkr3J/0SY1ksjx5FGKHAESHAVRP+pmGCazqLbaw5rzTSaImtBFlHXTMOM1yu68sx\n' +
    '0m/ET4mzay6UhEEMK8kQNLu8C5nNYcZhzZ37W61kWFE4Ak51FAJvDQ==\n' +
    '-----END RSA PRIVATE KEY-----\n'
});

// identity with no permissions
userName = 'noPermission';
identities[userName] = {};
identities[userName].identity = helpers.createIdentity(userName);
identities[userName].keys = helpers.createKeyPair({
  userName: userName,
  userId: identities[userName].identity.id,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApiYhM3TtNcdDvG5vDSBx\n' +
    'i4MHNyUUi+SY3Sg5jCETKC0535Ma7R7eurPbanQjvR/95zCU+/4fNt6FzaDRBFrW\n' +
    'RL3TALNEeIyM/Sm68NoP/hF3Q0UanRzZX7mKkqftim+7dRxXsOZWVKWiRuKFQEJ2\n' +
    'KSHUtfGc2ySGeghyAL3APzRk3QaTv1sSYegueWseA9Lv279c+L1tNbYvxkELigRn\n' +
    'M8qyV33MyaIn3ep5yCTLdBkHlvgS632In34EBE32zw4vsW/M8KqymHENTl6fTMsw\n' +
    'q1J4J8O5rWfkbNiiBEzBYGJfQul1gI7iCg6A+CCB9wEr0g3eGNHtSF3zXDa731gI\n' +
    'XQIDAQAB\n' +
    '-----END PUBLIC KEY-----\n',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEowIBAAKCAQEApiYhM3TtNcdDvG5vDSBxi4MHNyUUi+SY3Sg5jCETKC0535Ma\n' +
    '7R7eurPbanQjvR/95zCU+/4fNt6FzaDRBFrWRL3TALNEeIyM/Sm68NoP/hF3Q0Ua\n' +
    'nRzZX7mKkqftim+7dRxXsOZWVKWiRuKFQEJ2KSHUtfGc2ySGeghyAL3APzRk3QaT\n' +
    'v1sSYegueWseA9Lv279c+L1tNbYvxkELigRnM8qyV33MyaIn3ep5yCTLdBkHlvgS\n' +
    '632In34EBE32zw4vsW/M8KqymHENTl6fTMswq1J4J8O5rWfkbNiiBEzBYGJfQul1\n' +
    'gI7iCg6A+CCB9wEr0g3eGNHtSF3zXDa731gIXQIDAQABAoIBADvjjJ4mrIZxACqA\n' +
    'yAi8RBFctpIbDI/sY2l8YVnwZh5aRv0e4lrMgM5dnF5/5I38ZSIbcehvTkMR7LsV\n' +
    'F6JxN8Dph5A+DhVB3GQ40YiVoaQcGZgm5ZPyXSxTDe8VFtuKsNBi2f0K2d2DIr5Y\n' +
    'Ul26Vys2ZZz7rWWUgeClAKrhutVM8XALesWtUVv8/Y/c+SGiRc9c02RyT1gq2KIr\n' +
    '7xWwa/Pk0yOge/upIMl7SbIhDNwcU5KjAEWcPKf+5MRbLv98qSGNhbIycgDjhpWf\n' +
    'uEk5rctCbB/hosPdqVRklChTyXtfGqc3LRcD5C0je2PB8/RmwtCPJde5qJyDiyZl\n' +
    'GjOlGkECgYEA3RpZcM1uHntI4xjKg7ujhCapJNMcH0NcNU35ieSSrUOJyZH+aCjm\n' +
    'juIRg0pzuSzCPMsxmMFVu/K7w7ZttoXPBX3u1m6CSvf6isrbgXgheMAZ5WqCjNXS\n' +
    '3Ljti1N0efw8vEf1dspPeYOaROI/KRnmdMQjpACGoSi0WRoy2Hi7G00CgYEAwF9e\n' +
    'LkzmflmIbDFy0+Jjz/PebwLhIA7fQ3eMDs/Pnv6aoKhqXOZLK7g2sHKWLKHbjC5J\n' +
    'jOqtod3YDr6O/gLgKXN9Ed0hzY4WshjPDTfllMwQBHKRvZA8/TC/4D9L45Ih6JJF\n' +
    'Qe5cgNfHHtLAuGiksCXVFzOTdOPlNYpZRsyxeVECgYAvHgRdY4nJ+R/JNWlCtWPd\n' +
    'L5fv/wUJLIOj4GADILCZN8FPMUtzyvOHE2oD/oO2vHEQH4UMNnccvFeDF4c91DoP\n' +
    'w4x4KcieTUYY+a3ZY05OuzFJkG8NsCtlWgtVG43AyR3wSa1niSlyjbb8YvJuwdQ4\n' +
    'oeuucWY/RbtZGZooQ2IsKQKBgApzI8KQGtUyN97osLwhyBo7vRF6ro/3PtmDXPBR\n' +
    'CY4xdmTTwTNaryqozw+2qcGy6SIsQYKOHPB2BI6Ie2wA6/xUca7OvE9WMJVsE5M8\n' +
    'PhRfIV+ceZ46f5WhWEruJUkvXvgrOefi8tNs5TwfZqidxpRq+bBQ9Omcl47Y/RCD\n' +
    'fgCBAoGBAJrJuMbrdzNK4812DZJ/ESHg77CYd0NYdN6H4faQGWPZYJF0JF+dSTC9\n' +
    'v4pjsDANOPG5LP3vZrDSnRe/ifylfUYnvw11G72ueF87T3pftH6b99lmcYX20KJG\n' +
    'omXWUsjDJgN5r1qJdCshpgni3yhp5+m9Yz2x/nRrHY8KUBm3cmwy\n' +
    '-----END RSA PRIVATE KEY-----\n'
});

// identity with permission to access all agreements (Admin)
userName = 'adminUser';
identities[userName] = {};
identities[userName].identity = helpers.createIdentity(userName);
identities[userName].identity.sysResourceRole.push({
  sysRole: 'bedrock-agreement-http.test'
});
identities[userName].keys = helpers.createKeyPair({
  userName: userName,
  userId: identities[userName].identity.id,
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvxKt2q6Gsd6OCtN+rdfA\n' +
    'w6wzJW3tvJg3ErrlNJhYkX5mm+2NUGTGHsjz2YeE0yzQDpZ6kguibwOILcFnyjfb\n' +
    'Xisw0IAql1rKUOjGJEAEEiHg+kSZs6HxOy0qz0BfcOgJ7oqz3z6neFT8N6jXyySX\n' +
    'LEvo7noUgcTz940u0RmUS06l2l/1kyshE619n6lDIuWO6J3N1jbJJ1Q+XpCqAaIj\n' +
    'rzQiH+5Pe8Ikm+6/M8twqC3NApkZXuk0Pq+NqGt8JkszzVOR2cFAy+YYcmDW3LPs\n' +
    'DtxauUYEKgSV25cz4Lshd1/uAmN0JRKgN4UGSk/lQVLkcaObnh5YBNeRXWqxfbBg\n' +
    '4QIDAQAB\n' +
    '-----END PUBLIC KEY-----\n',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpQIBAAKCAQEAvxKt2q6Gsd6OCtN+rdfAw6wzJW3tvJg3ErrlNJhYkX5mm+2N\n' +
    'UGTGHsjz2YeE0yzQDpZ6kguibwOILcFnyjfbXisw0IAql1rKUOjGJEAEEiHg+kSZ\n' +
    's6HxOy0qz0BfcOgJ7oqz3z6neFT8N6jXyySXLEvo7noUgcTz940u0RmUS06l2l/1\n' +
    'kyshE619n6lDIuWO6J3N1jbJJ1Q+XpCqAaIjrzQiH+5Pe8Ikm+6/M8twqC3NApkZ\n' +
    'Xuk0Pq+NqGt8JkszzVOR2cFAy+YYcmDW3LPsDtxauUYEKgSV25cz4Lshd1/uAmN0\n' +
    'JRKgN4UGSk/lQVLkcaObnh5YBNeRXWqxfbBg4QIDAQABAoIBAQCSQMX6gWRweZ3Y\n' +
    'A5MPlfnizMhJeh9jIE/nck9HNuV0WIBKEkb8pmZP4hllBCpTShXnVJ91cppexyFR\n' +
    'hJzhWGf9aKnwrmnreH8r90DTNnznNC904VWU/fwcA7Kk+O0VC0eu41RTKS4fGU4F\n' +
    'fKPQxq1AJsqg36kau5rSfaq8Owwbp0B89kVPNvUNwDj0Z3arFRayzVuvx8MNp0Us\n' +
    '+GTzIfp+UoxTj8R+1KLqBvFWzwN0eobxSA2d+whO6CU67Uu4L0SNxqd6hC5ZIYlF\n' +
    'GnDTE3U773as7OZ7uzaQedr4iLpjkwhBBVGXKWTOWLmubN3ysGysTvnij/x2dVrG\n' +
    'lqyzNLcBAoGBAOppCV2H018IAHTjpur1bhBlRjC/s6FkyzNmZVrPoTopRD5dtu3W\n' +
    'aq3FRuOV8QCWe/JKAAsKGMRJDA/x56Av8y7ur2KzckxedPEOvA6d+xBMIQ7SN6oP\n' +
    'Pj2YVMqwEQkO6f09vRiSYgXJER7J4QSq2naWfN9W0HpfK+6/uxq5/bEZAoGBANCr\n' +
    '0/WRva3QCvtHbZls1IHhu1wGl8yBoWGUqwDp6QAOwqlI8SPNLqEUdPitBLOeVJxM\n' +
    'iU1/0jjVm7aG9c/PGD6xzETc91EyttonOPiYhISPKiq1fs9588CIvkezVHKcm9kw\n' +
    '2fLUyuAAHMgCOgapDfp1Fn7zLCX/uTlYnwRksD8JAoGBAL01CTUwpGFpkQzIkHvI\n' +
    'nQ2o4U4J/pFATXBwr1DslQPgOVBpznUNhFA9E2oyJjTGQsegCYbfoHwXRiA8ryyy\n' +
    'Z4UzbeeqVpDkEVpd/VeDFxrhiDFxZzLiWOfY5GAyW53HJwGc6txBk9N9p08FvpZI\n' +
    '3kuoTqTrax3LYie1JO5+wBJJAoGAYJJFA+8w81HG40fJRyoApyNKzGoYsoKDp19g\n' +
    'TIn0VRx/pkylnMYGgHGxOK0J8f6idbtOB9nR9o+VAsIu3L+hHtK2EGCa7K8lxIxG\n' +
    'Z3ZeTeLbxuw8BdUQo9glB5XMzUYBMmDTXPhx83zZ1Q6CwDZYy8KIaLQtiGBy3kFP\n' +
    'Rn86udECgYEApoPesTXNpCwryciSqzwj3cKpv8psZWEGl8Val30Zs0bKrf6SQdNJ\n' +
    '/LB9NFzBDCzygqt+jOW161Pxel5QYDVY2OEopaypQlzcq3j/uvyui++puhelaj7L\n' +
    'ggRiy3G63MrRf9OzC6PsWxXi6zInzo7srOcmdvaPGCmfA0Nf8ksL3zs=\n' +
    '-----END RSA PRIVATE KEY-----\n'
});
