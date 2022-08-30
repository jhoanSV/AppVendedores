import mysql from 'mysql2';
import { config } from '../../config';

mysql.createConnection(config);