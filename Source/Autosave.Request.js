/*
---
description: An Autosave implementation using AJAX

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.2.4 : [Core,Class,Class.Extras,Request.JSON]
- Autosave/0.7 : [Autosave]

provides: [Autosave.Request]

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

(function($,window,udef){

window['Autosave'].Request = new Class({
    Extends : Autosave
    , options : {
        emptyUrl : ''
    }
    , saveReq : null
    , saveUrl : ''
    , retrieveUrl :''
    , ongoing : false
    , initialize : function(el,save,retrieve,options){     
        options = options || {};
        
        var $this = this;
        
        this.saveUrl = save;
        this.retrieveUrl = retrieve;
        
        this.saveReq = new Request.JSON($merge(options,{url:save}));
        this.saveReq.addEvent('complete',function(){$this.ongoing = false;});
        
        this.parent(el,options);
    }
    , save : function(value){
        var $this = this;

        if (this.ongoing){
            this.saveReq.cancel();
        }
        this.ongoing = true;
        
        this.saveReq.send({
            data : {
                id : this.id
                , value : value
                , step : ++this.step
                , action : 'save'
            }        
        });
        
        return this.parent();
    }
    , retrieveData : function(step, id){
        if (!step) step = -1;
        id = id || this.id;

        var new_value = {}
            , $this = this
            , req = new Request.JSON({
                url : this.retrieveUrl
                , method : 'get'
                , async : false
                , onComplete : function(json){
                    new_value = {
                         value : json.value || ''
                       , step  : json.step || 0
                    };
                    new_value.step = new_value.step.toInt();
                }
            });
        
        req.send({
            data : {
                id : id
                , step :step
                , action : 'get'
            }
        });
        this.parent();
        return new_value;
    }
    , empty :function(){
        this.current = '';
        this.step = 0;
        
        if (this.options.emptyUrl) new Request({
            url : this.options.emptyUrl
            , data : {
                id : this.id
                , action : 'empty'
            }
            , async : false
        }).send();
        this.element.value = '';
        this.step = 0;
        
        return this.parent();
    }
})


})(document.id,this);