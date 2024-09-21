/** Import Modules */
import { createServer} from 'http';

/** Import Utilities */
import app from './app/app.js';
import {APP_CONFIG} from './config/config.js';
import connectDatabase from './utils/connection.js';


/** server */
const server = createServer(app);
const PORT = APP_CONFIG.PORT;


connectDatabase().then(()=> {
    server.listen(PORT, ()=> {
        console.log(`Server running and up  http://localhost:${PORT}`)
        
    })
    
}).catch((error)=> console.log(error))