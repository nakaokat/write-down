var Notes = function(){
    var init = function(){
        if (!localStorage.writeDownNotes){
            localStorage.writeDownNotes = JSON.stringify([]);
        };
    };

    var add = function(obj){
        var data = JSON.parse(localStorage.writeDownNotes);
        data.push(obj);
        localStorage.writeDownNotes = JSON.stringify(data);
    };

    var getAllNotes = function(){
        return JSON.parse(localStorage.writeDownNotes);
    }

};

var ViewModel = function(){
    var that = this;

    this.newNote = ko.observable();


    this.allNotes = ko.observableArray(['foobar', 'foobar2']);

    this.addNote = function(){
        that.allNotes.push(that.newNote());
        console.dir(that.newNote());
    }
};

ko.applyBindings(new ViewModel());
