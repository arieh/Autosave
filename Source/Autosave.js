/*
---
description: An Autosave provider for form fields

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Core,Class]

provides: [Autosave, Autosave.Request]

...
*/
/*!
Copyright (c) 2010 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/
(function($,window,undef){

window['Autosave'] = new Class({
    Implements:[Options,Events]
    , options : {
        interval : 5000
        , autostart : false
    }
    , element : null
    , handle : null
    , current : ''
    , step : 0
    , id : false
    ,initialize : function(el,options){
        this.setOptions(options);
        this.element = $(el);
        this.id = this.element.get('id');
        
        if (!this.id) throw "Element Must Have ID!";
        
        if (this.options.autostart) this.attach();
    }
    , attach : function(){
        var $this = this,  data = this.retrieveData();
        
        if (data){
           this.current = this.element.value = data.value;
           this.step = data.step; 
        }
        
        function check(){
            if ($this.element.value != $this.current) $this.save($this.element.value);
        }
        
        this.handle = check.periodical(this.options.interval);
        return this;
    }
    , detach : function(){$clear(this.handle);}
    , save : function(value){
        this.current = value;
        this.fireEvent('save');
        return this;
    }
    , retrieveData : function(step,id){
        this.fireEvent('load');
        return {
            value : ''
            , step : 0
        }
    }
    , empty : function(){
        this.fireEvent('empty');
        return this;
    }
    , toElement : function(){return this.element;}
});

})(document.id,this)