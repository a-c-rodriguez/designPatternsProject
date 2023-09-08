import $ from 'jquery';

class Builder {
    build(options) {}
}

class SelectBuilder extends Builder {
    buildSelect() {
        return $('<select>');
    }

    buildOption(text, value) {
        return $('<option value="'+value+'">'+text+'</option>');
    }

    build(options) {
        var elems = [];
        if(options.title && options.title+'' != ''){
            elems.push(options.title)
            elems.push('<br/>');
        }
        var select = this.buildSelect();
        var max = options.numberOfOpts;
        for(var i=0; i < max; i++) {
            var s = i+1;
            select.append(this.buildOption("Option Item "+s,s));
        }
        elems.push(select);
        elems.push('<br/>');
        return elems;
    }
}

class ListBuilder extends Builder {
    buildList() {
        return $('<ul>');
    }

    buildListItem(text) {
        return $('<li>'+text+'</li>');
    }

    build(options) {
        var elems = [];
        if(options.title && options.title+'' != ''){
            elems.push(options.title)
        }
        var list = this.buildList();
        var max = options.numberOfItems;
        for(var i=0; i < max; i++) {
            var s = i+1;
            list.append(this.buildListItem("List Item "+s));
        }
        elems.push(list);
        return elems;
    }
}

class TableBuilder extends Builder {
    buildTable(border) {
        return $('<table border="'+border+'" cellpadding="25">');
    }

    buildTableHeader(title, columns) {
        return $('<th colspan="'+columns+'">'+title+'</th>');
    }

    buildTableRow() {
        return $('<tr>');
    }

    buildTableCell() {
        return $('<td>')
    }

    build(options) {
        var elems = [];
        var table = this.buildTable(options.border);
        if(options.title && options.title+'' != ''){
            let row = this.buildTableRow();
            row.append(this.buildTableHeader(options.title, options.columns));
            table.append(row);
        }
        for(let i=0; i < options.rows; i++) {
            let row = this.buildTableRow();
            for(let j=0; j < options.columns; j++){
                row.append(this.buildTableCell());
            }
            table.append(row);
        }

        elems.push(table);
        return elems;
    }
}

class TableSelectBuilder extends TableBuilder {
    buildTableCell() {
        var tableCell = super.buildTableCell();
        var elems = new SelectBuilder().build({title : 'Table SelectBox', numberOfOpts : 6});
        $.each(elems, function(idx, elem){
           tableCell.append(elem);
        });
        return tableCell;
    }
}

export {Builder, ListBuilder, SelectBuilder, TableBuilder, TableSelectBuilder};
