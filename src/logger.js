import fs from 'fs';

const logStream = fs.createWriteStream('chat_log.txt', { flags: 'a' });

export const logChat = (role, content) => {
  logStream.write(`[${role.toUpperCase()}]: ${content}\n`);
};
