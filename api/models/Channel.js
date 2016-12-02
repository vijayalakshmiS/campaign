/**
 * Channel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	template:
  	{
  		collection: 'template',
  		via: 'channelId'
  	},

  	people:
  	{
  		collection: 'people', 
  		via:'channel_id'
  	},
  	campaignId:
  	{
  		model: 'campaign'
  	},
  	escalationId:
  	{
  		model: 'escalation1'
  	}

  }
};

