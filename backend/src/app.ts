import express from 'express';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import lusca from 'lusca';
// import { getProduct } from './controllers/product';
import serviceAccount from './keys/glass-store-manager-firebase.json';
import { ServiceAccount } from 'firebase-admin';
import { getProduct, queryProduct } from './controllers/product';
import admin = require('firebase-admin');

const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// app.use((req, res, next) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//     req.path !== '/login' &&
//     req.path !== '/signup' &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)) {
//         res.redirect(req.path);
//     } else if (req.user &&
//     req.path == '/account') {
//         res.redirect(req.path);
//     }
//     next();
// });

app.use(
express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.use(cors());
app.use(express.json());
const db = admin.firestore();

app.get('/api/products', getProduct(db));

app.use('/graphql/products', queryProduct(db));

export default app;
