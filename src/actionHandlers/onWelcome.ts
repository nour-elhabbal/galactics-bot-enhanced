import { ChannelType, GuildMember, channelMention, userMention } from 'discord.js';
import Jimp from 'jimp';

import { getServerItem } from '../db';

export const onWelcome = async (member: GuildMember) => {
  const roles = await getServerItem(member.guild.id, 'roles');
  if (!roles.bot) return;
  if (member.user.bot) return member.roles.add(roles.bot);

  if (!roles.member) return;
  await member.roles.add(roles.member);

  const channels = await getServerItem(member.guild.id, 'channels');
  if (!channels.welcome) return;

  const welcomeChannel = member.guild.channels.cache.get(channels.welcome);
  if (welcomeChannel.type !== ChannelType.GuildText) return;

  const welcomeImage = (await Jimp.read('src/assets/welcomeImage.png')).scale(0.2);
  await addUserAvatar(welcomeImage, member);
  const welcomeImageBuffer = await welcomeImage.getBufferAsync('image/png');

  await welcomeChannel.send({ files: [welcomeImageBuffer] }).then(() => {
    welcomeChannel.send(`
      >>>       \`#\` **Welcome** ${userMention(member.id)} to out server !
      \`#\` We inform u to read our **rules** \`:\` ${channelMention(channels.rules ?? 'Not Set')}
      \`#\` Total members \`:\` **${member.guild.memberCount}**
      \`#\` Enjoy with us :heart_on_fire:
        `);
  });
};

const addUserAvatar = async (welcomeImage: Jimp, member: GuildMember) => {
  const userImage = await Jimp.read(member.user.displayAvatarURL({ size: 128, extension: 'png' }));
  userImage.resize(122, 122);
  userImage.circle();
  welcomeImage.composite(userImage, 222, 36);
};
