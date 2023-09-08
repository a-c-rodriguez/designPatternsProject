import $ from 'jquery';

class Memento {
    constructor(){
        this._states=[];
        this.counter=this._states.length;
        this.previousState = function() {
            this.counter--;
            if(this.counter < 0) this.counter = 0;
            return this._states.slice(0,this.counter);
        };
        this.postState = function() {
            this.counter++;
            if(this.counter > this._states.length) this.counter = this._states.length;
            return this._states.slice(0,this.counter);
        }
    }

    setState(state){
        this._states.splice(this.counter,this._states.length, state);
        this.counter++;
    }

    clear(){
        this._states.splice(0,this._states.length);
    }

    undo(div){
        var content = $('#'+div);
        content.empty();
        var states = this.previousState();
        $.each(states, function(idx, state){
            content.append(state);
        });
    }

    redo(div){
        var content = $('#'+div);
        content.empty();
        var states = this.postState();
        $.each(states, function(idx, state){
            content.append(state);
        });
    }

}

export {Memento};
