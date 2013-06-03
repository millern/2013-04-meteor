Users = new Meteor.Collection("users");
Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");

if (Meteor.isClient) {

  Template.dashboard.selected_name = function() {
    var user = Users.findOne(Session.get("userid"));
    return user && user.name;
  };
  Template.dashboard.questions = function(){
    return Questions.find({}, {sort :{ created_at: -1}});
  };

  Template.question.answers = function() {
    return Answers.find({question_id: this._id});
  };

  Template.questionForm.events({
    'click input.submitQuestion': function() {
      var question = document.getElementById("questionForm").value;
      Questions.insert({user_id: Session.get("userid"), content: question, created_at: new Date()});
    }
  });

  Template.getUser.events({
    'click input.submitName': function(){
      var new_user = document.getElementById("enterName").value;
      var id = Users.insert({name: new_user });
      Session.set("userid",id);
    }
  });
  Template.question.events({
    'click input.submitAnswer': function(event,tmpl){
       var response = tmpl.find('.respond').value;
       Answers.insert({content: response, question_id: this._id, votes: 0});
     },
    'click input.removeQuestion': function() {
      Questions.remove(this._id);
    }
  });
  Template.answer.events({
    'click input.upvote': function(){
      Answers.update(this._id,{$inc: {votes: 1}});
    },
    'click input.downvote': function(){
      Answers.update(this._id,{$inc: {votes: -1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
