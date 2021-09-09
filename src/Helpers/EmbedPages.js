/* eslint-disable new-cap */
const { continuousReactionStream } = require('eris-reactions')

async function SwapPages (client, message, time, maxMatches, embeds) {
  let currentPage = 0
  if (embeds.length === 1) { return message.channel.createMessage(embeds[0].create) }
  const queueEmbed = await message.channel.createMessage(embeds[currentPage].create)
  const reactionemojis = ['⬅️', '⏺️', '➡️']
  try {
    for (const emoji of reactionemojis) await queueEmbed.addReaction(emoji)
  } catch (error) {
    client.createMessage(
      message.channel.id,
      client.markdown(`Error: ${error.message}`, 'js')
    )
  }
  const collector = new continuousReactionStream(
    queueEmbed,
    (userID) => userID === message.author.id,
    false,
    {
      time,
      maxMatches
    }
  )
  collector.on('reacted', async (reaction) => {
    try {
      if (
        reaction.emoji.name === reactionemojis[2] ||
        reaction.emoji.id === reactionemojis[2]
      ) {
        if (currentPage < embeds.length - 1) {
          currentPage++
          queueEmbed.edit(embeds[currentPage].create)
        } else {
          currentPage = 0
          queueEmbed.edit(embeds[currentPage].create)
        }
      } else if (
        reaction.emoji.name === reactionemojis[0] ||
        reaction.emoji.id === reactionemojis[0]
      ) {
        if (currentPage !== 0) {
          --currentPage
          queueEmbed.edit(embeds[currentPage].create)
        } else {
          currentPage = embeds.length - 1
          queueEmbed.edit(embeds[currentPage].create)
        }
      } else {
        queueEmbed.removeReactions().catch(() => {})
        collector.stopListening(null)
      }
      await queueEmbed
        .removeReaction(reaction.emoji.name, message.author.id)
        .catch(() => {})
    } catch (error) {
      client.createMessage(
        message.channel.id,
        client.markdown(`Error: ${error.stack}`, 'js')
      )
    }
  })
}

module.exports = {
  SwapPages: SwapPages
}
