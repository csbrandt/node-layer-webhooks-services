#! /usr/bin/env nix-shell
#! nix-shell -i bash -p nodejs-6_x

#npm install; npm install broken-link-checker; npm rebuild node-sass; npm run compile; node index.js & node_modules/node-sass/bin/node-sass src/scss/docs.scss dist/css/docs.css; ./node_modules/broken-link-checker/bin/blc http://localhost:3000 -ro
#npm install; node indices/update.js
npm install; cd examples; npm install; npm start
