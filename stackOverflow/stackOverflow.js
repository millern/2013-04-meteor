Users = new Meteor.Collection("users");
Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {

  Template.dashboard.selected_name = function() {
    var user = Users.findOne(Session.get("userid"));
    return user && user.name;
  };
  Template.dashboard.questions = function(){
    return Questions.find({});
  };

  Template.questionForm.events({
    'click input.submitQuestion': function() {
      var question = document.getElementById("questionForm").value;
      Questions.insert({user_id: Session.get("userid"), content: question});
    }
  });

  Template.getUser.events({
    'click input.submitName': function(){
      var new_user = document.getElementById("enterName").value;
      var id = Users.insert({name: new_user });
      Session.set("userid",id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
