/**
 * Campaign.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	newCampaign: 
  	{
  		type: 'string'
  	},
  	tags:  
  	{
  		type: 'string'
  	},
  	validityFrom:
  	{
  		type: 'date'
  	},
  	validityTo:
  	{
  		type: 'date'
  	},
    channel:
    {
      collection: 'channel',
      via: 'campaignId'
    },
    escalation:
    {
      collection: 'escalation',
      via: 'campaignid'
    },
    rule:
    {
      collection: 'rule',
      via: 'campaigns'
    }
  }
};

