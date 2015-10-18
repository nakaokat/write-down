var Notes = function(){

    if (!localStorage.writeDownNotes){
        localStorage.writeDownNotes = JSON.stringify([]);
    };

    this.addNote = function(obj){
        var data = JSON.parse(localStorage.writeDownNotes);
        data.push(obj);
        localStorage.writeDownNotes = JSON.stringify(data);
    };

    this.getAllNotes = function(){
        return JSON.parse(localStorage.writeDownNotes);
    };

};

var ViewModel = function(){
    var that = this;

    this.notes = new Notes();

    this.newNote = ko.observable();

    this.allNotes = ko.observableArray(this.notes.getAllNotes());

    this.addNote = function(){
        var newNoteObj = {
            content: that.newNote(),
            date: Date.now()
        }
        that.allNotes.push(newNoteObj);
        that.notes.addNote(newNoteObj);
        console.dir(that.notes.getAllNotes());
    }

    that.deleteNote = function(){
        that.allNotes.remove(this);
    }
};

ko.applyBindings(new ViewModel());
