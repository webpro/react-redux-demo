import React from 'react';
import HashHistory from 'react-router/lib/HashHistory'
import Root from './Root';

let env = __DEV__ ? 'local' : 'production';

FUNFAIR_CONFIG.API.current = {};
for(let key in FUNFAIR_CONFIG.API[env]) {
    FUNFAIR_CONFIG.API.current[key] = FUNFAIR_CONFIG.API[env].host + FUNFAIR_CONFIG.API[env][key];
}

const history = new HashHistory();

React.render(<Root history={history} />, document.getElementById('app'));
