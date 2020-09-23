import { Files } from './files';
import { Process } from './process';

export interface Send {
    process : Process;
    file : Files;
}