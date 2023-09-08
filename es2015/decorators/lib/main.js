import $ from 'jquery';
import {Subject, TabObserver} from '../../observers/lib/observers-es2015';
import {Builder, ListBuilder, TableBuilder, SelectBuilder, TableSelectBuilder} from '../../builders/lib/builders-es2015';
import {BoxDecorator, FilledBoxDecorator, BorderBoxDecorator, ShadowBoxDecorator} from './decorators-es2015';

$(document).ready(function () {
    //tabs with observer design pattern
    let tabSubject = new Subject();
    tabSubject.addObserver(new TabObserver('tableTab', 'div1'));
    tabSubject.addObserver(new TabObserver('listTab', 'div2'));
    tabSubject.addObserver(new TabObserver('selectTab', 'div3'));
    tabSubject.addObserver(new TabObserver('textAreaTab', 'div4'));
    $("a").on('click', function () {
        let tabId = $(this).attr('id');
        tabSubject.notify({tabId: tabId});
    });
    tabSubject.notify({tabId: 'tableTab'});

    //create DOM objects with builder pattern
    $("#createTable").on('click', function () {
        let options = {
            title : $('#tableTitle').val(),
            border : $('#tableBorderSize').children(':selected').text(),
            rows : $('#tableRows').children(':selected').text(),
            columns : $('#tableColumns').children(':selected').text()
        };
        let builder = new TableBuilder();
        //let builder = new TableSelectBuilder();
        var elems = builder.build(options);
        //decorate DOM objects with the decorator pattern
        let decorator= new BoxDecorator();
        if($('#tableFill').is(':checked')){
            decorator = new FilledBoxDecorator(decorator);
        }
        if($('#tableShadow').is(':checked')){
            decorator = new ShadowBoxDecorator(decorator);
        }
        if($('#tableBorder').is(':checked')){
            decorator = new BorderBoxDecorator(decorator);
        }
        $('#content').append(decorator.draw(elems,{}));
    });

    //create DOM objects with builder pattern
    $("#createList").on('click', function () {
        let options = {
            title : $('#listTitle').val(),
            numberOfItems : $('#listItems').children(':selected').text()
        };
        let builder = new ListBuilder();
        var elems = builder.build(options);
        //decorate DOM objects with the decorator pattern
        let decorator= new BoxDecorator();
        if($('#listFill').is(':checked')){
            decorator = new FilledBoxDecorator(decorator);
        }
        if($('#listShadow').is(':checked')){
            decorator = new ShadowBoxDecorator(decorator);
        }
        if($('#listBorder').is(':checked')){
            decorator = new BorderBoxDecorator(decorator);
        }
        $('#content').append(decorator.draw(elems,{}));
    });

    //create DOM objects with builder pattern
    $("#createSelect").on('click', function () {
        let options = {
            title : $('#selectTitle').val(),
            numberOfOpts : $('#selectOpts').children(':selected').text()
        };
        let builder = new SelectBuilder();
        var elems = builder.build(options);
        //decorate DOM objects with the decorator pattern
        let decorator= new BoxDecorator();
        if($('#selectFill').is(':checked')){
            decorator = new FilledBoxDecorator(decorator);
        }
        if($('#selectShadow').is(':checked')){
            decorator = new ShadowBoxDecorator(decorator);
        }
        if($('#selectBorder').is(':checked')){
            decorator = new BorderBoxDecorator(decorator);
        }
        $('#content').append(decorator.draw(elems,{}));
    });

    $("#clear").on('click', function() {
        $('#content').empty();
    });
});