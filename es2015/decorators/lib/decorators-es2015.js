import $ from 'jquery';

class Decorator {
    constructor(decorator){
        this._decorator = decorator;
    }

    draw(elements, options) {}
}

class BoxDecorator extends Decorator {
    draw(elements, options) {
        let element = $('<div style="width:600px">');
        if(this.getStyle()+'' != '') {
            element.attr("style",this.getStyle());
        }
        $.each(elements, function (idx, elem) {
            element.append(elem);
        });
        return (this._decorator != null) ? this._decorator.draw(element, options) : element;
    }
    getStyle() {}
}

class BorderBoxDecorator extends BoxDecorator {
    getStyle(){
        return "border: thin solid black";
    }
}

class FilledBoxDecorator extends BoxDecorator {
    getStyle(){
        return "background-color: cyan";
    }
}

class ShadowBoxDecorator extends BoxDecorator {
    getStyle(){
        return "box-shadow: 5px 10px 10px #888888";
    }
}

export {BoxDecorator, BorderBoxDecorator, FilledBoxDecorator, ShadowBoxDecorator};
