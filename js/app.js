var Notes = function(){
    if (!localStorage.writeDownNotes){
        localStorage.writeDownNotes = JSON.stringify([]);
    }

    if (!localStorage.tempNote){
        localStorage.tempNote = JSON.stringify([]);
    }

    this.setTempNote = function(obj){
        var data = JSON.parse(localStorage.tempNote);
        data[0] = obj;
        localStorage.tempNote = JSON.stringify(data);
    };

    this.getTempNote = function(){
        var data = JSON.parse(localStorage.tempNote);
        return data[0];
    };

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
    var self = this;

    self.notes = new Notes();

    self.newNote = ko.observable(
        function(){
            var tempNote = self.notes.getTempNote();
            var lastSaveNote = self.notes.getAllNotes()[0];
            if(!tempNote){
                return "";
            }else if(tempNote.content == lastSaveNote.content){
                return "";
            }else{
                return tempNote.content
            }
        }()
    );

    self.allNotes = ko.observableArray(this.notes.getAllNotes());

    self.saveDraft = function(){
        var tempNoteObj = {
            content: self.newNote()
        };
        self.notes.setTempNote(tempNoteObj);
    };

    self.addNote = function(){
        var newNoteObj = {
            content: self.newNote(),
            date: new Date()
        };
        self.allNotes.unshift(newNoteObj);
        self.notes.addNote(newNoteObj);
        self.newNote('');
        self.messageText("Saved Sucessfully! Good job!");
        self.messageGreen(true);
        self.messageYellow(false);
        self.showMessage()
    };

    self.deleteNote = function(){
        self.allNotes.remove(this);
        self.notes.removeNote(this);
        self.messageText("Deleted the Note.");
        self.messageGreen(false);
        self.messageYellow(true);
        self.showMessage();
    };

    self.messageVisible = ko.observable(false);

    self.messageText = ko.observable("");

    self.messageGreen = ko.observable(true);
    self.messageYellow = ko.observable(false);

    self.showMessage = function(){
        window.setTimeout(function(){
            console.log("show message");
            self.messageVisible(true);
        }, 100);
        window.setTimeout(function(){
            self.messageVisible(false);
        }, 2000);
    };

    self.newNoteCharactorCount = ko.computed(function(){
        var text = self.newNote().replace(/\n/g, "");
        return text.length;
    }, self);

    this.hideNote = function(elem) {
        if (elem.nodeType === 1) {
            $(elem).slideUp(function(){
                $(elem).remove();
            })
        }
    }

    this.showNote = function(elem){
        if (elem.nodeType === 1){
                $(elem).hide().slideDown()
            }
    }

    this.infoShown = ko.observable(false);

    this.showInfo = function(){
        self.infoShown(true);
    };
    
    this.hideInfo = function(){
        self.infoShown(false);
    };

};

ko.applyBindings(new ViewModel());
