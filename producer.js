const { Kafka } = require("kafkajs");
const { randomUUID } = require("node:crypto");

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'test-producer',
    brokers: ['inviting-porpoise-12731-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: '',
      password: '',
    },
    ssl: true,
  })


  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'NOva solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ],
  })

  await producer.disconnect()
}

bootstrap();