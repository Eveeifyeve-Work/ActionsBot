import { WebhookClient } from 'discord.js';

const webhookClient = new WebhookClient({ id: 'webhook_id', token: 'webhook_token' });

const message = 'Hello, this is a message from my bot!';

webhookClient.send(message)
    .then(() => console.log('Message sent!'))
    .catch(console.error);