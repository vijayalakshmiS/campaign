/**
 * CampaignController
 *
 * @description :: Server-side logic for managing campaigns
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require("lodash");

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
    // show: function(req, res) {
    //     var id = req.param('id');
    //     Campaign.findOne(id).populateAll().exec(function(err, show) {
    //         // Campaign.findOne(id).populate('rule').populate('channel').populate('escalation').exec(function(err, show){
    //         if (err) {
    //             res.send(err, 500);
    //         }
    //         console.log(show);
    //         res.json(show);
    //     });
    // },
    
    //     show: function(req, res) {
    //     var id = req.param('id');
    //     //Campaign.findOne(id).populateAll().exec(function(err, show) {
    //          Campaign.findOne(id).exec(function(err, show){
    //         if (err) {
    //             res.send(err, 500);
    //         }

    //         console.log(show);
    //         Channel.find({campaignId : id}).exec(function(err, channel){
    //             if(err)
    //             {
    //                 res.send(err, 500);
    //             }
    //             console.log("--->channel", channel);

    //         });
            
         
    //         Rule.find({campaigns:id}).exec(function(err, rule){
    //             if(err){
    //                 res.send(err, 500);
    //             }
    //             console.log("----->rule", rule);
    //         });
    //         Escalation.find({campaignid : id}).exec(function(err, escalation){
    //             if(err){
    //                 res.send(err, 500);
    //             }
    //             console.log("--->escalation", escalation);
    //         });

    //         //res.json(show);

    //     });
    // },


    // show: function(req, res) {
    //     var id = req.param('id');
    //     console.log(id);
    //     Campaign.findOne(id).populate('rule').exec( function(err, findcampaign){
    //         if(err){
    //             res.send(err, 500);
    //         }
    //         console.log(findcampaign);
    //         // Rule.find({ campaigns : id}, function(err, showrule){
    //         //     console.log("rule");
    //         //     if(err){
    //         //         res.send(err, 500);
    //         //     }
    //         //     console.log(showrule);
    //         // });
    //         Channel.find({ campaignId : id}, function(err, findchannel){
    //             console.log("channel");
    //             if(err){
    //                 res.send(err, 500);
    //             }
    //             //console.log(findchannel);
    //             var a = findchannel;
    //             console.log("channel:",a);
    //             _.each(findchannel, channel =>{
    //                 Email.find({ templateId : channel.id}, function(err, findemail){
    //                     console.log("email");
    //                     if(err){
    //                         res.send(err, 500);
    //                     }
    //                     //console.log(findemail);
    //                     var email = findemail;
    //                     console.log("--->email",email);
    //                     // var aa = a.concat(b);
    //                     // console.log("new:",aa);


    //             Sms.find({ template_id : channel.id}, function(err, findsms){
    //                     console.log("sms");
    //                     if(err){
    //                         res.send(err, 500);
    //                     }
    //                     //console.log(findsms);
    //                     var sms = findsms;
    //                     console.log("sms",sms);
    //                     //var bb = aa.concat(c);
    //                     //console.log("bb:", bb);

    //             Webpush.find({ template : channel.id}, function(err, findwebpush){
    //                     console.log("webpush");
    //                     if(err){
    //                         res.send(err, 500);
    //                     }
    //                     //console.log(findwebpush);
    //                     var webpush = findwebpush;
    //                     console.log("webpush", webpush);

    //              Fcm.find({ templateno : channel.id}, function(err, findfcm){
    //                     console.log("fcm");
    //                     if(err){
    //                         res.send(err, 500);
    //                     }
    //                     //console.log(findfcm);
    //                     var fcm = findfcm;
    //                     console.log("fcm", fcm);

    //                     //Array.prototype.push.apply(channel,email,sms,webpush,fcm);
    //                     var  channel= a.concat(email,sms,webpush,fcm);
    //                     console.log("channel:", channel);
    //                     //console.log("--->channel",channel);
    //                     res.json({channel :channel});
    //                     //res.json({campaign: findcampaign});
    //                 });
    //                 });
    //                 });
    //                 });

    //             });
            
               
    //         });
    //     });
    // },

    show: function(req, res) {
                    var temp;
        Campaign.find().populate('rule').exec(function(err, findcampaign){
            if(err){
                res.send(err, 500);
            }
            //console.log(findcampaign);

            
            //console.log("--->campaign", campaign);
            //res.json(findcampaign);
            var result = [];
            var obj = _.map(findcampaign, campaign => {
                // console.log(campaign);
                return Channel.find({ campaignId: [1,2] }).populate(['email','sms','webpush','fcm']);
                // var ret = Channel.find({ campaignId: campaign.id }).populate(['email','sms','webpush','fcm']).exec(function(err, show){
                //     if(err){
                //         res.send(err, 500);
                //     }
                //     temp = campaign;
                    
                //     temp.Channel = show;
                //     // console.log("------>",temp);
                //     result.push(temp);
                //     return temp;
                // });     
            });
            // console.log("outside promise resolve::" +obj);
            // console.log("findcampaign::" + JSON.stringify(findcampaign));
            Promise.all(obj).then(values=> {
                _.map(values, v => {
                    return _.find(findcampaign, c => c.id == v[0].campaignId).Channel = v;
                });
                //res.json(_.flatten(findcampaign));
                }).catch(reason => { 
                  console.log(reason)
                });



            var object = _.map(findcampaign, campaign => {
                // console.log(">>>",campaign);
                return Escalation.find({ campaignid: campaign.id }).populate('channel');
                var object1 = _.map(findescalation, escalation => {
                    console.log("--->escalation",escalation);
                    return Channel.find({ escalationId: escalation.id}).populateAll();

                    var object2 = _.map(findchannel, channel => {
                        console.log("--->channel", channel);
                        return Channel.findAll().populate(['email', 'sms']);
                    });
                    
                });
                
            });

            Promise.all(object).then(values => {
                _.map(values, v => {
                    return _.find(findcampaign, c => c.id == v[0].campaignid).Escalation = v;
                    return _.find(findescalation, c => c.id == v[0].escalationId).Channel = v;
                    return _.find(findchannel, c=> c.id == v[0].escalationId).Channel = v;
                });
                console.log("--->",findcampaign);
                res.json(findcampaign);
            }).catch(reason => {
                console.log(reason)
            });


            

            // console.log("obj", obj);
            // var campaignid = obj.id;
            // console.log(campaignid);
            
            // Channel.find({ campaignId: campaign.id }).populate(['email','sms','webpush','fcm']).exec(function(err, show){
            //     if(err){
            //         res.send(err, 500);
            //     }
            //     console.log("channel",show);
            //     campaign.Campaign = findcampaign;
            //     campaign.Channel = show;
            //     console.log("campaign", campaign);
            //     res.json(campaign);

            // });

            // _.each(findcampaign, campaign => {
            //     Channel.find().where({ campaignId: campaign.id}).populate(['email','sms', 'webpush', 'fcm']).exec(function(err, channel){
            //         if(err){
            //             res.send(err, 500);
            //         }
            //         //console.log("channel-->", channel);
            //         //res.json(channel);
            //         campaign = findcampaign;
            //         campaign.Channel = channel;
            //         console.log("campaign--->", campaign);


            //     });
            // });
               //console.log(campaign);
//res.json(findcampaign);
        });
    },


    /**
     * `CampaignController.new()`
     */
    new: function(req, res) {
        return res.json({
            todo: 'new() is not implemented yet!'
        });
    },


    /**
     * `CampaignController.create()`
     */
    create: function(req, res) {
        var param = req.allParams();
        var firstCampaign;

        Campaign.create(param, function(err, created) {
            if (err) {
                res.send(err, 500);
            }
            var result;
            result = created;
            Channel.find().where({ campaignId: created.id }).populate(['email', 'sms', 'webpush', 'fcm']).exec(function(err, campChannel) {
                if (err) {
                    res.send(err, 500);
                }

                Campaign.find().where({ id: created.id }).populateAll().exec(function(err, show) {
                    if (err) {
                        res.send(err, 500);
                    }
                    // console.log("------------->",show);

                    firstCampaign = _.first(show);
                    var id = firstCampaign.escalation[0].id;
                    Channel.find().where({ escalationId: id }).populate(['email', 'sms', 'webpush', 'fcm']).exec(function(err, escChannel) {
                        if (err) {
                            res.send(err, 500);
                        }
                    Rule.find().where({ campaigns: created.id }).exec(function(err, rule) {
                    if (err) {
                        res.send(err, 500);
                    }
                    // console.log("------------->",rule);
                        result.Rule = rule;
                        result.Campaign = campChannel;
                        result.Escalation = escChannel;
                        
                        console.log('------>', result);
                        res.json(result);
                         });
                    });
                });
            });
        });
    },


    /**
     * `CampaignController.edit()`
     */
    edit: function(req, res) {
        var id = req.param('id');
        Campaign.findOne(id, function(err, edit) {
            if (err) {
                res.send(err, 500);
            }
            res.json(edit);
        });
    },


    /**
     * `CampaignController.update()`
     */
    update: function(req, res) {
        var id = req.param('id');
        var param = req.allParams();
        Campaign.update(id, param, function(err, updated) {
            if (err) {
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
    destroy: function(req, res) {
        var id = req.param('id');
        Campaign.find(id, function(err, findcampaign) {
            if (err) {
                console.log(err);
                res.send(err, 500);
            }
            Campaign.destroy({ id: id }).exec(function(err, campaigndelete) {
                if (err) return res.send(err, 500);
                Rule.destroy({ campaigns: id }).exec(function(err, ruledelete) {
                    if (err) return res.send(err, 500);
                    Escalation.destroy({ campaignid: id }).exec(function(err, escalationdelete) {
                        if (err) return res.send(err, 500);
                        Channel.destroy({ campaignId: id }).exec(function(err, channeldelete) {
                            if (err) return res.send(err, 500);
                            res.json({ campaigndelete: "delete" });
                        });

                    });
                });
            });
        });

    }
};
