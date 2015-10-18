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


    this.allNotes = ko.observableArray([{
        content: '保存されたノートはここに表示されます。',
        date: 0
    }]);

    this.addNote = function(){
        var addDate = Date.now();
        that.allNotes.push({
            content: that.newNote(),
            date: addDate
        });
    }

    that.deleteNote = function(){
        that.allNotes.remove(this);
    }
};

ko.applyBindings(new ViewModel());
