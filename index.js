const Discord = require('discord.js'), config = require('./config.js');
if (!config) throw Error('Config file not found!');

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES']
});

client.on('ready', () => console.log(`Logged in as ${client.user.tag} (${client.user.id})`));


// sorular
const modalObject = {
  title: 'HAROLD BAŞVURU FORMU',
  custom_id: 'cool_modal',
  components: [
    {
      type: 1,
      components: [
        {
          type: 4,
          style: 1,
          custom_id: 'text_field_s1',
          label: 'İSİM:',           // isim soyisim kısmını değiştirme
          placeholder: 'İsmini yaz.'  // isim soyisim kısmındaki saydam yeri değiştirme
        }
      ]
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          style: 2,
          custom_id: 'text_field_s2',
          label: 'YAŞ:',               // yaş bilgi kısmını değiştirme
          placeholder: 'Yaşını yaz.' // yaşınızı yazın kısmındaki saydam yeri değiştirme
        }
      ]
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          style: 2,
          custom_id: 'text_field_s3',
          label: 'DİSCORD İD:',               // yaş bilgi kısmını değiştirme
          placeholder: 'Discord id yaz.' // yaşınızı yazın kısmındaki saydam yeri değiştirme
        }
      ]
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          style: 2,
          custom_id: 'text_field_s4',
          label: 'FİVEM SAATİ:',               // yaş bilgi kısmını değiştirme
          placeholder: 'Fivem saatini yaz.' // yaşınızı yazın kısmındaki saydam yeri değiştirme
        }
      ]
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          style: 2,
          custom_id: 'text_field_s5',
          label: 'GÜNLÜK AKTİFLİK SÜRESİ:',               // yaş bilgi kısmını değiştirme
          placeholder: 'Günlük aktiflik süreni yaz.' // yaşınızı yazın kısmındaki saydam yeri değiştirme
        }
      ]
    },
  ]
}
const antiPing = (text) => text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
const truncate = (length, text) => antiPing(text.slice(0, length) + (text.length > length ? '...' : ''));

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;
  const command = message.content.slice(config.prefix.length).split(/ +/)[0]?.toLowerCase()

  console.log(`${message.author.tag} (${message.author.id}) ran command ${command}`);

  if (command === 'help') {
    return message.channel.send({ content: `Use \`${config.prefix}basvuru\` to basvuru a modal and use \`${config.prefix}source\` for the source code.`, allowedMentions: { parse: [] } });
  } else if (command === 'basvuru') {
    const buttonOpenMsg = await message.channel.send({
      content: '```diff\n- HAROLD BAŞVURU FORMU İÇİN BUTONA TIKLA\n```\n**Başvurular her gün okunmaktadır.**',
      components: [
        {
          type: 1, components: [
            { type: 2, style: 3, custom_id: 'modal_open', label: 'BAŞVURMAK İÇİN TIKLA' }
          ]
        }
      ]
    });

    const openCollector = buttonOpenMsg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60 * 1000 });

    openCollector.on('collect', (interaction) => {
      interaction.showModal(modalObject);
      interaction.awaitModalSubmit({ filter: (mInter) => mInter.customId === modalObject.custom_id, time: 5 * 10 * 1000 })
        .then((modalInteraction) => modalInteraction.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor('RED')
              .setTitle('HAROLD BAŞVURU FORMU')
              .setDescription(`HAROLD`)
              .addField('Soru !', '\`\`\`' + truncate(1010, modalInteraction.components[0].components[0].value) + '\`\`\`')
              .addField('Soru 2', '\`\`\`' + truncate(1010, modalInteraction.components[1].components[0].value) + '\`\`\`')
              .addField('Soru 3', '\`\`\`' + truncate(1010, modalInteraction.components[1].components[0].value) + '\`\`\`')
              .addField('Soru 4', '\`\`\`' + truncate(1010, modalInteraction.components[1].components[0].value) + '\`\`\`')
              .addField('Soru 5', '\`\`\`' + truncate(1010, modalInteraction.components[1].components[0].value) + '\`\`\`')
          ],
          ephemeral: true
        }));
    });

    openCollector.on('end', () => {
      buttonOpenMsg.edit({
        components: [
          {
            type: 1, components: [
              { type: 2, style: 3, custom_id: 'modal_open', label: 'basvuru', disabled: true }
            ]
          }
        ]
      })
    })

  } else if (command === 'source') {
    return message.channel.send({ content: "SOURCE PAYLAŞILMAMAKTADIR." })
  }


  client.on("interactionCreate", async (interaction) => {
    if (interaction.isModalSubmit()) {
       await interaction.deferUpdate()
       if (interaction.customId == "cool_modal") {
        const value = interaction.fields.getTextInputValue("text_field_s1");
        const value2 = interaction.fields.getTextInputValue("text_field_s2");
        const value3 = interaction.fields.getTextInputValue("text_field_s3");
        const value4 = interaction.fields.getTextInputValue("text_field_s4");
        const value5 = interaction.fields.getTextInputValue("text_field_s5")
        client.channels.cache.get("1073503514602508298").send({content: `**Başvuran kişi ->** **${interaction.member.user.tag} (${interaction.member.id})**:\n**İSİM:** ${value}\n**YAŞ:** ${value2}\n**DİSCORD İD:** ${value3}\n**FİVEM SAATİ:** ${value4}\n**GÜNLÜK AKTİFLİK SÜRESİ:** ${value5}`})
      }
    }
  })

  
});

client.login(config.token);