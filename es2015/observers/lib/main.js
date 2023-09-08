import $ from 'jquery';
import {ListObserver, TableObserver, SelectObserver, TextAreaObserver, TabObserver} from './observers-es2015';
import {Subject} from './observers-es2015';


$(document).ready(function () {
    let itemSubject = new Subject();
    itemSubject.addObserver(new TableObserver('table1'));
    itemSubject.addObserver(new ListObserver('list1'));
    itemSubject.addObserver(new SelectObserver('selectbox1'));
    itemSubject.addObserver(new TextAreaObserver('textarea1'));
    $("#addButton").on('click', function () {
        itemSubject.notify({add: true, val: $('#text1').val()});
    });
    $("#selectbox1").on('change', function () {
        itemSubject.notify({remove: true, val: $(this).children(':selected').text()});
    });

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
});