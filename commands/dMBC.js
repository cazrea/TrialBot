const { MessageEmbed, User } = require("discord.js");
const messageCreate = require("../events/guild/messageCreate");
const profileModel = require("../models/profileSchema");
const ms = require('ms');

module.exports = {
    name: 'dMBC',
    aliases: ['dM'],
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];

        if(amount % 1 != 0 || amount <=0) return 
            const notAWholeNumEmbed = new MessageEmbed()
                .setColor('#800020')
                .setTitle('Oops! The transaction went wrong!')
                .setDescription('The number must be a whole number!')
                .setFooter({text: 'Do ~d MBC # again'});

            message.channel.send({embeds: [notAWholeNumEmbed]});

        try {
            if(amount > profileData.MBC) return
                const notEnoughEmbed = new MessageEmbed()
                    .setColor('#800020')
                    .setTitle(`Oh no, you don't have that many micro brain cells!`)
                    .setDescription(`You currently have ${profileData.MBC} Micro Brain Cell/s available to deposit.`)
                    .setFooter({text: 'Do ~d MBC # again'});

                message.channel.send({embeds: [notEnoughEmbed]});

                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        MBC: -amount,
                        MBBank: amount,
                    },
                    
                    });

                const sdMBCEmbed = new MessageEmbed()
                    .setColor('#CD7F32')
                    .setTitle(`Congrats!`)
                    .setDescription(`You've successfully deposited ${amount} Micro Brain Cells into the Brain Bank!`)
                    .setFooter({text: 'Check your ~balance to confirm.'});

                message.channel.send({embeds: [sdMBCEmbed]});


        } catch(err) {
            console.log(err);
        }
    },
};