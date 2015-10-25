var Notes = function(){

    if (!localStorage.writeDownNotes){
        localStorage.writeDownNotes = JSON.stringify([]);
    };

    if (!localStorage.tempNote){
        localStorage.tempNote = JSON.stringify([]);
    };

    this.setTempNote = function(obj){
        var data = JSON.parse(localStorage.tempNote);
        data[0] = obj;
        localStorage.tempNote = JSON.stringify(data);
    }

    this.getTempNote = function(){
        var data = JSON.parse(localStorage.tempNote);
        return data[0];
    }

    this.addNote = function(obj){
        var data = JSON.parse(localStorage.writeDownNotes);
        data.unshift(obj);
        localStorage.writeDownNotes = JSON.stringify(data);
    };

    this.getAllNotes = function(){
        return JSON.parse(localStorage.writeDownNotes);
    };

    this.removeNote = function(obj){
        var data = JSON.parse(localStorage.writeDownNotes);
        for(var i = 0; i< data.length; i++){
            if(data[i].date == obj.date){
                data.splice(i, 1);
            }
        }
        localStorage.writeDownNotes = JSON.stringify(data);
    };

};

var ViewModel = function(){
    var that = this;

    this.notes = new Notes();

    this.newNote = ko.observable(
        function(){
            var tempNote = that.notes.getTempNote();
            var lastSaveNote = that.notes.getAllNotes()[0];
            if(tempNote.content == lastSaveNote.content){
                return "";
            }else{
                return tempNote.content
            }
        }()
    );

    this.allNotes = ko.observableArray(this.notes.getAllNotes());

    this.saveTempNote = function(){
        var tempNoteObj = {
            content: that.newNote()
        };
        that.notes.setTempNote(tempNoteObj);
    }

    this.addNote = function(){
        var newNoteObj = {
            content: that.newNote(),
            date: Date.now()
        }
        that.allNotes.unshift(newNoteObj);
        that.notes.addNote(newNoteObj);
        that.newNote('');
    }

    that.deleteNote = function(){
        that.allNotes.remove(this);
        that.notes.removeNote(this);
    }
};

ko.applyBindings(new ViewModel());
