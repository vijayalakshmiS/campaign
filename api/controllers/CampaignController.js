/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `CampaignController.index()`
   */
  // index: function (req, res) {
  //   return res.json({
  //     todo: 'index() is not implemented yet!'
  //   });
  // },


  /**
   * `CampaignController.show()`
   */
show: function (req, res) {
    var id = req.param('id');
    Campaign.findOne(id).populate('rule').populate('channel').populate('escalation').exec(function(err, show){
      if(err){
        res.send(err, 500);
      }
      console.log(show);
      res.json(show);
    });
    },

  /**
   * `CampaignController.new()`
   */
  new: function (req, res) {
    return res.json({
      todo: 'new() is not implemented yet!'
    });
  },


  /**
   * `CampaignController.create()`
   */
  create: function (req, res) {
    var param = req.allParams();
    Campaign.create(param, function(err, created){
      if(err){
        res.send(err, 500);
      }
      console.log(created);
      res.json(created);
    });
  },


  /**
   * `CampaignController.edit()`
   */
   edit: function (req, res) {
   var id = req.param('id');
   Campaign.findOne(id, function(err, edit){
    if(err){
      res.send(err, 500);
    }
    res.json(edit);
   });
  },


  /**
   * `CampaignController.update()`
   */
   update: function(req,res) {
    var id = req.param('id');
    var param = req.allParams();
    Campaign.update(id, param, function(err, updated){
      if(err){
        console.log(err);
        res.send(err, 500);
      }
      console.log(updated);
      res.json(updated);
    });
   },


  /**
   * `CampaignController.destroy()`
   */
  destroy: function (req, res) {
   var id = req.param('id');
   Campaign.find(id, function(err, findcampaign){
    if(err){
      console.log(err);
      res.send(err, 500);
    }
    Campaign.destroy({id : id}).exec(function(err, campaigndelete){
      if(err) return res.send(err, 500);
      Rule.destroy({ campaigns : id}).exec(function(err, ruledelete){
        if(err) return res.send(err, 500);
        Escalation.destroy({ campaignid : id}).exec(function(err, escalationdelete){
          if(err) return res.send(err, 500);
          Channel.destroy( { campaignId : id}).exec(function(err, channeldelete){
            if(err) return res.send(err, 500);
              res.json({ campaigndelete: "delete"});
            });

          });
        });
      });
    });
  
     }
};

