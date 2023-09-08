import $ from 'jquery';
import {Subject, TabObserver} from '../../observers/lib/observers-es2015';
import {Builder, ListBuilder, TableBuilder, SelectBuilder, TableSelectBuilder} from './builders-es2015';

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
            border : $('#tableBorder').children(':selected').text(),
            rows : $('#tableRows').children(':selected').text(),
            columns : $('#tableColumns').children(':selected').text()
        };
        // let builder = new TableBuilder();
        let builder = new TableSelectBuilder();
        var elems = builder.build(options);
        $.each(elems, function(idx, elem){
            $('#content').append(elem);
        });
    });

    $("#createList").on('click', function () {
        let options = {
            title : $('#listTitle').val(),
            numberOfItems : $('#listItems').children(':selected').text()
        };
        let builder = new ListBuilder();
        var elems = builder.build(options);
        $.each(elems, function(idx, elem){
            $('#content').append(elem);
        });
    });

    $("#createSelect").on('click', function () {
        let options = {
            title : $('#selectTitle').val(),
            numberOfOpts : $('#selectOpts').children(':selected').text()
        };
        let builder = new SelectBuilder();
        var elems = builder.build(options);
        $.each(elems, function(idx, elem){
            $('#content').append(elem);
        });
    });
});