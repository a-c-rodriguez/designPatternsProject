import $ from 'jquery';

class Observer {
    update(data){}
}

class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        if(observer instanceof Observer){
            this.observers.push(observer);
        }
    }

    removeObserver(observer) {
        if(observer instanceof Observer){
            this.observers.remove(observer);
        }
    }

    notify(context) {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].update(context);
        }
    }
}

class TableObserver extends Observer {
    constructor(elementID) {
        super();
        this.elementID = elementID;
    }

    update(data) {
        if(data.add) {
            let table = $('#'+this.elementID+' > tbody:last-child');
            table.append('<tr><td>' + data.val + '</td></tr>');
        } else if(data.remove) {
            let rows = $('#'+this.elementID+' > tbody tr');
            rows.each(function() {
                if ($(this).text() === data.val) {
                    $(this).remove();
                }
            });
        }
    }
}

class ListObserver extends Observer {
    constructor(elementID) {
        super();
        this.elementID = elementID;
    }

    update(data) {
        if(data.add) {
            let list = $('#'+this.elementID);
            list.append('<li>' + data.val + '</li>');
        } else if(data.remove) {
            let items = $('#'+this.elementID+' li');
            items.each(function() {
                if ($(this).text() === data.val) {
                    $(this).remove();
                }
            });
        }
    }
}

class SelectObserver extends Observer {
    constructor(elementID) {
        super();
        this.elementID = elementID;
    }

    update(data) {
        if (data.add) {
            let list = $('#'+this.elementID);
            list.append('<option>' + data.val + '</option>');
        } else if (data.remove) {
            let options = $('#'+this.elementID+' option');
            options.each(function () {
                if ($(this).text() === data.val) {
                    $(this).remove();
                }
            });
        }
    }
}

class TextAreaObserver extends Observer {
    constructor(elementID) {
        super();
        this.elementID = elementID;
    }

    update(data) {
        let textarea = $('#'+this.elementID);
        if (data.add) {
            let textAreaVal = textarea.val();
            textarea.val(textAreaVal+data.val+'\n');
        } else if (data.remove) {
            let textAreaLines = textarea.val().split('\n');
            let textAreaVal='';
            for(let line of textAreaLines) {
                if(line === data.val) {
                    continue;
                }
                textAreaVal += line+'\n';
            }
            textarea.val(textAreaVal);
        }
    }
}


class TabObserver extends Observer {
    constructor(tabId, divId) {
        super();
        this.tabId = tabId;
        this.divId = divId;
    }

    update(data) {
        if (data.tabId === this.tabId) {
            $('#'+this.divId).show();
            $('#'+this.tabId).css("font-weight","bold");
        } else {
            $('#'+this.divId).hide();
            $('#'+this.tabId).css("font-weight","normal");
        }
    }
}

export { Subject, ListObserver, SelectObserver, TableObserver, TextAreaObserver, TabObserver };
