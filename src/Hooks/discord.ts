const { WebhookClient, MessageEmbed } = require('discord.js')

const url = process.env.Discordhook
const id = url.split('/')[5]
const token = url.split('/')[6]

const webhookClient = new WebhookClient({ id, token })

const embed = new MessageEmbed()
  .setTitle('A slick little embed')
  .setColor(0xff0000)
  .setDescription('Hello, this is a slick embed!')

webhookClient
  .send({
    username: 'My Webhook Bot',
    avatarURL: 'https://i.imgur.com/wSTFkRM.png',
    embeds: [embed],
  })
  .then(() => console.log('Message sent!'))
  .catch(console.error)
