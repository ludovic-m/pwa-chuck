// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // tslint:disable-next-line:max-line-length
  factsApi: 'https://lmepwachucknorris.azurewebsites.net/api/GetLastFiveFacts?code=NXkN0leSRWVK80fgjqRJwdCiKTtxQ2NjPfVG5thTY9KwXNtz1MTuHA==',
  config: {
    'API_URL': 'http://localhost:7071',
    'subscribeApi': 'https://lmepwachucknorris.azurewebsites.net/api/Subscribe?code=0r0Fdso7fjg9J6DVwpREKPa/wNiAU8TBD3MtDD9NXbz4O9Fwxb/mRg==',
    'VAPID_PUB_KEY': 'BNOQmJn54JzYnFlbU8cgPXAOPXxd-eI0i0qobChcCW8AS9FdvmFkcIj9oA68QQoQVEPnR5mSiq8QTDzhmPBywSY'
  }
};
